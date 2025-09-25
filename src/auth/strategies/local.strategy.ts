import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'otp',
      passwordField: 'otp',
      passReqToCallback: true,
    });
  }

  async validate(req: Request): Promise<any> {
    const { email, mobile, otp } = req.body as any;

    const response = await this.authService.validateUser(req, {
      email,
      mobile,
      otp,
    });

    if (!response?.otp_exists) {
      throw new BadRequestException('Invalid OTP, please try again.');
    }

    if (response?.otp_processed) {
      throw new BadRequestException(
        'OTP already processed, please try with new OTP.',
      );
    }

    if (response?.otp_expired) {
      throw new BadRequestException('OTP expired, please try again.');
    }

    return response;
  }
}
