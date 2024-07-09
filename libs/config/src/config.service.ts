import { Injectable } from '@nestjs/common';
import { HashConfig } from './types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HashConfigService {
  constructor(private readonly configService: ConfigService) {}

  getConfig(): HashConfig {
    return {
      publicKey: this.configService.get<string>('EMAIL_PUBLIC_KEY'),
      privateKey: this.configService.get<string>('EMAIL_PRIVATE_KEY'),
      serviceID: this.configService.get<string>('EMAIL_SERVICE_ID'),
    };
  }
}
