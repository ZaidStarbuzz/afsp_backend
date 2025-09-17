// src/common/models/models.module.ts
import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { ModelsService } from './models.service';
import { Models } from './models';

@Global()
@Module({
  providers: [DbService, ModelsService, Models],
  exports: [DbService, ModelsService, Models],
})
export class ModelsModule {}
