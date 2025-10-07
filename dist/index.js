"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_STATUS = exports.app = void 0;
// const express = require('express');
const express_1 = __importDefault(require("express"));
const port = 3005;
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.HTTP_STATUS = {
    OK_200: 200,
    CREATED_201: 201,
    NOT_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
};
const db = {
    users: [{ id: 1, name: 'Vlad' }, { id: 2, name: 'Vika' }]
};
exports.app.get('/', (req, res) => {
    res.send('Main page!!!');
});
exports.app.get('/users', (req, res) => {
    const queryName = req.query.name;
    let foundUsers = db.users;
    if (!db.users.length) {
        res.sendStatus(exports.HTTP_STATUS.NOT_FOUND_404);
        return;
    }
    else if (queryName) {
        foundUsers = db.users.filter((user) => user.name.toLowerCase().indexOf(queryName) > -1);
    }
    res.json(foundUsers);
});
exports.app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const user = db.users.find(user => user.id === +userId);
    if (!user) {
        res.sendStatus(exports.HTTP_STATUS.NOT_FOUND_404);
        return;
    }
    res.json(user);
});
exports.app.post('/users', (req, res) => {
    var _a;
    if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.name)) {
        return res.sendStatus(exports.HTTP_STATUS.BAD_REQUEST_400);
    }
    const createUser = {
        id: Number(new Date()),
        name: req.body.name,
    };
    db.users.push(createUser);
    return res.status(exports.HTTP_STATUS.CREATED_201).send(createUser);
});
exports.app.delete('/users/:id', (req, res) => {
    const userId = Number(req.params.id);
    const isUser = db.users.find(user => user.id === userId);
    if (!isUser) {
        res.sendStatus(exports.HTTP_STATUS.NOT_FOUND_404);
        return;
    }
    db.users = db.users.filter((user) => user.id !== userId);
    res.sendStatus(exports.HTTP_STATUS.NOT_CONTENT_204);
});
exports.app.put('/users/:id', (req, res) => {
    var _a;
    const userId = Number(req.params.id);
    const name = (_a = req.body) === null || _a === void 0 ? void 0 : _a.name;
    if (!name) {
        res.sendStatus(exports.HTTP_STATUS.BAD_REQUEST_400);
        return;
    }
    const isUser = db.users.find(user => user.id === userId);
    if (!isUser) {
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
exports.app.listen(port, () => {
    console.log('starting to port: ' + port);
});
