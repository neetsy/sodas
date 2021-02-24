import * as express from 'express';
import * as argon2 from 'argon2';

const PORT = 3000;

const server = express();
server.use(express.json());

const users: User[] = [];
let userId: number = 0;

const items: Item[] = [];
let itemId: number = 0;

//create account
server.post('/createUser', async (req,res) => {
    const{email, password} = req.body;

    const newUser = await createAccount(email, password);

    res.json(newUser);

});
/**
 * createAccount is a helper function which first checks to see if a user already exists with the same email account and if not, proceeds to create an account in addition to hashing the password
 * @param email 
 * @param password
 * @returns user id if account creation is successful or false if the email is already in the list of users
 */
const createAccount = async (email: string, password: string): Promise<boolean | number> => {
    for (const user of users) {
        if (user.email === email) {
            return false;
        }
    }

    password = await argon2.hash(password);

    const user: User = {
        email: email,
        password: password,
        cart: [],
        id: userId
    }

    userId++;

    users.push(user);

    return user.id;

    
};

//create an item in the master list of items
server.post('/createItem', (req,res) => {
    const {name, price, description} = req.body;
    for (const item of items) {
        if (item.name === name) {
            res.json({
                success: false
            });
            return;
        }
    }

    const item: Item = {
        name: name,
        price: price,
        description: description,
        id: itemId
    }

    itemId++;

    items.push(item);

    res.json({
        success: true
    });
});


//add an item to cart (item is identified by id)
server.post('/addToCart', async (req,res) => {
    const {email, password, itemID} = req.body;
    let item;

    for (let i: number = 0; i < items.length; i++) {
        if (itemID == items[i].id) {
            item = items[i];
        }
    }


    for (let i: number = 0; i < users.length; i++) {
        if (users[i].email === email) {
            if (await argon2.verify(users[i].password,password)) {
                (users[i].cart).push(itemID);
                res.json({
                    sucess: true,
                    itemAdded: item
                });
                return;
            } else {
                //handles the case where email is correct, but password is not
                res.json({
                    message: "Invalid login."
                });
                return;
            }
        } 
    }

    //handles the case where an email is not matched with the list of users
    res.json({
        message: "User does not exist."
    });

});

//remove an item or items from the cart given an ID and a quantity
server.post('/remove', async (req,res) => {
    const {email, password, itemID, quantity} = req.body;

    if (itemID >= items.length) {
        res.json({
            success: false,
            message: "Item does not exist"
        });
        return;
    }

    let accountVerified = false;
    let amountRemoved = 0;
    let amountRemaining;
    for (let i: number = 0; i < users.length; i++) {
        if (users[i].email === email) {
            if (await argon2.verify(users[i].password,password)) {
                accountVerified = true;
                for (let j: number = 0; j < (users[i].cart).length; j++) {
                    if ((users[i].cart)[j] === itemID) { 
                        (users[i].cart).splice(j, 1);
                        amountRemoved++;
                        if (amountRemoved == quantity) {
                            amountRemaining = (users[i].cart).length;
                            break;
                        }
                    }
                    
                }
            } else {
                //handles the case where email is correct, but password is not
                res.json({
                    success: false,
                    message: "Invalid login."
                });
                return;
            }
        } 
    }

    if (accountVerified) {
        res.json({
            success: true,
            message: `Removed ${amountRemoved} items from the cart`,
            remainingItems: amountRemaining
        });
    } else {
        //handles the case where an email is not matched with the list of users
        res.json({
            success: false,
            message: "User does not exist."
        });
    }
    
});

//respond with items in cart
server.post('/cart', async (req,res) => {
    const{email, password} = req.body;

    for (let i: number = 0; i < users.length; i++) {
        if (users[i].email === email) {
            if (await argon2.verify(users[i].password,password)) {
                res.json(users[i].cart);
                return;
            } else {
                //handles the case where email is correct, but password is not
                res.json({
                    message: "Invalid login."
                });
                return;
            }
        } 
    }

    //handles the case where an email is not matched with the list of users
    res.json({
        message: "User does not exist."
    });


});


//return all items available for purchase
server.get('/items', (req,res) => {
    res.json(items);
});


//return all users (testing purposes)
server.get('/users', (req,res) => {
    res.json(users);
});

interface User {
    email: string;
    password: string;
    cart: number[];
    id: number;
};

interface Item {
    id: number;
    name: string;
    price: number;
    description: string;
};

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
});