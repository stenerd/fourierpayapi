import { Injectable } from '@nestjs/common';
import { CoreService } from 'src/common/core/service.core';
import { LecturerRepository } from './repository/lecturer.repository';
import { CreateLecturerDto } from './lecturer.dto';
import { UserService } from 'src/user/user.service';
import { RoleEnum } from 'src/user/user.enum';
import { MetadataService } from 'src/metadata/metadata.service';
import { Roles } from 'src/metadata/metadata.interface';

@Injectable()
export class LecturerService extends CoreService<LecturerRepository> {
    constructor(private readonly lecturerRepository: LecturerRepository, private readonly userService: UserService, private readonly metadata: MetadataService) {
        super(lecturerRepository)
    }
    async createLecturer(body: CreateLecturerDto) {
        const data = await this.userService.create({
            email: body.email,
            lastname: body.lastname,
            firstname: body.lastname,
            password: body.password,
            phonenumber: body.phonenumber,
            role: RoleEnum.LECTURER
        })

        const metadataEntries = [
            { role: Roles.DEPARTMENT, name: body.department_name },
            { role: Roles.FACULTY, name: body.faculty_name },
            { role: Roles.INSTITUTION, name: body.institution_name }
        ];
        const metadataIds: { [key: string]: any } = {};

        for (const entry of metadataEntries) {
            if (entry.name) {
                const metadata: any = await this.metadata.findMetadata(entry.role, { name: entry.name });
                if (metadata) {
                    metadataIds[entry.role] = metadata._id;
                }
                if (!metadata) {
                    await this.metadata.createMetadata(entry.role, { name: entry.name, slug: entry.name });
                    const metadata: any = await this.metadata.findMetadata(entry.role, { name: entry.name });
                    metadataIds[entry.role] = await metadata._id;
                }
            }
        }
        const user = await this.userService.findOne({ email: body.email, role: RoleEnum.LECTURER })
        const newLecturer = await this.lecturerRepository.create({
            user: user._id,
            department: metadataIds[Roles.DEPARTMENT],
            institution: metadataIds[Roles.INSTITUTION],
            faculty: metadataIds[Roles.FACULTY],
            position: body.position
        })
        return newLecturer;
    }
}

