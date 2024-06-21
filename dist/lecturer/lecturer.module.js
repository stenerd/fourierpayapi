"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LecturerModule = void 0;
const common_1 = require("@nestjs/common");
const lecturer_service_1 = require("./lecturer.service");
const lecturer_controller_1 = require("./lecturer.controller");
const mongoose_1 = require("@nestjs/mongoose");
const lecturer_model_1 = require("./model/lecturer.model");
const lecturer_repository_1 = require("./repository/lecturer.repository");
const user_module_1 = require("../user/user.module");
const metadata_module_1 = require("../metadata/metadata.module");
let LecturerModule = class LecturerModule {
};
LecturerModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: lecturer_model_1.Lecturer.name, schema: lecturer_model_1.LecturerSchema }]), user_module_1.UserModule, metadata_module_1.MetadataModule],
        providers: [lecturer_service_1.LecturerService, lecturer_repository_1.LecturerRepository],
        controllers: [lecturer_controller_1.LecturerController],
        exports: [lecturer_repository_1.LecturerRepository, lecturer_service_1.LecturerService]
    })
], LecturerModule);
exports.LecturerModule = LecturerModule;
//# sourceMappingURL=lecturer.module.js.map