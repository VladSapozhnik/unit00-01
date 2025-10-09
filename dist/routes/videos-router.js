"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = require("express");
const create_validator_1 = require("../validators/create-validator");
const update_validator_1 = require("../validators/update-validator");
const http_status_1 = require("../constants/http-status");
``;
const date_1 = require("../constants/date");
const db_1 = require("../db");
exports.videosRouter = (0, express_1.Router)({});
exports.videosRouter.get('/', (req, res) => {
    //Если эмитировать получение данных с db
    const videos = db_1.db.videos.map(video => video);
    res.json(videos);
});
exports.videosRouter.get('/:id', (req, res) => {
    const videoId = Number(req.params.id);
    const video = db_1.db.videos.find(video => video.id === videoId);
    if (!video) {
        res.sendStatus(http_status_1.HTTP_STATUS.NOT_FOUND_404);
        return;
    }
    res.json(video);
});
exports.videosRouter.post('/', (req, res) => {
    const body = req.body;
    const errors = (0, create_validator_1.createValidator)(body);
    if (errors.length) {
        res.status(http_status_1.HTTP_STATUS.BAD_REQUEST_400).json({ errorsMessages: errors });
        return;
    }
    const video = {
        id: Number(new Date()),
        title: body.title,
        author: body.author,
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: date_1.dateIso,
        publicationDate: date_1.dateIso,
        availableResolutions: body.availableResolutions,
    };
    db_1.db.videos.push(video);
    res.status(http_status_1.HTTP_STATUS.CREATED_201).json(video);
});
exports.videosRouter.put('/:id', (req, res) => {
    const body = req.body;
    const videoId = Number(req.params.id);
    let existVideo = db_1.db.videos.find((video) => video.id === videoId);
    if (!existVideo) {
        res.sendStatus(http_status_1.HTTP_STATUS.NOT_FOUND_404);
        return;
    }
    const errors = (0, update_validator_1.updateValidator)(body);
    if (errors.length) {
        res.status(http_status_1.HTTP_STATUS.BAD_REQUEST_400).json({ errorsMessages: errors });
        return;
    }
    const updateVideo = {
        title: body.title,
        author: body.author,
        availableResolutions: body.availableResolutions,
        canBeDownloaded: body.canBeDownloaded,
        minAgeRestriction: body.minAgeRestriction,
        publicationDate: body.publicationDate
    };
    Object.assign(existVideo, updateVideo);
    res.sendStatus(http_status_1.HTTP_STATUS.NO_CONTENT_204);
});
exports.videosRouter.delete('/:id', (req, res) => {
    const videoId = Number(req.params.id);
    const existVideo = db_1.db.videos.find(video => video.id === videoId);
    if (!existVideo) {
        res.sendStatus(http_status_1.HTTP_STATUS.NOT_FOUND_404);
        return;
    }
    db_1.db.videos = db_1.db.videos.filter((video) => video.id !== videoId);
    res.sendStatus(http_status_1.HTTP_STATUS.NO_CONTENT_204);
});
