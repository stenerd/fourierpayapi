"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareStringViaHash = exports.hashString = void 0;
const bcrypt = require("bcrypt");
const hashString = async (text, salt = 10) => {
    return await bcrypt.hash(text, salt);
};
exports.hashString = hashString;
const compareStringViaHash = async (current, previous) => {
    const isSame = await bcrypt.compare(previous, current);
    return isSame;
};
exports.compareStringViaHash = compareStringViaHash;
//# sourceMappingURL=hash.util.js.map