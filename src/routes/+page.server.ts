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
