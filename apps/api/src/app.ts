import chalk from "chalk";
import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";
import morgan from "morgan";
import { morganMiddleware, systemLogs } from "./utils/logger";

const app = express();
const PORT = process.env.PORT || 1997;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(morganMiddleware);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express with TypeScript!");
});

app.listen(PORT, () => {
  console.log(
    `${chalk.green.bold("Server  running in ")} ${chalk.yellow.bold(process.env.NODE_ENV)} mode on port  ${chalk.blue.bold(PORT)}`,
  );
  systemLogs.info(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`,
  );
});
