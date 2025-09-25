import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

const extractCustomToken = (req) => {
  const authHeader = req.headers['authorization'];
  if (authHeader) {
    return authHeader;
  }
  return null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([extractCustomToken]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: any) {
    const login = await this.authService.getLoginByUserId({
      userId: payload.sub,
      authId: payload.auth_id,
    });

    if (!login) {
      throw new UnauthorizedException(
        'Token malformed or Session expired, please login again to continue.',
      );
    }

    if (!login.user || !login.user.is_active) {
      throw new UnauthorizedException(
        'please contact our support team/your admin to continue.',
      );
    }

    return {
      sub: payload.sub,
      auth_id: payload.auth_id,
      email: payload.email,
    };
  }
}
