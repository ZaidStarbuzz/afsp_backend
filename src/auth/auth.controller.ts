import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { SignupOtpDto } from './dto/signup.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('send-otp')
  @HttpCode(HttpStatus.OK)
  async sendOtp(@Res() res: Response, @Body() body: any): Promise<any> {
    return this.authService.sendOtp(res, body);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('verify-otp')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req) {
    delete req.user.otp_exists;
    req.user_exists = req.user.user_exists;
    delete req.user.user_exists;
    req.user = req.user.user;
    return this.authService.login(req);
  }

  @Post('signup')
  async signupOtpAuth(
    @Headers('id') verifyId: string,
    @Body() dto: SignupOtpDto,
  ) {
    return this.authService.signupOtpAuth(verifyId, dto);
  }
}
