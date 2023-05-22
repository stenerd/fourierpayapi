import { SetMetadata } from '@nestjs/common';

export const GetSubscriptionData = (getSubscription: string) =>
  SetMetadata('getSubscription', getSubscription);
