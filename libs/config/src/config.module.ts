import { Module } from '@nestjs/common';
import { HashConfigService } from './config.service';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { environmentValidationSchema } from './config.schema';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.ENV}`],
      validationSchema: environmentValidationSchema,
    }),
  ],
  providers: [HashConfigService],
  exports: [HashConfigService],
})
export class ConfigModule {}
