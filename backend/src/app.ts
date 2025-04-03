import express from "express";
import router from "./routes/routes.js";
import { errorMiddleware } from "./middlewares/errorMiddlewares.js";

export const app = express();

app.use(express.json());

app.use("/api/v1", router);

app.use(errorMiddleware);
