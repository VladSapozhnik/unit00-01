"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailableResolutions = exports.HTTP_STATUS = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const port = 3005;
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
const dateIso = new Date().toISOString();
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
exports.app.get('/users/:id', (req, res) => {
    const videoId = req.params.id;
    const video = db.videos.find(video => video.id === +videoId);
    if (!video) {
        res.sendStatus(exports.HTTP_STATUS.NOT_FOUND_404);
        return;
    }
    res.json(video);
});
exports.app.post('/videos', (req, res) => {
    const { title, author, availableResolutions } = req.body;
    const isValidAvailableResolutions = Array.isArray(availableResolutions) && availableResolutions.every((resolution) => Object.values(AvailableResolutions).includes(resolution));
    if (!title || !author || !isValidAvailableResolutions) {
        res.status(exports.HTTP_STATUS.BAD_REQUEST_400).send({
            "errorsMessages": [
                {
                    "message": "Invalid input data. Need title, author, and availableResolutions[]",
                    "field": "string"
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
    };
    db.videos.push(video);
    res.status(exports.HTTP_STATUS.CREATED_201).json(video);
});
exports.app.put('/videos/:id', (req, res) => {
    var _a;
    const userId = Number(req.params.id);
    const name = (_a = req.body) === null || _a === void 0 ? void 0 : _a.name;
    if (!name) {
        res.sendStatus(exports.HTTP_STATUS.BAD_REQUEST_400);
        return;
    }
    const existUser = db.users.find(user => user.id === userId);
    if (!existUser) {
        res.sendStatus(exports.HTTP_STATUS.NOT_FOUND_404);
        return;
    }
    db.users = db.users.map((user) => {
        if (user.id === userId) {
            user.name = name;
        }
        return user;
    });
    res.sendStatus(exports.HTTP_STATUS.NOT_CONTENT_204);
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
exports.app.listen(port, () => {
    console.log('starting to port: ' + port);
});
