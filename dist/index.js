"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailableResolutions = exports.HTTP_STATUS = exports.dateIso = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const port = 3005;
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.dateIso = new Date().toISOString();
exports.HTTP_STATUS = {
    OK_200: 200,
    CREATED_201: 201,
    NOT_CONTENT_204: 204,
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
class HttpError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}
const db = {
    users: [{ id: 1, name: 'Vlad' }, { id: 2, name: 'Vika' }],
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
                "P144"
            ]
        }
    ]
};
exports.app.get('/', (req, res) => {
    res.send('Main page!!!');
});
exports.app.get('/videos', (req, res) => {
    //Если эмитировать получение данных с db
    const videos = db.videos.map(video => video);
    res.json(videos);
});
exports.app.get('/videos/:id', (req, res) => {
    const videoId = Number(req.params.id);
    const video = db.videos.find(video => video.id === videoId);
    if (!video) {
        res.sendStatus(exports.HTTP_STATUS.NOT_FOUND_404);
        return;
    }
    res.json(video);
});
exports.app.post('/videos', (req, res) => {
    const { title, author, availableResolutions } = req.body;
    const isValidAvailableResolutions = Array.isArray(availableResolutions) && availableResolutions.every((resolution) => Object.values(AvailableResolutions).includes(resolution));
    if (String(title) && !title.trim() || String(author) && !author.trim() || !isValidAvailableResolutions) {
        res.status(exports.HTTP_STATUS.BAD_REQUEST_400).send({
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
        createdAt: exports.dateIso,
        publicationDate: exports.dateIso,
        availableResolutions,
    };
    db.videos.push(video);
    res.status(exports.HTTP_STATUS.CREATED_201).json(video);
});
exports.app.put('/videos/:id', (req, res) => {
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
    const videoId = Number(req.params.id);
    const existVideo = db.videos.find(video => video.id === videoId);
    if (!existVideo) {
        res.status(exports.HTTP_STATUS.NOT_FOUND_404);
        return;
    }
    const { title, author, availableResolutions, minAgeRestriction, canBeDownloaded } = req.body;
    const videoEdit = {
        title,
        author,
        availableResolutions,
        canBeDownloaded,
        minAgeRestriction,
        "publicationDate": exports.dateIso
    };
});
exports.app.delete('/videos/:id', (req, res) => {
    const videoId = Number(req.params.id);
    const existVideo = db.videos.find(video => video.id === videoId);
    if (!existVideo) {
        res.sendStatus(exports.HTTP_STATUS.NOT_FOUND_404);
        return;
    }
    db.videos = db.videos.filter((video) => video.id !== videoId);
    res.sendStatus(exports.HTTP_STATUS.NOT_CONTENT_204);
});
exports.app.delete('/testing/all-data', (req, res) => {
    db.videos = [];
    res.sendStatus(exports.HTTP_STATUS.NOT_CONTENT_204);
});
exports.app.listen(port, () => {
    console.log('starting to port: ' + port);
});
