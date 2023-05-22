import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './controllers/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.model';
import { UserRepository } from './user.repository';
import { UserFactory } from './user.factory';
import * as bcrypt from 'bcrypt';
import { WalletModule } from 'src/wallet/wallet.module';
import { LinkModule } from 'src/link/link.module';
import { EmailService } from 'src/email.service';
import { SubscriptionModule } from 'src/subscription/subscription.module';
import { UserSubscriptionController } from './controllers/user-subscription.controller';
import { SubscriptionService } from 'src/subscription/services/subscription.service';

@Module({
  imports: [
    forwardRef(() => WalletModule),
    SubscriptionModule,
    MongooseModule.forFeatureAsync([
      {
        name: 'User',
        useFactory: () => {
          const schema = UserSchema;

          schema.pre<User>('save', async function () {
            const user = this;

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(user.password, salt);

            user.password = hashPassword;
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [UserController, UserSubscriptionController],
  providers: [
    UserRepository,
    UserService,
    UserFactory,
    EmailService,
    SubscriptionService,
  ],
  exports: [UserService, UserRepository, UserFactory, SubscriptionService],
})
export class UserModule {}
