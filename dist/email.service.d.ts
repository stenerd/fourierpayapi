import { MailerService } from '@nestjs-modules/mailer';
export declare class EmailService {
    sendMail(mailer: MailerService, to: string, subject: string, template: string, data?: Record<string, any>, from?: string): Promise<void>;
    sendBrevoMailAPI(email_type: any, data: Record<string, any>, template: string, to: Record<string, any>[], subject: string): Promise<void>;
    sendMailtrapMailAPI(email_type: any, data: Record<string, any>, template: string, to: string, subject: string): Promise<void>;
}
