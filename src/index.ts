// const express = require('express');
import express from "express";
import type { Request, Response } from "express";
const port = 3005;
const app = express();

app.use(express.json());

interface User {
    id: number;
    name: string,
}

const db = {
    users: [{id: 1, name: 'Vlad'}, {id: 2, name: 'Vika'}]
};
// const users: [] = []

app.get('/', (req: Request, res: Response) => {
    res.send('Main page!!!')
})

app.get('/number', (req: Request, res: Response) => {
    const age = 16;

    if (age >= 18) {
        res.send('Super page!')
    } else {
        res.send('Limit page!')
    }
})

app.get('/users', (req: Request, res: Response) => {
    const queryName = req.query.name;
    let foundUsers: User[] = db.users;

    if (!db.users.length) {
        return res.sendStatus(404);
    } else if (queryName) {
        foundUsers = db.users.filter((user: User) => user.name.toLowerCase().indexOf(queryName as string) > -1);
    }
    
    res.json(foundUsers)
})

app.get('/users/:id', (req: Request, res: Response) => {
    const userId: string | undefined = req.params.id;

    if (!db.users.length || !req.params.id) {
        return res.sendStatus(404);
    }

    res.json(db.users.find(user => user.id === +userId!));
})

app.post('/users', (req: Request, res: Response) => {
    if (!req.body) {
        return res.sendStatus(400);
    }

    const createUser: User = {
        id: Number(new Date()),
        name: req.body.name,
    }

    db.users.push(createUser);

    res.status(201).send(createUser);
})

app.delete('/users/:id', (req: Request, res: Response) => {
    const userId: string | undefined = req.params.id;

    db.users = db.users.filter((user: User) => user.id !== +userId!);

    res.sendStatus(204)
})

app.listen(port, () => {
    console.log('starting to port: ' + port)
})