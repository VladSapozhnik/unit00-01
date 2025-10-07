import express, { Request, Response } from "express";
const port = 3005;
export const app = express();

app.use(express.json());

export const dateIso: string = new Date().toISOString()

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

interface Video {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: null | number,
    createdAt: string,
    publicationDate: string,
    availableResolutions: AvailableResolutions[]
}

class HttpError extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
    }
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

    const video: Video | undefined = db.videos.find(video => video.id === videoId)

    if (!video) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
        return;
    }

    res.json(video);
})

app.post('/videos', (req: Request, res: Response) => {
    const { title, author, availableResolutions } = req.body;

    const isValidAvailableResolutions: boolean = Array.isArray(availableResolutions) && availableResolutions.every((resolution: string)  => (Object.values(AvailableResolutions) as string[]).includes(resolution));

    if (typeof title !== "string" || title.trim() === "" || title.length > 39,
        typeof author !== "string" || author.trim() === "" || author.length > 19 || !isValidAvailableResolutions) {
        res.status(HTTP_STATUS.BAD_REQUEST_400).send({
            errorsMessages: [
                {
                    "message": "Invalid input data. Need title, author, and availableResolutions[]",
                    "field": "title, author, and availableResolutions[]"
                }
            ]
        });
        return;
    }

    const video = {
        id: Number(new Date()),
        title,
        author,
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: dateIso,
        publicationDate: dateIso,
        availableResolutions,
    }

    db.videos.push(video);
    res.status(HTTP_STATUS.CREATED_201).json(video);
})

app.put('/videos/:id', (req: Request, res: Response) => {
    // const userId: number = Number(req.params.id);
    // const name: string | undefined = req.body?.name;
    //
    // const videoEdit = {
    //     "title": "string",
    //     "author": "string",
    //     "availableResolutions": ["P144"],
    //     "canBeDownloaded": true,
    //     "minAgeRestriction": 18,
    //     "publicationDate": "2025-10-07T10:06:12.459Z"
    // }
    //
    // if (!name) {
    //     res.sendStatus(HTTP_STATUS.BAD_REQUEST_400);
    //     return;
    // }
    //
    // const existUser = db.users.find(user => user.id === userId)
    //
    // if (!existUser) {
    //     res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    //     return;
    // }
    //
    // db.users = db.users.map((user: User): User => {
    //     if(user.id === userId){
    //         user.name = name;
    //     }
    //
    //     return user;
    // });
    //
    // res.sendStatus(HTTP_STATUS.NOT_CONTENT_204)

    const videoId: number = Number(req.params.id);

    const existVideo: Video | undefined = db.videos.find((video: Video): boolean => video.id === videoId);

    if (!existVideo) {
        res.status(HTTP_STATUS.NOT_FOUND_404);
        return;
    }

    const { title, author, availableResolutions, minAgeRestriction, canBeDownloaded } = req.body;

    const videoEdit = {
        title,
        author,
        availableResolutions,
        canBeDownloaded,
        minAgeRestriction,
        "publicationDate": dateIso
    }
})

app.delete('/videos/:id', (req: Request, res: Response) => {
    const videoId: number = Number(req.params.id);

    const existVideo: Video | undefined = db.videos.find(video => video.id === videoId)

    if (!existVideo) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
        return;
    }

    db.videos = db.videos.filter((video: Video): boolean => video.id !== videoId);

    res.sendStatus(HTTP_STATUS.NOT_CONTENT_204)
})

app.delete('/testing/all-data', (req: Request, res: Response) => {
    db.videos = [];
    res.sendStatus(HTTP_STATUS.NOT_CONTENT_204)
})

app.listen(port, () => {
    console.log('starting to port: ' + port)
})