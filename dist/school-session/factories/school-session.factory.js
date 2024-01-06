"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolSessionFactory = void 0;
const common_1 = require("@nestjs/common");
const school_session_model_1 = require("../models/school-session.model");
let SchoolSessionFactory = class SchoolSessionFactory {
    createNew(data) {
        const school_session = new school_session_model_1.SchoolSession();
        for (const [key, value] of Object.entries(data)) {
            school_session[key] = value;
        }
        return school_session;
    }
};
SchoolSessionFactory = __decorate([
    (0, common_1.Injectable)()
], SchoolSessionFactory);
exports.SchoolSessionFactory = SchoolSessionFactory;
//# sourceMappingURL=school-session.factory.js.map