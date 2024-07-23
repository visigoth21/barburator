// src/routes/auth/users/[userId]/+page.server.ts

/** @type {import('.$types').PageLoad} */

import { getUserById, editUserById, userActive } from '$lib/server/db/models/users';
import { error, redirect, fail } from '@sveltejs/kit';

export const load = async ({ params, parent }) => {
	const { localsUser } = await parent();

	if (!localsUser) {
		redirect(302, '../../login');
	}

	const { userId } = params;
	if (userId) {
		const user = await getUserById(userId);

		if (!user) {
			error(404, 'User not found');
		}

		return {
			user
		};
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
		} catch (error) {
			console.error(error);
			return fail(500, {
				error: 'Something went wrong while updating the User. Please try again.'
			});
		}

		redirect(303, `./`);
	},

	async deleteUser({ params }) {
		const { userId } = params;
		await userActive(userId, false);

		throw redirect(302, './');
	}
};
