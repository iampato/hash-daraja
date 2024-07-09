import { Module } from '@nestjs/common';
import { NumberController } from './controller/number.controller';
import { NumberRepository } from './repository/number.repository';
import { NumberService } from './service/number.service';

@Module({
  controllers: [NumberController],
  providers: [NumberService, NumberRepository],
})
export class NumbersModule {}
