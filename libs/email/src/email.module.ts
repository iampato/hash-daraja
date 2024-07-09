import { Module } from '@nestjs/common';
import { EmailerService } from './email.service';
import { ConfigModule } from '@app/config';

@Module({
  imports: [ConfigModule],
  providers: [EmailerService],
  exports: [EmailerService],
})
export class EmailerModule {}
