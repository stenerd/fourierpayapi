import { Injectable } from '@nestjs/common';
import * as exceljs from 'exceljs';
// import { buffer } from 'fs';

@Injectable()
export class ExcelService {
  async extractJsonFromExcel(buffer: Buffer): Promise<any[]> {
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.load(buffer);

    const worksheet = workbook.getWorksheet(1);
    const rows = worksheet.getRow(1);
    const data = [];

    // Iterate over the rows and cells of the worksheet
    for (let i = 2; i <= worksheet.rowCount; i++) {
      const row = worksheet.getRow(i);
      const obj = {};

      let check = false;

      // Iterate over the cells in the row
      for (let j = 1; j <= rows.cellCount; j++) {
        const cell = row.getCell(j);
        check = check || !!cell.value;

        // Save the cell value as a property of the object
        obj[rows.getCell(j).value as string] = cell.value;
      }

      if (!check) {
        break;
      }

      // Push the object to the data array
      data.push(obj);
    }

    return data;
  }
}
