"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLinkDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_link_dto_1 = require("./create-link.dto");
class UpdateLinkDto extends (0, swagger_1.PartialType)(create_link_dto_1.CreateLinkDto) {
}
exports.UpdateLinkDto = UpdateLinkDto;
//# sourceMappingURL=update-link.dto.js.map