// src/routes/auth/users/+page.server.ts

import { getActiveCompanyUsers } from '$lib/server/db/models/users';
import { redirect } from '@sveltejs/kit';
//import { lucia } from '$lib/server/auth/lucia';
import { getCompanyById } from '$lib/server/db/models/companies';

export const load = async ({ parent, locals }) => {
	const { localsUser } = await parent();
	
	//const sessionId = cookies.get(lucia.sessionCookieName);

	// console.log('sessionId on User page : ', sessionId);
	//console.log('user on User page : ', locals.session.userId);
	//console.log('Company on User page : ', locals.session.company_id);

	const allCompanyUsers = await getActiveCompanyUsers(locals.session.company_id);
	const companyData = await getCompanyById(locals.session.company_id);



	if (!localsUser) {
		redirect(302, '/login');
	}

    return {
        users: allCompanyUsers,
				company: companyData
	};
};