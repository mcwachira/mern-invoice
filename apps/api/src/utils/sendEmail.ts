import "dotenv/config";
import fs from "fs";
import path from "path";
import transporter from "../helpers/emailTransport";
import { systemLogs } from "./logger";
import Handlebars from "handlebars";
import { SentMessageInfo } from "nodemailer";

// const __filename = __filename; // Already available
const __dirname = path.dirname(__filename);

type EmailPayload = Record<string, any>;
const sendEmail = async (
  email: string,
  subject: string,
  payload: EmailPayload,
  template: string,
): Promise<SentMessageInfo | void> => {
  try {
    const sourceDirectory = fs.readFileSync(
      path.join(__dirname, template),
      "utf8",
    );

    const compiledTemplate = Handlebars.compile(sourceDirectory);

    const emailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: subject,
      html: compiledTemplate(payload),
    };
    await transporter.sendMail(emailOptions);
  } catch (error) {
    systemLogs.error(`Email not sent: ${error}`);
  }
};

export default sendEmail;
