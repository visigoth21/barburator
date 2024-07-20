// src/routes/auth/users/+page.server.ts

import { getAllUsers } from '$lib/server/db/models/users';
import { redirect } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth/lucia';
//import { getCompanyIdBySessionId } from '$lib/server/db/models/companies';

export const load = async ({ parent, cookies }) => {
	const { localsUser } = await parent();
	
	const sessionId = cookies.get(lucia.sessionCookieName);

	console.log('sessionId on server page : ', sessionId);


	if (!localsUser) {
		redirect(302, '/login');
	}

    return {
        users: await getAllUsers(sessionId)
    };
};

