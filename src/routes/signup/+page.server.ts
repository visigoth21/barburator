import { createNewUser, getAllUsers, getUserByEmail } from '$lib/server/db/models/users';
import { fail, redirect } from '@sveltejs/kit';
import { generateRandomId } from '../../lib/server/utils';
import { Argon2id } from 'oslo/password';

export const load = async ({ parent }) => {
	const { localsUser } = await parent();

	if (localsUser) {
		redirect(302, '/protected');
	}



	return { users: await getAllUsers() };
};

export const actions = {
	default: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());
		const {
			email,
			password,
			firstName,
			lastName,
			middleName,
			phoneNumber,
			address,
			address2,
			city,
			state,
			zip
		} = formData as {
			email: string | undefined;
			password: string | undefined;
			firstName: string | undefined;
			lastName: string | undefined;
			middleName: string | undefined;
			phoneNumber: string | undefined;
			address: string | undefined;
			address2: string | undefined;
			city: string | undefined;
			state: string | undefined;
			zip: string | undefined;
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
		await createNewUser({
			id: userId,
			email,
			hashedPassword,
			firstName,
			lastName,
			middleName,
			phoneNumber,
			address,
			address2,
			city,
			state,
			zip
		});

		redirect(302, '/login');
	}
};
