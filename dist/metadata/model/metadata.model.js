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
exports.InstitutionMetadataSchema = exports.LevelMetadataSchema = exports.DepartmentMetadataSchema = exports.FacultyMetadataSchema = exports.InstitionMetadata = exports.LevelMetadata = exports.DepartmentMetadata = exports.FacultyMetadata = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const basemetadata_model_1 = require("./basemetadata.model");
let FacultyMetadata = class FacultyMetadata extends basemetadata_model_1.BaseMetaData {
};
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], FacultyMetadata.prototype, "is_deleted", void 0);
FacultyMetadata = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], FacultyMetadata);
exports.FacultyMetadata = FacultyMetadata;
let DepartmentMetadata = class DepartmentMetadata extends basemetadata_model_1.BaseMetaData {
};
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], DepartmentMetadata.prototype, "is_deleted", void 0);
DepartmentMetadata = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], DepartmentMetadata);
exports.DepartmentMetadata = DepartmentMetadata;
let LevelMetadata = class LevelMetadata extends basemetadata_model_1.BaseMetaData {
};
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], LevelMetadata.prototype, "is_deleted", void 0);
LevelMetadata = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], LevelMetadata);
exports.LevelMetadata = LevelMetadata;
let InstitionMetadata = class InstitionMetadata extends basemetadata_model_1.BaseMetaData {
};
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], InstitionMetadata.prototype, "is_deleted", void 0);
InstitionMetadata = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], InstitionMetadata);
exports.InstitionMetadata = InstitionMetadata;
exports.FacultyMetadataSchema = mongoose_1.SchemaFactory.createForClass(FacultyMetadata);
exports.DepartmentMetadataSchema = mongoose_1.SchemaFactory.createForClass(FacultyMetadata);
exports.LevelMetadataSchema = mongoose_1.SchemaFactory.createForClass(FacultyMetadata);
exports.InstitutionMetadataSchema = mongoose_1.SchemaFactory.createForClass(FacultyMetadata);
//# sourceMappingURL=metadata.model.js.map