//TypeScript

//it is not a different language
// a set of static typings over the existing language
//TypeScript gets compiled to JavaScript at compiletime

const concat = (str1: string, str2: string): string => {
    return str1+str2;
}

const test = (condition: boolean): string | number => {
    if (condition) return 'string';
    else return 42;
}

const list: number[] = [4, 2, 3, 56, 6, 69, 420];
const strList: string[] = ['42'];

const varyingList: (string | number | boolean)[] = ['hello', 42, true];

const obj: ObjType = {
    hello: 3,
    list: [1, 23, 4, 5],
    obj: {
        hello: 3,
        list: [1, 23, 4, 5]
    },
    test: [
        {
            prop1: true,
            prop2: false
        },
        {
            prop1: false,
            prop2: true
        }
    ]
};

interface ObjType {
    hello: number;
    list: number[];
    obj: {
        hello: number;
        list: number[];
    },
    test: {
        prop1: boolean;
        prop2: boolean;
    }[]
};

interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};