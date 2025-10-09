"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
// import {videosRouter} from "./routes/videos-router";
// import {HTTP_STATUS} from "./constants/http-status";
// import {AvailableResolutions} from "./enum/available-resolutions";
// import {db} from "./db";
const port = Number(process.env.PORT) || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Main page!!!');
});
//
// app.use('/videos', videosRouter)
//
// app.delete('/testing/all-data', (req: Request, res: Response) => {
//     db.videos.length = 0;
//     db.videos = [];
//     res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
// })
app.listen(port, () => {
    console.log('starting to port: ' + port);
});
// export default app;
