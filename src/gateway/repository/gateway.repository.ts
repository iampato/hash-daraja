import { Injectable } from '@nestjs/common';

@Injectable()
export class GatewayRepository {
  getHello(): string {
    return 'Hello World!';
  }
}
