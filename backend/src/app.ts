import express from "express";
import cookiParser from "cookie-parser";
import cors from "cors";
import router from "./routes/routes.js";
import { errorMiddleware } from "./middlewares/errorMiddlewares.js";
import { corsOptions } from "./config/cors.js";

export const app = express();

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookiParser());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

app.use("/api/v1", router);

app.use(errorMiddleware);
