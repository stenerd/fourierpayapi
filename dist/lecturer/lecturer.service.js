"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LecturerService = void 0;
const common_1 = require("@nestjs/common");
const service_core_1 = require("../common/core/service.core");
const lecturer_repository_1 = require("./repository/lecturer.repository");
const user_service_1 = require("../user/user.service");
const user_enum_1 = require("../user/user.enum");
const metadata_service_1 = require("../metadata/metadata.service");
const metadata_interface_1 = require("../metadata/metadata.interface");
let LecturerService = class LecturerService extends service_core_1.CoreService {
    constructor(lecturerRepository, userService, metadata) {
        super(lecturerRepository);
        this.lecturerRepository = lecturerRepository;
        this.userService = userService;
        this.metadata = metadata;
    }
    slug(input) {
        return input.replace(/ /g, '-');
    }
    async createLecturer(body) {
        const data = await this.userService.create({
            email: body.email,
            lastname: body.lastname,
            firstname: body.lastname,
            password: body.password,
            phonenumber: body.phonenumber,
            role: user_enum_1.RoleEnum.LECTURER
        });
        const metadataEntries = [
            { role: metadata_interface_1.Roles.DEPARTMENT, name: body.department_name },
            { role: metadata_interface_1.Roles.FACULTY, name: body.faculty_name },
            { role: metadata_interface_1.Roles.INSTITUTION, name: body.institution_name }
        ];
        const metadataIds = {};
        for (const entry of metadataEntries) {
            if (entry.name) {
                const metadata = await this.metadata.findMetadata(entry.role, { name: entry.name });
                if (metadata) {
                    metadataIds[entry.role] = metadata._id;
                }
                if (!metadata) {
                    await this.metadata.createMetadata(entry.role, { name: entry.name, slug: this.slug(entry.name) });
                    const metadata = await this.metadata.findMetadata(entry.role, { name: entry.name });
                    metadataIds[entry.role] = await metadata._id;
                }
            }
        }
        const user = await this.userService.findOne({ email: body.email, role: user_enum_1.RoleEnum.LECTURER });
        const newLecturer = await this.lecturerRepository.create({
            user: user._id,
            department: metadataIds[metadata_interface_1.Roles.DEPARTMENT],
            institution: metadataIds[metadata_interface_1.Roles.INSTITUTION],
            faculty: metadataIds[metadata_interface_1.Roles.FACULTY],
            position: body.position
        });
        return newLecturer;
    }
};
LecturerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [lecturer_repository_1.LecturerRepository, user_service_1.UserService, metadata_service_1.MetadataService])
], LecturerService);
exports.LecturerService = LecturerService;
//# sourceMappingURL=lecturer.service.js.map