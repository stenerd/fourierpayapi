import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import axios from 'axios';

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

  async sendBrevoMailAPI(
    email_type,
    data: Record<string, any> = {},
    template: string,
    to: Record<string, any>[],
    subject: string,
  ) {
    let sendSmtpEmail = {};
    const key =
      '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';

    if (email_type === 'welcome') {
      sendSmtpEmail = {
        to,
        sender: {
          name: 'Fourier Pay',
          email: 'no-reply@fourierpay.com',
        },
        htmlContent: template,
        subject,
      };
    }

    try {
      console.log('sendSmtpEmail >> ', sendSmtpEmail);
      const resp = await axios.post(
        `https://api.brevo.com/v3/smtp/email`,
        sendSmtpEmail,
        {
          headers: {
            'content-type': 'application/json',
            accept: 'application/json',
            'api-key': key,
          },
        },
      );
      console.log('resp >> ', resp);
    } catch (error) {
      console.log(';error >> ', error);
    }
  }
}
