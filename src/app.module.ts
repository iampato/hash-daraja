import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { NumbersModule } from './numbers/numbers.module';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [CustomersModule, NumbersModule, GatewayModule],
})
export class AppModule {}
