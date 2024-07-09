import { Controller, Get } from '@nestjs/common';
import { NumberService } from '../service/number.service';

@Controller('number')
export class NumberController {
  constructor(private readonly numberService: NumberService) {}

  @Get()
  getHello(): string {
    return this.numberService.getHello();
  }
}
