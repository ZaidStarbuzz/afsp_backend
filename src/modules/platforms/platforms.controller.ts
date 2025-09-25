import { Controller, Get, UseGuards } from '@nestjs/common';
import { PlatformsService } from './platforms.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('platforms')
export class PlatformsController {
  constructor(private readonly platformsService: PlatformsService) {}
  @Get()
  @UseGuards(JwtAuthGuard)
  async getPlatforms() {
    return this.platformsService.findAll();
  }
}
