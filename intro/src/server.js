//import stuff

//unfortunately we can't use import yet
//import express from 'express';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

//req -> request
//res -> response
app.get('/', (_req, res) => {
    res.send('Hello, world!')
});

app.get('/hello', (_req, res) => {
    res.send('Hello there!')
});
//JSON - javascript objecct notation 
//HTTP hyertext transfer protocol
//defines a framework for web requests
// CREATE, READ, UPDATE, DELETE -> "CRUD"
// POST    GET

app.post('/add', (req, res) => {
    
    res.send(`${req.body.a} + ${req.body.b} = ${req.body.a + req.body.b}`);
});

app.listen(3000, () => {
    console.log('Listening!')
});