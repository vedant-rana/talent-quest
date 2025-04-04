import express from "express";
import cookiParser from "cookie-parser";
import router from "./routes/routes.js";
import { errorMiddleware } from "./middlewares/errorMiddlewares.js";

export const app = express();

app.use(express.json());
app.use(cookiParser());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

app.use("/api/v1", router);

app.use(errorMiddleware);
