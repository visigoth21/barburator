import { lucia } from '$lib/server/auth/lucia';
import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const LuciaHandle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(lucia.sessionCookieName);
	const url = event.url;

	//console.log('sessionId: ', sessionId,  'url: ', url.pathname);
	const protectedRoutes = [
        '/auth',
        '/auth/*'
    ];
    // const guestRoutes = [
    //     '/login',
    //     '/signup'
    // ];

	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;

			if(protectedRoutes.find(u => url.pathname.indexOf(u) > -1)) {
				redirect(302, '../../login');
			};

		return await resolve(event);
	}

	const { session, user } = await lucia.validateSession(sessionId);
	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}

	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}

	event.locals.user = user;
	event.locals.session = session;
	//event.locals.company = session;
	console.log('event.locals.user: ', event.locals.user);

	return await resolve(event);
};

export const handle: Handle = sequence(LuciaHandle);
