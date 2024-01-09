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
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const axios_1 = require("axios");
const configuration_1 = require("./config/configuration");
const config = (0, configuration_1.default)();
let EmailService = class EmailService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendMail(mailer, to, subject, template, data = {}, from = '') {
        console.log('__dirname >> ', __dirname, data);
        const pathArr = __dirname.split('/');
        pathArr.pop();
        await mailer.sendMail(Object.assign(Object.assign(Object.assign({ to }, (from && { from })), { subject, template: '/' + pathArr.join('/') + `/src/templates/${template}` }), (Object.keys(data).length && {
            context: Object.assign({}, data),
        })));
    }
    async sendBrevoMailAPI(email_type, data = {}, template, to, subject) {
        let sendSmtpEmail = {};
        const key = config.EMAIL_API_KEY;
        if (email_type === 'welcome' || email_type === 'resetpassword') {
            sendSmtpEmail = {
                to,
                sender: {
                    name: 'Stenerd Technologies',
                    email: 'stenerdlimited@gmail.com',
                },
                htmlContent: template,
                subject,
            };
        }
        try {
            console.log('sendSmtpEmail >> ', sendSmtpEmail);
            const resp = await axios_1.default.post(`https://api.brevo.com/v3/smtp/email`, sendSmtpEmail, {
                headers: {
                    'content-type': 'application/json',
                    accept: 'application/json',
                    'api-key': key,
                },
            });
            console.log('resp >> ', resp);
        }
        catch (error) {
            console.log(';error >> ', error);
        }
    }
    async sendUserWelcome(user) {
        const confirmation_url = `https://fourierpay.com/login?token=${user.token}`;
        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Welcome to Fourier Pay! Confirm your Email',
            template: './welcome',
            context: {
                name: user.firstname,
                confirmation_url,
            },
        });
        return `Email Sent Successfully to ${user.email}`;
    }
};
EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map