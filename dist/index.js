// const express = require('express');
import express from "express";
const port = 3005;
const app = express();
app.use(express.json());
const db = {
    users: [{ id: 1, name: 'Vlad' }, { id: 2, name: 'Vika' }]
};
// const users: [] = []
app.get('/', (req, res) => {
    res.send('Main page!!!');
});
app.get('/number', (req, res) => {
    const age = 16;
    if (age >= 18) {
        res.send('Super page!');
    }
    else {
        res.send('Limit page!');
    }
});
app.get('/users', (req, res) => {
    const queryName = req.query.name;
    let foundUsers = db.users;
    if (!db.users.length) {
        return res.sendStatus(404);
    }
    else if (queryName) {
        foundUsers = db.users.filter((user) => user.name.toLowerCase().indexOf(queryName) > -1);
    }
    res.json(foundUsers);
});
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    if (!db.users.length || !req.params.id) {
        return res.sendStatus(404);
    }
    res.json(db.users.find(user => user.id === +userId));
});
app.post('/users', (req, res) => {
    if (!req.body) {
        return res.sendStatus(400);
    }
    const createUser = {
        id: Number(new Date()),
        name: req.body.name,
    };
    db.users.push(createUser);
    res.status(201).send(createUser);
});
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    db.users = db.users.filter((user) => user.id !== +userId);
    res.sendStatus(204);
});
app.listen(port, () => {
    console.log('starting to port: ' + port);
});
//# sourceMappingURL=index.js.map