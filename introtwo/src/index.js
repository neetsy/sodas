const express = require('express');
const argon2 = require('argon2');

//always lowercase or camelcase were possible
//EXCEPT for constant non-objects
const PORT = 3000;

const server = express();

//.use allows us to import and applu MIDDLEWARES
//middlewares just "sit in the middle" of requests
//intercepting and doing something with all of the requests
//in this case we're useing the body parser to transform request bodies into JSON
server.use(express.json());

//GET, POST are two HTTP request types
//GET -> carries over request parameters from the server
//POST -> carries over request parameters from the client (aka you can specify stuff)

//global variable to store accounts
const users = [];

//push() - add an element to the end
//pop() - remove an element from the end (and return it)
//length - returns the length


//LOGINS
server.post('/login', async (req, res) => {
    const {email, username, password} = req.body;
    
    const success =  await loginWithEmail(email, password);

    if (success === undefined) {
        res.json({
            success: false,
            message: `Could not find account with email ${email}.`
        });
    } else {
        res.json({
            success: success,
            //ternary statement
            message: `Authentication ${success ? 'succeeded' : 'failed'}`
        });
    }
});

//helper function to login and verify users
const loginWithEmail = async (email, password) => {
    for (const user of users) {
        // in JS, three equal signs is the way to go
        // two equal signs: will check by conversion
        if(user.email === email) {
            //check if the passwords match
            return await argon2.verify(user.password, password);
        }
    }

    return;
};

const loginWithUsername = async (username, password) => {

};

//CREATING AN ACCOUNT
server.post('/register', async (req, res) => {
    //unpack operator
    const{email, username, password, firstName, lastName } = req.body;

    const newUser = await createAccount(email, username, password, firstName, lastName);

    res.json(newUser);
});

//helper function to create the account
//this function has to be asynchronous
const createAccount = async (email, username, password, firstName, lastName) => {
    //encrypt the password

    //hash() is an an ASYNCHRONOUS command
    //aka does not run in the expected order
    password = await argon2.hash(password);

    const user = {
        email: email,
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName
    }

    //ACCESSING PROPERTIES INSIDE AN OBJECT
    // user.email;
    // user['email'];

    // const propertyWeWantToAccess = someFunction();
    // user[propertyWeWantToAccess];

    users.push(user);

    return user;
};


server.listen(PORT, () => {
    //TEMPLATE STRINGS: backtick 
    //allows to escape the strings and include JavaScript "literals"
    console.log(`Listening on port: ${PORT}!`);
    createAccount('a', 'a', 'a', 'a', 'a');
});