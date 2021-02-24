const express = require('express');

const PORT = 3000;

const server = express();

server.use(express.json());

const strList = [];

server.post('/api/mutation', (req,res) => {
    const {str} = req.body;
    let toReturn = "";
    
    for (let i = 0; i < str.length; i++) {
        if (((i+1)%3) === 0) {
            toReturn += str.substring(i, i+1);
        }
    }
    const addToList = {
        [str]: toReturn
    }
    strList.push(addToList);
    res.json(strList);
});


server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
});