//import { v6 as uuidv6 } from 'uuid';
//export const generateRandomId = () => uuidv6();

import { generateRandomString, alphabet } from "oslo/crypto";

export const generateRandomId = () => generateRandomString(10, alphabet("a-z", "0-9"));

type GetReadableDateParams = {
    date: Date;
    options?: Intl.DateTimeFormatOptions;
};
