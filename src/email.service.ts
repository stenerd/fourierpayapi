import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  async sendMail(
    mailer: MailerService,
    to: string,
    subject: string,
    template: string,
    data: Record<string, any> = {},
    from = '',
  ) {
    console.log('__dirname >> ', __dirname, data);
    const pathArr = __dirname.split('/');
    pathArr.pop();
    await mailer.sendMail({
      to,
      ...(from && { from }),
      subject,
      template: '/' + pathArr.join('/') + `/src/templates/${template}`, // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
      ...(Object.keys(data).length && {
        context: {
          ...data,
        },
      }),
    });
  }
}
