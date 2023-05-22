"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkFactory = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const link_model_1 = require("./link.model");
let LinkFactory = class LinkFactory {
    createDefault(length, user_id) {
        const result = [];
        for (let i = 0; i < length; i++) {
            const link = new link_model_1.Link();
            link.user_id = new mongoose_1.Types.ObjectId(user_id);
            result.push(link);
        }
        return result;
    }
};
LinkFactory = __decorate([
    (0, common_1.Injectable)()
], LinkFactory);
exports.LinkFactory = LinkFactory;
//# sourceMappingURL=link.factory.js.map