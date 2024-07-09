import { Injectable } from '@nestjs/common';

@Injectable()
export class NumberRepository {
  getHello(): string {
    return 'Hello World!';
  }
}
