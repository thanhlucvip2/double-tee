import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailModel } from './mail.model';

@Injectable()
export class MailService {
  constructor(private readonly mailservice: MailerService) {}
  async sendMail({ toEmail, description }: MailModel) {
    try {
      await this.mailservice.sendMail({
        to: toEmail,
        from: 'Hacheehouse Shop',
        subject: 'Very Code', // Subject line
        text: 'Hacheehouse Shop', // plaintext body
        html: `<h1> VeryCode : ${description}</h1>`,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
