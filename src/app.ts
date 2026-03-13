import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./router";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
    res.json("Hello World!");
});

export default app;
