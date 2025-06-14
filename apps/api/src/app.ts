import chalk from "chalk";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import { morganMiddleware, systemLogs } from "./utils/logger";
import connectionToDb from "./config/connectDB";
import { errorHandler, notFound } from "./middleware/errorMiddleware";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import { apiLimiter } from "./middleware/apiLimiter";
// import expressMongoSanitize from "@exortek/express-mongo-sanitize";

(async () => {
  await connectionToDb();
})();
const app = express();
const PORT = process.env.PORT;

const domainURL = process.env.DOMAIN;
console.log(domainURL);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// app.use(expressMongoSanitize());

app.use(morganMiddleware);

app.set("trust proxy", 1);

app.get("/api/v1/make", (req, res) => {
  res.json({ message: "Test endpoint working", status: "success" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", apiLimiter, userRoutes);

app.use(notFound); // 404 middleware
app.use(errorHandler); // error handler (must be last)

app.listen(PORT, () => {
  console.log(
    `${chalk.green.bold("Server  running in ")} ${chalk.yellow.bold(process.env.NODE_ENV)} mode on port  ${chalk.blue.bold(PORT)}`,
  );
  systemLogs.info(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`,
  );
});
