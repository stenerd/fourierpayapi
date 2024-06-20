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
exports.FacultySchema = exports.LevelSchema = exports.DepartmentSchema = exports.InstitutionSchema = exports.InstitutionMetadataSchema = exports.LevelMetadataSchema = exports.DepartmentMetadataSchema = exports.FacultyMetadataSchema = exports.Level = exports.Department = exports.Institution = exports.Faculty = exports.InstitionMetadata = exports.LevelMetadata = exports.DepartmentMetadata = exports.FacultyMetadata = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const basemetadata_model_1 = require("./basemetadata.model");
const mongoose_2 = require("mongoose");
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
let Faculty = class Faculty extends mongoose_2.Document {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Faculty.prototype, "institution_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: FacultyMetadata.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Faculty.prototype, "faculty_id", void 0);
Faculty = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Faculty);
exports.Faculty = Faculty;
let Institution = class Institution extends mongoose_2.Document {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: InstitionMetadata.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Institution.prototype, "institution_id", void 0);
Institution = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Institution);
exports.Institution = Institution;
let Department = class Department extends mongoose_2.Document {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: Institution.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Department.prototype, "institution_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: Faculty.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Department.prototype, "faculty_id", void 0);
Department = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Department);
exports.Department = Department;
let Level = class Level extends mongoose_2.Document {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: LevelMetadata.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Level.prototype, "level_id", void 0);
Level = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Level);
exports.Level = Level;
exports.FacultyMetadataSchema = mongoose_1.SchemaFactory.createForClass(FacultyMetadata);
exports.DepartmentMetadataSchema = mongoose_1.SchemaFactory.createForClass(FacultyMetadata);
exports.LevelMetadataSchema = mongoose_1.SchemaFactory.createForClass(FacultyMetadata);
exports.InstitutionMetadataSchema = mongoose_1.SchemaFactory.createForClass(FacultyMetadata);
exports.InstitutionSchema = mongoose_1.SchemaFactory.createForClass(Institution);
exports.DepartmentSchema = mongoose_1.SchemaFactory.createForClass(Department);
exports.LevelSchema = mongoose_1.SchemaFactory.createForClass(Level);
exports.FacultySchema = mongoose_1.SchemaFactory.createForClass(Faculty);
//# sourceMappingURL=metadata.model.js.map