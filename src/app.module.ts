import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModelsModule } from './common/models/models.module';
import { ConfigModule } from '@nestjs/config';
import { PlatformsModule } from './modules/platforms/platforms.module';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ModelsModule, PlatformsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
