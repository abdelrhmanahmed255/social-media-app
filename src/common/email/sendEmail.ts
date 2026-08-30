import nodemailer from "nodemailer";
import { env } from "../../config/env.service";

export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: env.emailHost,
      port: env.emailPort,
      secure: false,
      auth:
        env.emailUser && env.emailPass
          ? {
              user: env.emailUser,
              pass: env.emailPass,
            }
          : undefined,
    });
  }

  async sendEmail({
    to,
    subject,
    html,
  }: {
    to: string;
    subject: string;
    html: string;
  }) {
    if (!env.emailUser || !env.emailPass) {
      console.log(`[Email skipped] to=${to} subject=${subject}`);
      return { skipped: true };
    }

    return this.transporter.sendMail({
      from: env.emailFrom,
      to,
      subject,
      html,
    });
  }
}

export const emailService = new EmailService();

export const sendEmail = emailService.sendEmail.bind(emailService);
