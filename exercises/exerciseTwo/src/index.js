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



//global variable to store accounts
const users = [];


//LOGINS
server.post('/login', async (req, res) => {
    const {email, username, password} = req.body;
    
    let success;
    if (email) {
        success =  await loginWithEmail(email, password);
    } else if (username) {
        success =  await loginWithUsername(username, password);
    }

    if (success === undefined) {
        res.json({
            success: false,
            message: `Could not find account with ${email ? `email ${email}` : `username ${username}`}.`
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
    const user = users.find((element) => {
        return element.username === username;
    });
    if (user) {
        return await argon2.verify(user.password, password);
    }

    return;
    
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
    //check for existing email
    for (const user of users) {
        if (user.email === email) {
            return false; 
        }
    } 

    //check for existing username
    for (const user of users) {
        if (user.username === username) {
            return false;
        }
    }
    
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

//find user
server.post('/search', (req,res) => {
    const {email, username} = req.body;
    let user;
    if (email) {
        user =  findByEmail(email);
    } else if (username) {
        user =  findByUsername(username);
    }

    if (user === undefined) {
        res.json({
            success: false,
            message: `Could not find account with ${email ? `email ${email}` : `username ${username}`}.`
        });
    } else {
        res.json({
            //ternary statement
            success: true,
            message: `Found account account with ${email ? `email ${email}` : `username ${username}`}.`,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username
            
        });
    }
});

const findByUsername = (username) => {
    for (const user of users) {
        if(user.username === username) {
            return user;
        }
    }
};

const findByEmail = (email) => {
    const user = users.find((element) => {
        return element.email === email;
    });
    if (user) {
        return user;
    }

    return;
}

server.post('/changePassword', async (req,res) => {
    const {username, email, oldPassword, newPassword} = req.body;
    let user;
    if (email) {
        for(let i = 0; i < users.length; i++) {
            if (users[i].email === email) {
                user = users[i];
                if (await argon2.verify(users[i].password, oldPassword)) {
                    users[i].password = await argon2.hash(newPassword);
                    res.json({
                        success: true,
                        message: `Password successfully changed.`
                    });
                } else {
                    res.json({
                        success: false,
                        message: `Password could not be changed.`
                    });
                }
            }
        }
    } else if (username) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].username === username) {
                user = users[i];
                if (await argon2.verify(users[i].password, oldPassword)) {
                    users[i].password = await argon2.hash(newPassword);
                    res.json({
                        success: true,
                        message: `Password successfully changed.`
                    });
                } else {
                    res.json({
                        success: false,
                        message: `Password could not be changed.`
                    });
                }
            }
        }
    }

    if (user === undefined) {
        res.json({
            user: false,
            message: `Could not find account with ${email ? `email ${email}` : `username ${username}`}.`
        });
    } 
});

//list of all users
server.get('/users', (req,res) => {
    res.json(users);
});


server.listen(PORT, () => {
    //TEMPLATE STRINGS: backtick 
    //allows to escape the strings and include JavaScript "literals"
    console.log(`Listening on port: ${PORT}!`);
});

