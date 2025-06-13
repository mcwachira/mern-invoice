import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import path from "path";
import transporter from "../helpers/emailTransport";
import { systemLogs } from "./logger";
import Handlebars from "handlebars";
import { SentMessageInfo } from "nodemailer";

// // Debug: Check current working directory
// console.log("🔍 Current working directory:", process.cwd());
// console.log("🔍 __dirname:", __dirname);

// // Check if .env file exists
// const envPath = path.resolve(process.cwd(), ".env");
// console.log("🔍 Looking for .env at:", envPath);
// console.log("🔍 .env file exists:", fs.existsSync(envPath));

// // Try to read .env file directly
// try {
//   const envContent = fs.readFileSync(envPath, "utf8");
//   console.log("🔍 .env file content:");
//   console.log(envContent);
// } catch (error: any) {
//   console.error("❌ Could not read .env file:", error.message);
// }

// // Load dotenv with explicit path
// const result = dotenv.config({ path: envPath });
// if (result.error) {
//   console.error("❌ Error loading .env:", result.error);
// } else {
//   console.log("✅ dotenv.config() result:", result.parsed);
// }

// // Check environment variables after loading
// console.log("🔍 DOMAIN after loading:", process.env.DOMAIN);
// console.log("🔍 SENDER_EMAIL after loading:", process.env.SENDER_EMAIL);
// console.log("🔍 NODE_ENV after loading:", process.env.NODE_ENV);

// Handle __dirname for  CommonJS
const currentDir = __dirname;

// console.log(currentDir);

console.log("checking if this works", process.env.DOMAIN);

type EmailPayload = Record<string, any>;
const sendEmail = async (
  email: string,
  subject: string,
  payload: EmailPayload,
  template: string,
): Promise<SentMessageInfo | void> => {
  try {
    const senderEmail = process.env.SENDER_EMAIL;
    // console.log("senders email", senderEmail);
    if (!senderEmail) {
      throw new Error("SENDER_EMAIL environment variable is not set");
    }

    const sourceDirectory = fs.readFileSync(
      path.join(currentDir, template),
      "utf8",
    );
    console.log(sourceDirectory);

    const compiledTemplate = Handlebars.compile(sourceDirectory);

    const emailOptions = {
      from: senderEmail,
      to: email,
      subject: subject,
      html: compiledTemplate(payload),
    };
    await transporter?.sendMail(emailOptions);
  } catch (error) {
    systemLogs.error(`Email not sent: ${error}`);
  }
};

export default sendEmail;
