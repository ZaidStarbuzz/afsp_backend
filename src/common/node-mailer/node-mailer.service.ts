import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

interface SendMailFunctionParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
  cc?: string | string[];
}

interface SendMailToAdminFunctionParams {
  to?: string;
  subject: string;
  html: string;
  text?: string;
  cc?: string | string[];
}

@Injectable()
export class NodeMailerService {
  private transporter: ReturnType<typeof nodemailer.createTransport>;
  private readonly logger = new Logger(NodeMailerService.name);

  constructor(private readonly configService: ConfigService) {
    const host = this.configService.get<string>('NODEMAILER_HOST');
    const port = this.configService.get<number>('NODEMAILER_PORT');
    const user = this.configService.get<string>('NODEMAILER_AUTH_USER');
    const pass = this.configService.get<string>('NODEMAILER_AUTH_PASS');
    const from = this.configService.get<string>('FROM_MAIL');

    if (!host || !port || !user || !pass || !from) {
      throw new Error('Missing required NodeMailer configuration.');
    }

    this.transporter = nodemailer.createTransport({
      host,
      port,
      auth: { user, pass },
    });

    this.logger.log(
      `NodeMailer initialized with host ${host} and port ${port}`,
    );
  }

  private headers = {
    'X-SES-CONFIGURATION-SET': 'SesLoggingSet',
    'X-Email-Source': 'saas',
  };

  async sendMail({ to, subject, html, text, cc }: SendMailFunctionParams) {
    const mailOptions = {
      from: this.configService.get<string>('FROM_MAIL'),
      cc,
      to,
      subject,
      text,
      html,
      headers: this.headers,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`Email sent to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send email: ${error.message}`);
      throw error;
    }
  }

  async sendMailToAdmin({
    subject,
    html,
    text,
    cc,
  }: SendMailToAdminFunctionParams) {
    let adminEmail = this.configService.get<string>('DEV_ADMIN_MAIL');

    if (this.configService.get<string>('NODE_ENV') === 'production') {
      adminEmail = this.configService.get<string>('PROD_ADMIN_MAIL');
    }

    const mailOptions = {
      from: this.configService.get<string>('FROM_MAIL'),
      to: adminEmail,
      cc,
      subject,
      text,
      html,
      headers: this.headers,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`Email sent to ${adminEmail}`);
    } catch (error) {
      this.logger.error(`Failed to send email: ${error.message}`);
      throw error;
    }
  }
}
