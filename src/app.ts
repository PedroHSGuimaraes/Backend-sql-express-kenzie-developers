import "dotenv/config";
import "express-async-errors";
import DeveloperRouter from "./routers/developer.routes";
import ProjectRouter from "./routers/project.routes";
import express, { Application } from "express";
import { handleErros } from "./errors/error";

const app: Application = express();
app.use(express.json());

app.use("/developers", DeveloperRouter);
app.use("/projects", ProjectRouter);

app.use(handleErros);

export default app;
