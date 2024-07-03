import { lucia } from '$lib/server/auth/lucia';
import { getUserByEmail } from '$lib/server/db/models/users';
import { fail, redirect } from '@sveltejs/kit';
import { Argon2id } from 'oslo/password';

export const load = async ({ parent }) => {
	const { localsUser } = await parent();

	if (localsUser) {
		redirect(302, '/protected');
	}

	return {};
};

export const actions = {
	default: async ({ cookies, request }) => {
		const formData = Object.fromEntries(await request.formData());
		const { email, password } = formData as {
			email: string | undefined;
			password: string | undefined;
		};

		if (!email || !password) {
			return fail(400, { error: 'Email and password are required' });
		}

		// Check if the user exists
		const user = await getUserByEmail(email);
		if (!user) {
			return fail(400, { error: 'Invalid email or password' });
		}

		// Verify the password
		const validPassword = await new Argon2id().verify(user.hashedPassword, password);
		if (!validPassword) {
			return fail(400, { error: 'Invalid email or password' });
		}

		// Create a new session and set the session cookie
		const session = await lucia.createSession(user.id, {
			created_at: new Date(),
			updated_at: new Date()
		});
		const sessionCookie = lucia.createSessionCookie(session.id);

		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/auth');
	}
};
