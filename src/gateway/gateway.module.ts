import { Module } from '@nestjs/common';
import { GatewayController } from './controller/gateway.controller';
import { GatewayService } from './service/gateway.service';
import { GatewayRepository } from './repository/gateway.repository';

@Module({
  controllers: [GatewayController],
  providers: [GatewayService, GatewayRepository],
})
export class GatewayModule {}
