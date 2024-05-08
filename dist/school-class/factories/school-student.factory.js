"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolTermFactory = void 0;
const common_1 = require("@nestjs/common");
const school_term_model_1 = require("../models/school-term.model");
const mongoose_1 = require("mongoose");
let SchoolTermFactory = class SchoolTermFactory {
    createNew(data) {
        const result = [];
        for (let i = 0; i < data.number_of_term; i++) {
            const school_term = new school_term_model_1.SchoolTerm();
            school_term.name = `Term ${i + 1}`;
            school_term.school_id = new mongoose_1.Types.ObjectId(data.school_id);
            school_term.session_id = new mongoose_1.Types.ObjectId(data.session_id);
            school_term.session_setting_id = new mongoose_1.Types.ObjectId(data.session_setting_id);
            result.push(school_term);
        }
        return result;
    }
    getStartAndEndYear() {
        const current_date = new Date();
        const current_month = current_date.getMonth();
        const current_year = current_date.getFullYear();
        let start_year, end_year;
        if (current_month >= 8) {
            start_year = current_year;
            end_year = current_year + 1;
        }
        else {
            start_year = current_year - 1;
            end_year = current_year;
        }
        return { start_year, end_year };
    }
};
SchoolTermFactory = __decorate([
    (0, common_1.Injectable)()
], SchoolTermFactory);
exports.SchoolTermFactory = SchoolTermFactory;
//# sourceMappingURL=school-student.factory.js.map