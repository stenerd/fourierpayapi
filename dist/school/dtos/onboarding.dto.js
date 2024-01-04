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
exports.SchoolOnboardingDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class SchoolOnboardingDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'The name of the school',
    }),
    (0, class_validator_1.IsString)({ message: 'School name must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'School name is required' }),
    (0, class_validator_1.Length)(3, 100, {
        message: 'School name must be longer than or equal to 3 characters',
    }),
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    __metadata("design:type", String)
], SchoolOnboardingDto.prototype, "school_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'The name of the school admin',
    }),
    (0, class_validator_1.IsString)({ message: 'School admin name must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'School admin name is required' }),
    (0, class_validator_1.Length)(3, 100, {
        message: 'School admin must be longer than or equal to 3 characters',
    }),
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    __metadata("design:type", String)
], SchoolOnboardingDto.prototype, "school_admin_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'The email of the school',
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'School email must have an email format' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'School email is required' }),
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    __metadata("design:type", String)
], SchoolOnboardingDto.prototype, "school_email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'School mobile number must be a string' }),
    (0, class_validator_1.Length)(8, 50, {
        message: 'School mobile number must be longer than or equal to 8 characters',
    }),
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    __metadata("design:type", String)
], SchoolOnboardingDto.prototype, "school_mobile_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'The school password',
    }),
    (0, class_validator_1.IsString)({ message: 'Password must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Password is required' }),
    (0, class_validator_1.Length)(8, 255, {
        message: 'Password must be longer than or equal to 8 characters',
    }),
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    __metadata("design:type", String)
], SchoolOnboardingDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'School logo must be a string' }),
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    __metadata("design:type", String)
], SchoolOnboardingDto.prototype, "school_logo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'School banner must be a string' }),
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    __metadata("design:type", String)
], SchoolOnboardingDto.prototype, "school_banner", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'Number of students must be a number' }),
    __metadata("design:type", Number)
], SchoolOnboardingDto.prototype, "number_of_students", void 0);
exports.SchoolOnboardingDto = SchoolOnboardingDto;
//# sourceMappingURL=onboarding.dto.js.map