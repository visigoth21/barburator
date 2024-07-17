// src/routes/auth/users/+page.server.ts
import { redirect } from '@sveltejs/kit';
import { getAllCompanies } from '$lib/server/db/models/companies';

export const load = async ({ parent }) => {

    const { localsUser } = await parent();

    if (!localsUser) {
        redirect(302, '../..');
    }

    return {
        users: await getAllCompanies()
    };
};