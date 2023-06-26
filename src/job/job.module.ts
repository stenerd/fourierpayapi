import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { PaymentLinkModule } from 'src/payment-link/payment-link.module';

@Module({
  imports: [PaymentLinkModule],
  controllers: [JobController],
  providers: [JobService],
  exports: [JobService],
})
export class JobModule {}
