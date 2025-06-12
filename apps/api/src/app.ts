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

// Handle both with and without trailing slash
app.get("/api/v1", (req: Request, res: Response) => {
  res.json({ message: "API is working", status: "success" });
});

app.get("/api/v1/", (req: Request, res: Response) => {
  res.json({ message: "API is working", status: "success" });
});

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "Test endpoint working", status: "success" });
});

app.get("/make", (req: Request, res: Response) => {
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
