import express from "express"
import chalk from "chalk";
import morgan from "morgan"
import cookieParser from "cookie-parser"
import {morganMiddleware, systemLogs} from "./utils/Logger.js";
import connectionToDb from './config/connectDb.js'

await connectionToDb()
const app = express();


//morgan for logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

app.use(express.json());

app.use(express.urlencoded({extended: false}))

app.use(cookieParser())

app.use(morganMiddleware)

app.get("/api/v1/test", (req, res) => {
    console.log('hello to me ')
})

const PORT = process.env.PORT || 1997;

app.listen(PORT, () => {

    console.log(`${chalk.green.bold("Server  running in ")} ${chalk.yellow.bold(process.env.NODE_ENV)} mode on port  ${chalk.blue.bold(PORT)}`)

    systemLogs.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})
