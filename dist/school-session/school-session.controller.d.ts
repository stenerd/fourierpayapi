import { SchoolSessionService } from "./school-session.service";
import { IJWTUser } from "src/auth/auth.interface";
import { SchoolDataRepository } from "src/school-data/school-data.repository";
import { UserRepository } from "src/user/user.repository";
import { CreateSchoolSessionSettingDto, UpdateSchoolSessionSettingDto } from "./dtos/school-session.dto";
import { ICreateSchoolSessionResponse } from "./interfaces/school-session.interface";
export declare class SchoolSessionController {
    private readonly sessionService;
    private readonly schoolData;
    private readonly userRepo;
    constructor(sessionService: SchoolSessionService, schoolData: SchoolDataRepository, userRepo: UserRepository);
    createSession(data: CreateSchoolSessionSettingDto, user: IJWTUser): Promise<ICreateSchoolSessionResponse>;
    getSession(user: IJWTUser): Promise<import("./models/school-session.model").SchoolSessionDocument[]>;
    editSession(data: UpdateSchoolSessionSettingDto, user: IJWTUser, setting_id: string): Promise<import("./models/school-session-setting.model").SchoolSessionSettingDocument>;
}
