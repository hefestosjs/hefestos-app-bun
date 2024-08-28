import type { MailerConfigInterface } from "vendor/mail/interfaces";

export const mailerConfig: MailerConfigInterface = {
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Boolean(process.env.SMTP_SECURE),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};
