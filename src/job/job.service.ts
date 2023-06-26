import { BadRequestException, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PaymentLinkStatusEnum } from 'src/payment-link/payment-link.enum';
import { PaymentLinkService } from 'src/payment-link/payment-link.service';

@Injectable()
export class JobService {
  constructor(private readonly paymentLinkService: PaymentLinkService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async paymentLinkStatusJob(): Promise<boolean> {
    const today = new Date();
    console.log('entered!!');

    await this.paymentLinkService
      .getRepository()
      .model()
      .updateMany(
        {
          expires_at: { $lt: today },
          status: {
            $in: [
              PaymentLinkStatusEnum.ACTIVE,
              PaymentLinkStatusEnum.INACTIVE,
              PaymentLinkStatusEnum.PAUSED,
            ],
          },
        },
        { status: PaymentLinkStatusEnum.EXPIRED },
      );

    console.log('completed');
    return true;
  }
}
