"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelService = void 0;
const common_1 = require("@nestjs/common");
const exceljs = require("exceljs");
let ExcelService = class ExcelService {
    async extractJsonFromExcel(buffer) {
        const workbook = new exceljs.Workbook();
        await workbook.xlsx.load(buffer);
        const worksheet = workbook.getWorksheet(1);
        const rows = worksheet.getRow(1);
        const data = [];
        for (let i = 2; i <= worksheet.rowCount; i++) {
            const row = worksheet.getRow(i);
            const obj = {};
            let check = false;
            for (let j = 1; j <= rows.cellCount; j++) {
                const cell = row.getCell(j);
                check = check || !!cell.value;
                obj[rows.getCell(j).value] = cell.value;
            }
            if (!check) {
                break;
            }
            data.push(obj);
        }
        return data;
    }
};
ExcelService = __decorate([
    (0, common_1.Injectable)()
], ExcelService);
exports.ExcelService = ExcelService;
//# sourceMappingURL=excel-processor.service.js.map