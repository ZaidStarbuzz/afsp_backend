import { Module } from '@nestjs/common';
import { PlatformsController } from './platforms.controller';
import { PlatformsService } from './platforms.service';
import { ModelsService } from 'src/common/models/models.service';

@Module({
  controllers: [PlatformsController],
  providers: [PlatformsService, ModelsService],
})
export class PlatformsModule {}
