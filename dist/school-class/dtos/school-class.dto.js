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
exports.CreateSchoolClassDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateSchoolClassDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'School Identifier',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateSchoolClassDto.prototype, "school_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Name of the class Identifier',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSchoolClassDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Field used to filter the forms',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateSchoolClassDto.prototype, "unique_field", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Field Used to Filter ',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSchoolClassDto.prototype, "priority_1", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Field Used to Filter ',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSchoolClassDto.prototype, "priority_2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Field Used to Filter ',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSchoolClassDto.prototype, "priority_3", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Urls of the students in a class ',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Array)
], CreateSchoolClassDto.prototype, "urls", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Form structure of the students ',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateSchoolClassDto.prototype, "form_structure", void 0);
exports.CreateSchoolClassDto = CreateSchoolClassDto;
//# sourceMappingURL=school-class.dto.js.map