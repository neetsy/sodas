// code

//variables
const CONSTANT_NAME = 'you cant change this'; // equivalent to a final variable in java
let VARIABLE_NAME = 'assignment';            // defines a variable
var GLOBAL_VAR = 'dont do this ever';        // defines a variable - DONT USE THIS
//javascript is a dynamically typed language
//java is a staically-typed language

//functions: "Arrow Notation"
const add = (a, b) => {
    return a+b;
};

const hello = (name) => {
    return "Hello, " + name;
};

//console.log is equivalent to System.out.println();
console.log('Hello, world!');
console.log(CONSTANT_NAME);
console.log(GLOBAL_VAR);
console.log(add(5, 5));