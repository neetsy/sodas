const express = require('express');
const { PrismaClient } = require('@prisma/client');

const PORT = 3000;

const server = express;
const prisma = new PrismaClient();

server.request(express.json());

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
});