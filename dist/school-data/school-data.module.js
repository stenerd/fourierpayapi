"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolDataModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const school_data_model_1 = require("./school-data.model");
const school_data_repository_1 = require("./school-data.repository");
const school_data_service_1 = require("./school-data.service");
const school_data_factory_1 = require("./school-data.factory");
let SchoolDataModule = class SchoolDataModule {
};
SchoolDataModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'SchoolData', schema: school_data_model_1.SchoolDataSchema },
            ]),
        ],
        providers: [school_data_service_1.SchoolDataService, school_data_repository_1.SchoolDataRepository, school_data_factory_1.SchoolDataFactory],
        exports: [school_data_service_1.SchoolDataService, school_data_factory_1.SchoolDataFactory],
    })
], SchoolDataModule);
exports.SchoolDataModule = SchoolDataModule;
//# sourceMappingURL=school-data.module.js.map