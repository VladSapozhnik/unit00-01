import express, { Request, Response } from "express";
import 'dotenv/config'
import {videosRouter} from "./routes/videos-router";
import {HTTP_STATUS} from "./constants/http-status";
import {AvailableResolutions} from "./enum/available-resolutions";
import {db} from "./db";

const port: number = Number(process.env.PORT) || 3000;
export const app = express();

app.use(express.json());

export interface VideoResponseDto {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: null | number,
    createdAt: string,
    publicationDate: string,
    availableResolutions: AvailableResolutions[]
}

export interface ValidationError {
    field: string;
    message: string;
}

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

// export default app;