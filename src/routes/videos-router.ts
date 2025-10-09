import {Router} from "express";
import {ValidationError, VideoResponseDto} from "../index";
import { Request, Response } from "express";
import {createValidator} from "../validators/create-validator";
import {updateValidator, VideoUpdateDto} from "../validators/update-validator";
import {HTTP_STATUS} from "../constants/http-status";``
import {dateIso} from "../constants/date";
import {db} from "../db";

export const videosRouter = Router();

videosRouter.get('/', (req: Request, res: Response) => {
    //Если эмитировать получение данных с db
    const videos = db.videos.map(video => video);
    res.json(videos);
})

videosRouter.get('/:id', (req: Request, res: Response) => {
    const videoId: number = Number(req.params.id);

    const video: VideoResponseDto | undefined = db.videos.find(video => video.id === videoId)

    if (!video) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
        return;
    }

    res.json(video);
})

videosRouter.post('/', (req: Request, res: Response) => {
    const body = req.body;

    const errors: ValidationError[] = createValidator(body);

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

videosRouter.put('/:id', (req: Request, res: Response) => {
    const body = req.body;
    const videoId: number = Number(req.params.id);

    let existVideo: VideoResponseDto | undefined = db.videos.find((video): boolean => video.id === videoId);
    if (!existVideo) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
        return;
    }

    const errors: ValidationError[] = updateValidator(body);

    if (errors.length) {
        res.status(HTTP_STATUS.BAD_REQUEST_400).json({ errorsMessages: errors });
        return;
    }

    const updateVideo: VideoUpdateDto = {
            title: body.title,
            author: body.author,
            availableResolutions: body.availableResolutions,
            canBeDownloaded: body.canBeDownloaded,
            minAgeRestriction: body.minAgeRestriction,
            publicationDate: body.publicationDate
    }

    Object.assign(existVideo, updateVideo);

    res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
})

videosRouter.delete('/:id', (req: Request, res: Response) => {
    const videoId: number = Number(req.params.id);

    const existVideo: VideoResponseDto | undefined = db.videos.find(video => video.id === videoId)

    if (!existVideo) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
        return;
    }

    db.videos = db.videos.filter((video: VideoResponseDto): boolean => video.id !== videoId);

    res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
})