"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalApiCalls = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let ExternalApiCalls = class ExternalApiCalls {
    constructor() {
        this.axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        };
    }
    async postData(url, dataToPost, headers = {}) {
        let result = null;
        let err = null;
        const axiosHeader = Object.assign(Object.assign({}, this.axiosConfig.headers), headers);
        try {
            const response = await axios_1.default.post(url, dataToPost, {
                headers: axiosHeader,
            });
            console.log('response >> ');
            result = await response.data;
        }
        catch (error) {
            console.log('error >> ', error.response);
            err = error.response;
        }
        return { result, err };
    }
    async fetchData(url, headers = {}) {
        let result = null;
        let err = null;
        const axiosHeader = Object.assign(Object.assign({}, this.axiosConfig.headers), headers);
        try {
            const response = await axios_1.default.get(url, { headers: axiosHeader });
            result = await response.data;
            console.log('response >> ', result);
        }
        catch (error) {
            console.log('error >> ', error.response);
            err = error.response;
        }
        return { result, err };
    }
};
ExternalApiCalls = __decorate([
    (0, common_1.Injectable)()
], ExternalApiCalls);
exports.ExternalApiCalls = ExternalApiCalls;
//# sourceMappingURL=external-call.service.js.map