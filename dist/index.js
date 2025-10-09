"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const videos_router_1 = require("./routes/videos-router");
const db_1 = require("./db");
const http_status_1 = require("./constants/http-status");
const port = Number(process.env.PORT) || 3000;
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.get('/', (req, res) => {
    res.send('Main page!!!');
});
exports.app.use('/videos', videos_router_1.videosRouter);
exports.app.delete('/testing/all-data', (req, res) => {
    db_1.db.videos.length = 0;
    db_1.db.videos = [];
    res.sendStatus(http_status_1.HTTP_STATUS.NO_CONTENT_204);
});
exports.app.listen(port, () => {
    console.log('starting to port: ' + port);
});
