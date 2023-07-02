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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const email_service_1 = require("../email.service");
const mailer_1 = require("@nestjs-modules/mailer");
const user_enum_1 = require("../user/user.enum");
let AuthService = class AuthService {
    constructor(userService, jwtService, mailerService, emailService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.mailerService = mailerService;
        this.emailService = emailService;
    }
    async comparePassword(password, hash) {
        return await bcrypt.compare(password, hash);
    }
    async updateUserDetails(userId, rToken) {
        const refresh_token = await bcrypt.hash(rToken, 12);
        await this.userService.updateOne(userId, { refresh_token });
    }
    async createTokens(userObj) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(userObj, { expiresIn: 60 * 60 * 7 }),
            this.jwtService.signAsync({
                userId: userObj._id.toString(),
                email: userObj.email,
                role: userObj.role,
            }, { expiresIn: 60 * 60 * 24 * 7 }),
        ]);
        await this.updateUserDetails(userObj._id, refreshToken);
        return { accessToken, refreshToken };
    }
    async login(loginDto) {
        const get_user = await this.userService.findOne({ email: loginDto.email });
        if (!get_user)
            throw new common_1.NotFoundException('Invalid email/password provided.');
        if (get_user.role !== user_enum_1.RoleEnum.ADMIN)
            throw new common_1.NotFoundException('Invalid email/password provided.');
        const passwordMatch = await this.comparePassword(loginDto.password, get_user.password);
        if (!passwordMatch) {
            throw new common_1.NotFoundException('Invalid email/password provided.');
        }
        const customerData = {
            firstname: get_user.firstname,
            lastname: get_user.lastname,
            email: get_user.email,
            role: get_user.role,
            _id: get_user._id,
        };
        const { accessToken } = await this.createTokens(customerData);
        return {
            message: `Login successful.`,
            token: accessToken,
            user: get_user,
        };
    }
    async forgotPassword(email) {
        const resp = await this.userService.updateToken({ email });
        this.emailService.sendMail(this.mailerService, email, 'Reset Password', 'reset-password', {
            firstname: resp.firstname,
            lastname: resp.lastname,
            token: resp.token,
        });
        return resp;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        mailer_1.MailerService,
        email_service_1.EmailService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map