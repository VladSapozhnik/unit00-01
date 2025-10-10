"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const setting_1 = require("./setting");
const port = Number(process.env.PORT) || 3000;
setting_1.app.listen(port, () => {
    console.log('starting to port: ' + port);
});
