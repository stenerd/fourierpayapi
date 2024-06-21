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
exports.LecturerSchema = exports.Lecturer = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const metadata_model_1 = require("../../metadata/model/metadata.model");
const user_model_1 = require("../../user/user.model");
let Lecturer = class Lecturer extends mongoose_2.Document {
};
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Lecturer.prototype, "position", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: metadata_model_1.InstitionMetadata.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Lecturer.prototype, "institution", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: metadata_model_1.FacultyMetadata.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Lecturer.prototype, "faculty", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: metadata_model_1.DepartmentMetadata.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Lecturer.prototype, "department", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: user_model_1.User.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Lecturer.prototype, "user", void 0);
Lecturer = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Lecturer);
exports.Lecturer = Lecturer;
exports.LecturerSchema = mongoose_1.SchemaFactory.createForClass(Lecturer);
//# sourceMappingURL=lecturer.model.js.map