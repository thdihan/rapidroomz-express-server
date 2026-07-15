import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./router";

const app: Application = express();

app.use(express.json());
const allowedOrigins = ["http://localhost:3000", "http://127.0.0.1:3000", "https://dev.rapidroomz.com"];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    }),
);

import { globalErrorHandler } from "./middlewares/globalErrorHandler";

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
    res.json("Hello World!");
});

app.use(globalErrorHandler);

export default app;
