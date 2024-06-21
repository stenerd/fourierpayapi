import { Module } from '@nestjs/common';
import { LecturerService } from './lecturer.service';
import { LecturerController } from './lecturer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Lecturer, LecturerSchema } from './model/lecturer.model';
import { LecturerRepository } from './repository/lecturer.repository';
import { UserModule } from 'src/user/user.module';
import { MetadataModule } from 'src/metadata/metadata.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Lecturer.name, schema: LecturerSchema }]),UserModule,MetadataModule],
  providers: [LecturerService,LecturerRepository],
  controllers: [LecturerController],
  exports:[LecturerRepository,LecturerService]
})
export class LecturerModule { }
