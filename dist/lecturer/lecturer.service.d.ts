import { CoreService } from 'src/common/core/service.core';
import { LecturerRepository } from './repository/lecturer.repository';
import { CreateLecturerDto } from './lecturer.dto';
import { UserService } from 'src/user/user.service';
import { MetadataService } from 'src/metadata/metadata.service';
export declare class LecturerService extends CoreService<LecturerRepository> {
    private readonly lecturerRepository;
    private readonly userService;
    private readonly metadata;
    constructor(lecturerRepository: LecturerRepository, userService: UserService, metadata: MetadataService);
    slug(input: string): string;
    createLecturer(body: CreateLecturerDto): Promise<import("./model/lecturer.model").LecturerDocument>;
}
