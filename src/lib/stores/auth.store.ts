// src/lib/stores/auth.store.ts

//import { getUserByEmail } from '$lib/server/db/models/users';
import { readable } from "svelte/store";

export default readable({ isActive: false, 
    isLoggedin: false,
    isSysAdmin: false, 
    isCustomer: false, 
    isLevel1Admin: false, 
    isLevel2Admin: false });

// const user = '';
// const pass = '';

// export const store = readable(null);

// let sessions = []

// export const UserDetails = async (username) => {
//     // if ( username === user && password === pass )
//     return 1
// }