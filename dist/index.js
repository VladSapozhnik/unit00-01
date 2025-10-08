"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.AvailableResolutions = exports.HTTP_STATUS = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const validationCreateDto_1 = require("./validators/validationCreateDto");
const updateCreateDto_1 = require("./validators/updateCreateDto");
const port = 3005;
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
const dateIso = new Date().toISOString();
exports.HTTP_STATUS = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
};
var AvailableResolutions;
(function (AvailableResolutions) {
    AvailableResolutions["P144"] = "P144";
    AvailableResolutions["P240"] = "P240";
    AvailableResolutions["P360"] = "P360";
    AvailableResolutions["P480"] = "P480";
    AvailableResolutions["P720"] = "P720";
    AvailableResolutions["P1080"] = "P1080";
    AvailableResolutions["P1440"] = "P1440";
    AvailableResolutions["P2160"] = "P2160";
})(AvailableResolutions || (exports.AvailableResolutions = AvailableResolutions = {}));
exports.db = {
    videos: [
        {
            "id": 1,
            "title": "Как проходить проверку API автоматизированными тестами",
            "author": "it-incubator",
            "availableResolutions": [
                AvailableResolutions.P240
            ],
            "canBeDownloaded": true,
            "minAgeRestriction": null,
            "createdAt": "2025-10-07T08:06:59.355Z",
            "publicationDate": "2025-10-07T08:06:59.355Z",
        }
    ]
};
exports.app.get('/', (req, res) => {
    res.send('Main page!!!');
});
exports.app.get('/videos', (req, res) => {
    //Если эмитировать получение данных с db
    const videos = exports.db.videos.map(video => video);
    res.json(videos);
});
exports.app.get('/videos/:id', (req, res) => {
    const videoId = Number(req.params.id);
    const video = exports.db.videos.find(video => video.id === videoId);
    if (!video) {
        res.sendStatus(exports.HTTP_STATUS.NOT_FOUND_404);
        return;
    }
    res.json(video);
});
exports.app.post('/videos', (req, res) => {
    const body = req.body;
    const errors = (0, validationCreateDto_1.validationCreateDto)(body);
    if (errors.length) {
        res.status(exports.HTTP_STATUS.BAD_REQUEST_400).json({ errorsMessages: errors });
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
    };
    exports.db.videos.push(video);
    res.status(exports.HTTP_STATUS.CREATED_201).json(video);
});
exports.app.put('/videos/:id', (req, res) => {
    const body = req.body;
    const videoId = Number(req.params.id);
    const existVideo = exports.db.videos.find((video) => video.id === videoId);
    if (!existVideo) {
        res.sendStatus(exports.HTTP_STATUS.NOT_FOUND_404);
        return;
    }
    const errors = (0, updateCreateDto_1.validateUpdateDto)(body, existVideo);
    if (errors.length) {
        res.status(exports.HTTP_STATUS.BAD_REQUEST_400).json({ errorsMessages: errors });
        return;
    }
    existVideo.title = body.title;
    existVideo.author = body.author;
    if (!existVideo.availableResolutions.includes(body.availableResolutions)) {
        existVideo.availableResolutions.push(...body.availableResolutions);
    }
    existVideo.canBeDownloaded = body.canBeDownloaded;
    existVideo.minAgeRestriction = body.minAgeRestriction;
    existVideo.publicationDate = body.publicationDate;
    res.sendStatus(exports.HTTP_STATUS.NO_CONTENT_204);
});
exports.app.delete('/videos/:id', (req, res) => {
    const videoId = Number(req.params.id);
    const existVideo = exports.db.videos.find(video => video.id === videoId);
    if (!existVideo) {
        res.sendStatus(exports.HTTP_STATUS.NOT_FOUND_404);
        return;
    }
    exports.db.videos = exports.db.videos.filter((video) => video.id !== videoId);
    res.sendStatus(exports.HTTP_STATUS.NO_CONTENT_204);
});
exports.app.delete('/testing/all-data', (req, res) => {
    exports.db.videos = [];
    res.sendStatus(exports.HTTP_STATUS.NO_CONTENT_204);
});
exports.app.listen(port, () => {
    console.log('starting to port: ' + port);
});
