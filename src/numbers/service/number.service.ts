import { Injectable } from '@nestjs/common';

@Injectable()
export class NumberService {
  getHello(): string {
    return 'Hello World!';
  }
}
