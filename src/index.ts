import express, { Request, Response } from "express";
import {validationCreateDto} from "./validators/validationCreateDto";
import {validateUpdateDto, VideoUpdateDto} from "./validators/updateCreateDto";
const port = 3005;
export const app = express();

app.use(express.json());

const dateIso: string = new Date().toISOString()

export const HTTP_STATUS = {
    OK_200: 200,
    CREATED_201: 201,
    NOT_CONTENT_204: 204,

    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
}

export enum AvailableResolutions {
    P144 = "P144",
    P240 = "P240",
    P360 = "P360",
    P480 = "P480",
    P720 = "P720",
    P1080 = "P1080",
    P1440 = "P1440",
    P2160 = "P2160",
}

interface VideoDto {
    id: number,
    title: string,
    author: string,
    availableResolutions: AvailableResolutions[]
    canBeDownloaded: boolean,
    minAgeRestriction: null | number,
    createdAt: string,
    publicationDate: string,
}

export interface ValidationError {
    field: string;
    message: string;
}


const db = {
    videos: [
        {
            "id": 1,
            "title": "Как проходить проверку API автоматизированными тестами",
            "author": "it-incubator",
            "canBeDownloaded": true,
            "minAgeRestriction": null,
            "createdAt": "2025-10-07T08:06:59.355Z",
            "publicationDate": "2025-10-07T08:06:59.355Z",
            "availableResolutions": [
                AvailableResolutions.P240
            ]
        }
    ]
};
// const allowedResolutions: AvailableResolutions[] = Object.values(AvailableResolutions);


app.get('/', (req: Request, res: Response) => {
    res.send('Main page!!!')
})

app.get('/videos', (req: Request, res: Response) => {
    //Если эмитировать получение данных с db
    const videos = db.videos.map(video => video);
    res.json(videos);
})

app.get('/videos/:id', (req: Request, res: Response) => {
    const videoId: number = Number(req.params.id);

    const video: VideoDto | undefined = db.videos.find(video => video.id === videoId)

    if (!video) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
        return;
    }

    res.json(video);
})

app.post('/videos', (req: Request, res: Response) => {
    const body = req.body;

    const errors: ValidationError[] = validationCreateDto(body);

    if (errors.length) {
        res.status(HTTP_STATUS.BAD_REQUEST_400).json({ errorsMessages: errors });
        return;
    }

    const video = {
        id: Number(new Date()),
        title: body.title,
        author: body.author,
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: dateIso,
        publicationDate: dateIso,
        availableResolutions: body.availableResolutions,
    }

    db.videos.push(video);
    res.status(HTTP_STATUS.CREATED_201).json(video);
})

app.put('/videos/:id', (req: Request, res: Response) => {
    const body = req.body;
    const videoId: number = Number(req.params.id);

    const errors: ValidationError[] = validateUpdateDto(body);

    if (errors.length) {
        res.status(HTTP_STATUS.BAD_REQUEST_400).json({ errorsMessages: errors });
        return;
    }

    const existVideo: VideoDto | undefined = db.videos.find((video: VideoDto): boolean => video.id === videoId);

    if (!existVideo) {
        res.status(HTTP_STATUS.NOT_FOUND_404);
        return;
    }

    const videoEdit: VideoUpdateDto = {
        title: body.title,
        author: body.author,
        availableResolutions: body.availableResolutions,
        canBeDownloaded: body.canBeDownloaded,
        minAgeRestriction: body.minAgeRestriction,
        publicationDate: body.publicationDate,
    }

    res.sendStatus(HTTP_STATUS.NOT_CONTENT_204);
})

app.delete('/videos/:id', (req: Request, res: Response) => {
    const videoId: number = Number(req.params.id);

    const existVideo: VideoDto | undefined = db.videos.find(video => video.id === videoId)

    if (!existVideo) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
        return;
    }

    db.videos = db.videos.filter((video: VideoDto): boolean => video.id !== videoId);

    res.sendStatus(HTTP_STATUS.NOT_CONTENT_204)
})

app.delete('/testing/all-data', (req: Request, res: Response) => {
    db.videos = [];
    res.sendStatus(HTTP_STATUS.NOT_CONTENT_204)
})

app.listen(port, () => {
    console.log('starting to port: ' + port)
})