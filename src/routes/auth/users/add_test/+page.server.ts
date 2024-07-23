// src/routes/users/add/+page.server.ts
import { createNewUser, getUserByEmail } from '$lib/server/db/models/users';
import { getCompanyIdBySessionId } from '$lib/server/db/models/companies';
import { fail, redirect } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth/lucia';
import { generateRandomId } from '$lib/server/utils';
import { Argon2id } from 'oslo/password';

export const load = async ({ parent }) => {
	const { localsUser } = await parent();


	if (!localsUser) {
		redirect(302, '../../login');
	}

	return {};
};

export const actions = {
	addUser: async ({ cookies, request }) => {
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

    const sessionId = cookies.get(lucia.sessionCookieName);

		const userId = generateRandomId();
		const companyId = await getCompanyIdBySessionId(sessionId);
		const hashedPassword = await new Argon2id().hash(password);

		// Check if the email already exists
		const user = await getUserByEmail(email);
		if (user) {
			return fail(400, { error: 'Email already exists' });

		}

		try {
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
        zip,
        company_id: companyId,
        sysAdmin: false
      });

			
			return {
				success: true,
				userId: user.id
			}
		} catch (error) {
            console.error(error);
			return fail(500, {
				error: 'Something went wrong while adding the user. Please try again.'
			});
		}
	}
};