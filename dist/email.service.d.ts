import { MailerService } from '@nestjs-modules/mailer';
export declare class EmailService {
    sendMail(mailer: MailerService, to: string, subject: string, template: string, data?: Record<string, any>, from?: string): Promise<void>;
}
