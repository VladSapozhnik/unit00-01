// const express = require('express');
import express, { Request, Response } from "express";
const port = 3005;
export const app = express();

app.use(express.json());

export const HTTP_STATUS = {
    OK_200: 200,
    CREATED_201: 201,
    NOT_CONTENT_204: 204,

    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
}

interface User {
    id: number;
    name: string,
}

const db = {
    users: [{id: 1, name: 'Vlad'}, {id: 2, name: 'Vika'}]
};

app.get('/', (req: Request, res: Response) => {
    res.send('Main page!!!')
})

app.get('/users', (req: Request, res: Response) => {
    const queryName = req.query.name;
    let foundUsers: User[] = db.users;

    if (!db.users.length) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
        return;
    } else if (queryName) {
        foundUsers = db.users.filter((user: User) => user.name.toLowerCase().indexOf(queryName as string) > -1);
    }
    
    res.json(foundUsers)
})

app.get('/users/:id', (req: Request, res: Response) => {
    const userId: string = req.params.id!;

    const user = db.users.find(user => user.id === +userId)

    if (!user) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
        return;
    }

    res.json(user);
})

app.post('/users', (req: Request, res: Response) => {
    if (!req.body?.name) {
        return res.sendStatus(HTTP_STATUS.BAD_REQUEST_400);
    }

    const createUser: User = {
        id: Number(new Date()),
        name: req.body.name,
    }

    db.users.push(createUser);

    return res.status(HTTP_STATUS.CREATED_201).send(createUser);
})

app.delete('/users/:id', (req: Request, res: Response) => {
    const userId: number = Number(req.params.id);

    const isUser = db.users.find(user => user.id === userId)

    if (!isUser) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
        return;
    }

    db.users = db.users.filter((user: User) => user.id !== userId);

    res.sendStatus(HTTP_STATUS.NOT_CONTENT_204)
})

app.put('/users/:id', (req: Request, res: Response) => {
    const userId: number = Number(req.params.id);
    const name: string | undefined = req.body?.name;

    if (!name) {
        res.sendStatus(HTTP_STATUS.BAD_REQUEST_400);
        return;
    }

    const isUser = db.users.find(user => user.id === userId)

    if (!isUser) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
        return;
    }

    db.users = db.users.map((user: User): User => {
        if(user.id === userId){
            user.name = name;
        }

        return user;
    });

    res.sendStatus(HTTP_STATUS.NOT_CONTENT_204)
})

app.listen(port, () => {
    console.log('starting to port: ' + port)
})