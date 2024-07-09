// src/stores/auth.store.ts

import { getUserByEmail } from '$lib/server/db/models/users';
import { readable } from "svelte/store";

const user = '';
const pass = '';

export const store = readable(null);

let sessions = []

export const UserDetails = async (username) => {
    // if ( username === user && password === pass )
    return 1
}