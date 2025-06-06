import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import axios from 'axios';
import configuration from './config/configuration';
import { createTransport } from 'nodemailer';

const config = configuration();

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
    const key = config.EMAIL_API_KEY;

    if (email_type === 'welcome') {
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

  async sendMailtrapMailAPI(
    email_type,
    data: Record<string, any> = {},
    template: string,
    to: string,
    subject: string,
  ) {
    let mailOptions = {};
    const key = config.EMAIL_API_KEY;
    const API_TOKEN = config.APITOKEN;

    if (email_type === 'welcome') {
      mailOptions = {
        to,
        from: '"FourierPay Group" no-reply@fourierpay.com',
        html: template,
        subject,
      };
    }

    try {
      console.log('sendSmtpEmail >> ', mailOptions);

      const transport = createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: 'd1100bf4de921c',
          pass: '960a7cdd64e78c',
        },
      });

      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log('error >> ', error);
        }
        console.log('Message sent: %s', info.messageId);
      });
    } catch (error) {
      console.log(';error >> ', error);
    }
  }
}
