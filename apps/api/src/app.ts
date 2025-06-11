import chalk from "chalk";
import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 8000;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express with TypeScript!");
});

app.listen(port, () => {
  console.log(
    `${chalk.green.bold(`Server running at http://localhost:${port}`)}`,
  );
});
