import morgan from "morgan";
import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";

const { combine, timestamp, prettyPrint } = format;

//creating a rotation file
const fileRotateTransport = new transports.DailyRotateFile({
  filename: "logs/combine-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d",
});

//custom login file
export const systemLogs = createLogger({
  level: "http",
  format: combine(
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    prettyPrint(),
  ),
  transports: [
    fileRotateTransport,
    new transports.File({
      level: "error",
      filename: "logs/error.log",
    }),
  ],

  //exeption handlers
  exceptionHandlers: [new transports.File({ filename: "logs/exception.lg" })],
  rejectionHandlers: [new transports.File({ filename: "logs/rejections.log" })],
});

//custom morgan middlware
export const morganMiddleware = morgan(
  (tokens, req, res) => {
    const statusStr = tokens.status(req, res);
    const responseTimeStr = tokens["response-time"](req, res);
    const contentLength = tokens.res(req, res, "content-length");

    return JSON.stringify({
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: statusStr ? parseInt(statusStr, 10) : 0,
      content_length: contentLength,
      response_time: responseTimeStr ? parseFloat(responseTimeStr) : 0,
    });
  },
  {
    stream: {
      write: (message: string) => {
        try {
          const data = JSON.parse(message);
          systemLogs.http("incoming request", data);
        } catch (err) {
          console.error("Failed to parse morgan log message:", message, err);
        }
      },
    },
  },
);
