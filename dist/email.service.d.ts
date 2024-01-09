import { MailerService } from '@nestjs-modules/mailer';
import { User } from './user/user.model';
export declare class EmailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendMail(mailer: MailerService, to: string, subject: string, template: string, data?: Record<string, any>, from?: string): Promise<void>;
    sendBrevoMailAPI(email_type: any, data: Record<string, any>, template: string, to: Record<string, any>[], subject: string): Promise<void>;
    sendUserWelcome(user: User): Promise<String>;
}
