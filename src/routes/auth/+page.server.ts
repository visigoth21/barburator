import { lucia } from '$lib/server/auth/lucia';
import { fail, redirect } from '@sveltejs/kit';

export const load = async () => {};

export const actions = {
	logout: async ({ cookies, locals }) => {
		if (!locals.session) {
			return fail(401, { error: 'Unauthorized' });
		}

		await lucia.invalidateSession(locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();

		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/login');
	}
};



// import { redirect } from '@sveltejs/kit';

// export const load = async ({ parent }) => {
// 	const { localsUser } = await parent();

// 	if (!localsUser) {
// 	//	redirect(302, '../../login');
// 	}
	
// 		if (!localsUser.companyId) {
// 			//console.log('localsUser: ', localsUser.companyId);
// 		 	//redirect(302, './auth/users');
// 		}
	
// 		//console.log('localsUser: ', localsUser);

// 	return {};
// };
