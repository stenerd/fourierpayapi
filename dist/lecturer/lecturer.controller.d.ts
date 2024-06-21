import { CoreController } from 'src/common/core/controller.core';
import { LecturerService } from './lecturer.service';
import { CreateLecturerDto } from './lecturer.dto';
export declare class LecturerController extends CoreController {
    private readonly lecturerService;
    constructor(lecturerService: LecturerService);
    onboardLecturer(lecturer: CreateLecturerDto, res: any): Promise<void>;
}
