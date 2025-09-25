import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TransactionService } from 'src/common/transaction/transaction.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
// import { TwilioModule } from 'src/common/twilio/twilio.module';
import { NodeMailerModule } from 'src/common/node-mailer/node-mailer.module';
import { TrackActivityService } from 'src/common/track-activity/track-activity.service';

@Module({
  imports: [
    NodeMailerModule,
    // TwilioModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_ACCESS_EXPIRES_IN'),
        },
      }),
    }),
  ],
  providers: [
    AuthService,
    TransactionService,
    LocalStrategy,
    JwtStrategy,
    TrackActivityService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
