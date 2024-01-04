import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchoolDataSchema } from './school-data.model';
import { SchoolDataRepository } from './school-data.repository';
import { SchoolDataService } from './school-data.service';
import { SchoolDataFactory } from './school-data.factory';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'SchoolData', schema: SchoolDataSchema },
    ]),
  ],
  providers: [SchoolDataService, SchoolDataRepository, SchoolDataFactory],
  exports: [SchoolDataService, SchoolDataFactory],
})
export class SchoolDataModule {}
