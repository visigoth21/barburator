import { createNewUser, getUserByEmail } from '$lib/server/db/models/users';
import { fail, redirect } from '@sveltejs/kit';
//import { generateId } from 'lucia';
import { generateRandomId } from '../../lib/server/utils';
import { Argon2id } from 'oslo/password';

export const load = async ({ parent }) => {
	const { localsUser } = await parent();

	if (localsUser) {
		redirect(302, '/protected');
	}

	return {};
};

export const actions = {
	default: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());
		const { email, password } = formData as {
			email: string | undefined;
			password: string | undefined;
		};

		if (!email || !password) {
			return fail(400, { error: 'Email and password are required' });
		}

		const userId = generateRandomId();
		const hashedPassword = await new Argon2id().hash(password);

		// Check if the email already exists
		const user = await getUserByEmail(email);
		if (user) {
			return fail(400, { error: 'Email already exists' });

		}

		// Create a new user
		await createNewUser({ id: userId, email, hashedPassword });

		redirect(302, '/login');
	}
};
