// const express = require('express');
import express from "express";
const port = 3005;
const app = express();
app.use(express.json());
export const HTTP_STATUS = {
    OK_200: 200,
    CREATED_201: 201,
    NOT_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
};
const db = {
    users: [{ id: 1, name: 'Vlad' }, { id: 2, name: 'Vika' }]
};
app.get('/', (req, res) => {
    res.send('Main page!!!');
});
app.get('/users', (req, res) => {
    const queryName = req.query.name;
    let foundUsers = db.users;
    if (!db.users.length) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    }
    else if (queryName) {
        foundUsers = db.users.filter((user) => user.name.toLowerCase().indexOf(queryName) > -1);
    }
    res.json(foundUsers);
});
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const user = db.users.find(user => user.id === +userId);
    if (!user) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    }
    res.json(user);
});
app.post('/users', (req, res) => {
    if (!req.body?.name) {
        return res.sendStatus(HTTP_STATUS.BAD_REQUEST_400);
    }
    const createUser = {
        id: Number(new Date()),
        name: req.body.name,
    };
    db.users.push(createUser);
    res.status(HTTP_STATUS.CREATED_201).send(createUser);
});
app.delete('/users/:id', (req, res) => {
    const userId = Number(req.params.id);
    const isUser = db.users.find(user => user.id === userId);
    if (!isUser) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    }
    db.users = db.users.filter((user) => user.id !== userId);
    res.sendStatus(HTTP_STATUS.NOT_CONTENT_204);
});
app.put('/users/:id', (req, res) => {
    const userId = Number(req.params.id);
    const name = req.body?.name;
    if (!name) {
        res.sendStatus(HTTP_STATUS.BAD_REQUEST_400);
        return;
    }
    const isUser = db.users.find(user => user.id === userId);
    if (!isUser) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    }
    db.users = db.users.map((user) => {
        if (user.id === userId) {
            user.name = name;
        }
        return user;
    });
    res.sendStatus(HTTP_STATUS.NOT_CONTENT_204);
});
app.listen(port, () => {
    console.log('starting to port: ' + port);
});
//# sourceMappingURL=index.js.map