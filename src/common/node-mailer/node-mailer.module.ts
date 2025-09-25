import { Global, Module } from '@nestjs/common';
import { NodeMailerService } from './node-mailer.service';

@Global()
@Module({
  providers: [NodeMailerService],
  exports: [NodeMailerService],
})
export class NodeMailerModule {}
