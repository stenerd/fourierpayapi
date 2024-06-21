import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoreRepository } from 'src/common/core/repository.core';
import { Lecturer, LecturerDocument } from '../model/lecturer.model';


@Injectable()
export class LecturerRepository extends CoreRepository<LecturerDocument> {
  constructor(
    @InjectModel(Lecturer.name)
    lecturerModel: Model<LecturerDocument>,
  ) {
    super(lecturerModel);
  }
}
