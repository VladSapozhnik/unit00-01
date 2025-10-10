import express, { Request, Response } from "express";
import {videosRouter} from "./routes/videos.router";
import {db} from "./db";
import {HTTP_STATUS} from "./enum/http-status";

export const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Main page!!!')
})

app.use('/videos', videosRouter)

app.delete('/testing/all-data', (req: Request, res: Response) => {
    db.videos.length = 0;
    db.videos = [];
    res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
})