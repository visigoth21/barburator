import { v4 as uuidv4 } from 'uuid';
export const generateRandomId = () => uuidv4();

// import { generateRandomString, alphabet } from "oslo/crypto";

// export const generateRandomId = () => generateRandomString(10, alphabet("a-z", "0-9"));

// type GetReadableDateParams = {
//     date: Date;
//     options?: Intl.DateTimeFormatOptions;
// };
