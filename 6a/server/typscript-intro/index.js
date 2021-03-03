const express = require('express');
const argon2 = require('argon2');


const PORT = 3000;

const server = express();
server.use(express.json());

const users = [];
const books = [];

const newUser = async (firstName, lastName, email, password) => {
    //checks if an account exists with given email
    for (const user of users) {
        if (user.email === email) {
            return false;
        }
    }

    //creating unique id
    let unique;
    let id = Math.floor(Math.random*100000);
    while (!unique) {
        unique = true;
        for (const user of users) {
            if (user.id === id) {
                unique = false;
                id = Math.floor(Math.random*100000);
            }
        }
    }

    //encrypting the password
    password = await argon2.hash(password);

    const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        id: id
    }

    users.push(user);
    return user;

    
};

const newBook = (name, isbn13, price, author, year) => {
    const book = {
        name: name,
        isbn13: isbn13,
        price: price,
        author: author,
        year: year
    }

    books.push(book);
    return book;

};
