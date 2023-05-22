import { Module } from '@nestjs/common';
import { ExternalApiCalls } from 'src/external-call/external-call.service';
import { PaystackController } from './paystack.controller';
import { PaystackFactory } from './paystack.factory';
import { PaystackService } from './paystack.service';

@Module({
  controllers: [PaystackController],
  providers: [PaystackService, ExternalApiCalls, PaystackFactory],
  exports: [PaystackService, PaystackFactory],
})
export class PaystackModule {}
