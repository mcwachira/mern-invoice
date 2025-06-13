import "dotenv/config";
import nodemailer, { Transporter } from "nodemailer";

let transporter: Transporter | undefined;

if (process.env.NODE_ENV === "development") {
  transporter = nodemailer.createTransport({
    host: "mailhog",
    port: 1025,
  });
} else if (process.env.NODE_ENV === "production") {
  transporter = nodemailer.createTransport({
    // Setup for production (e.g., Mailgun, SMTP, etc.)
    host: process.env.MAIL_HOST!,
    port: Number(process.env.MAIL_PORT!),
    auth: {
      user: process.env.MAIL_USER!,
      pass: process.env.MAIL_PASS!,
    },
  });
}

export default transporter;
