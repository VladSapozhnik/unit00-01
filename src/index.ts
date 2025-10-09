import express, { Request, Response } from "express";
import 'dotenv/config'
import {videosRouter} from "./routes/videos-router";
import {db} from "./db";
import {HTTP_STATUS} from "./constants/http-status";

const port: number = Number(process.env.PORT) || 3000;
const app = express();

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

app.listen(port, () => {
    console.log('starting to port: ' + port)
})