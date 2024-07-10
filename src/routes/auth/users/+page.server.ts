// src/routes/auth/users/+page.server.ts
import { redirect } from '@sveltejs/kit';
import { getAllUsers } from '$lib/server/db/models/users';

export const load = async ({ parent }) => {

    const { localsUser } = await parent();

    if (!localsUser) {
        redirect(302, '../..');
    }

    return {
        users: await getAllUsers()
    };
};