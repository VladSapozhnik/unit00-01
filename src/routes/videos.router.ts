import {Router} from "express";
import { Request, Response } from "express";
import {createVideoValidator} from "../validators/video/create-video.validator";
import {updateVideoValidator} from "../validators/video/update-video.validator";
import {HTTP_STATUS} from "../enum/http-status";``
import {dateIso} from "../constants/dateIso";
import {db} from "../db";
import type {ErrorResponse, ValidationError} from "../types/error.type";
import type {ResponseVideoDto} from "../dto/video/response-video.dto";
import type {RequestWithBody, RequestWithParam, RequestWithParamAndBody} from "../types/request.type";
import type {CreateVideoDto} from "../dto/video/create-video.dto";
import type {UpdateVideoDto} from "../dto/video/update-video.dto";
import type {QueryVideoDto} from "../dto/video/query-video.dto";

export const videosRouter = Router();

videosRouter.get('/', (req: Request, res: Response<ResponseVideoDto[]>) => {
    //Если эмитировать получение данных с db
    const videos = db.videos.map(video => video);
    res.json(videos);
})

videosRouter.get('/:id', (req: RequestWithParam<QueryVideoDto>, res: Response<ResponseVideoDto>) => {
    const videoId: number = Number(req.params.id);

    const video: ResponseVideoDto | undefined = db.videos.find(video => video.id === videoId)

    if (!video) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
        return;
    }

    res.json(video);
})

videosRouter.post('/', (req: RequestWithBody<CreateVideoDto>, res: Response<ResponseVideoDto | ErrorResponse>) => {
    const body: CreateVideoDto = req.body;

    const date = new Date(dateIso)
    const publicationDate = new Date(Number(date) + 24 * 60 * 60 * 1000).toISOString();

    const errors: ValidationError[] = createVideoValidator(body);

    if (errors.length) {
        res.status(HTTP_STATUS.BAD_REQUEST_400).json({ errorsMessages: errors });
        return;
    }

    const video: ResponseVideoDto = {
        id: Number(new Date()),
        title: body.title,
        author: body.author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: dateIso,
        publicationDate,
        availableResolutions: body.availableResolutions,
    }

    db.videos.push(video);
    res.status(HTTP_STATUS.CREATED_201).json(video);
})

videosRouter.put('/:id', (req: RequestWithParamAndBody<QueryVideoDto, UpdateVideoDto>, res: Response<ErrorResponse>) => {
    const body = req.body;
    const videoId: number = Number(req.params.id);

    let existVideo: ResponseVideoDto | undefined = db.videos.find((video): boolean => video.id === videoId);
    if (!existVideo) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
        return;
    }

    const errors: ValidationError[] = updateVideoValidator(body);

    if (errors.length) {
        res.status(HTTP_STATUS.BAD_REQUEST_400).json({ errorsMessages: errors });
        return;
    }

    const updateVideo: UpdateVideoDto = {
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

videosRouter.delete('/:id', (req: RequestWithParam<QueryVideoDto>, res: Response) => {
    const videoId: number = Number(req.params.id);

    const existVideo: ResponseVideoDto | undefined = db.videos.find(video => video.id === videoId)

    if (!existVideo) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
        return;
    }

    db.videos = db.videos.filter((video: ResponseVideoDto): boolean => video.id !== videoId);

    res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
})