// src/routes/auth/users/[userId]/+page.server.ts

/** @type {import('.$types').PageLoad} */

import { getUserById, editUserById, userActive, createNewUser, getUserByEmail } from '$lib/server/db/models/users';
import { getCompanyIdBySessionId } from '$lib/server/db/models/companies';
import { error, redirect, fail } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth/lucia';
import { generateRandomId } from '$lib/server/utils';
import { Argon2id } from 'oslo/password';

export const load = async ({ params, parent }) => {
	const { localsUser } = await parent();

	if (!localsUser) {
		redirect(302, '../../login');
	}

	const { userId } = params;
	if (userId) {
		if (userId === '0') {
			console.log('userId : ', userId);
			const user = {};

			return { user };
		} else {
		const user = await getUserById(userId);

		if (!user) {
			error(404, 'User not found');
		}
		return {
			user
		};

	}
	}
};

export const actions = {
	async updateUser({ params, request }) {
		const { userId } = params;
		const { firstName, lastName, middleName, phoneNumber, address, address2, city, state, zip } =
			Object.fromEntries(await request.formData()) as {
				firstName: string;
				lastName: string;
				middleName: string;
				phoneNumber: string;
				address: string;
				address2: string;
				city: string;
				state: string;
				zip: string;
			};

		try {
			await editUserById({
				id: userId,
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
			
			return {
				success: true
			};
		} catch (error) {
            console.error(error);
			return fail(500, {
				error: 'Something went wrong while updating the User. Please try again.'
			});
		}
	},

async deleteUser({ params }) {
			const { userId } = params;
			try {
				console.log('userId : ', userId);
				await userActive(userId, false);
			return { success: true
			};
		} catch (error) {
            console.error(error);
			return fail(500, {
				error: 'Something went wrong while updating the User. Please try again.'
			});
		}
	},
	//	throw redirect(303, `./`);

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
	},

};
