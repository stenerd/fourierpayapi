"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateRandomString = exports.GenerateRef = void 0;
const GenerateRef = function (num, type) {
    let unique_code = num.toString();
    let zero_count = 0;
    if (unique_code.length < 7) {
        zero_count = 7 - unique_code.length;
        unique_code = '0'.repeat(zero_count) + unique_code;
    }
    return type + 'B' + unique_code;
};
exports.GenerateRef = GenerateRef;
const GenerateRandomString = function (length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
exports.GenerateRandomString = GenerateRandomString;
//# sourceMappingURL=code-generator.util.js.map