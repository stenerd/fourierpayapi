import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { SchoolOnboadingController } from './controllers/onboarding.controller';
import { SchoolDataModule } from 'src/school-data/school-data.module';
import { SchoolOnboardingFactory } from './factories/onboarding.factory';
import { SchoolOnboardingService } from './services/onboarding.service';
import { LinkModule } from 'src/link/link.module';
import { SchoolSessionModule } from 'src/school-session/school-session.module';

@Module({
  imports: [UserModule, SchoolDataModule, LinkModule, SchoolSessionModule],
  controllers: [SchoolOnboadingController],
  providers: [SchoolOnboardingFactory, SchoolOnboardingService],
})
export class SchoolModule {}
