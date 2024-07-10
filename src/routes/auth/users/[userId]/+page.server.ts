// src/routes/auth/users/[userId]/+page.server.ts

/** @type {import('.$types').PageLoad} */

import { getUserById, isUserActive } from '$lib/server/db/models/users';
import { error, redirect } from '@sveltejs/kit';


export const load = async ({ params, parent }) => {

    const { localsUser } = await parent();

    if (!localsUser) {
        redirect(302, '../../login');
    }

    const { userId } = params;
    const user = await getUserById(userId);

    if (!user) {
        error(404, 'User not found');
    }

    return {
        user
    };
};

import { editUserById } from '$lib/server/db/models/users';
import { fail } from '@sveltejs/kit';

export const actions = {
    async updateUser({ params, request }) {
        const { userId } = params;
        // const { title, author, publicationDate, isbn } = Object.fromEntries(
        //     await request.formData()
        // ) as {
        //     title: string;
        //     author: string;
        //     publicationDate: string;
        //     isbn: string;
        // };

        try {
            // await editUserById({
            //     id: userId,
            //     title,
            //     author,
            //     publicationDate: new Date(publicationDate),
            //     isbn: isbn ? parseInt(isbn) : undefined
            // });

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

    async userActive({ params }) {
        const { userId } = params;
        await isUserActive(userId, true);

        throw redirect(302, '/auth/books');
    }
};

//import { isUserActive } from '$lib/server/db/models/users';

// ...timestamp,
// id: text('id').primaryKey().notNull().$defaultFn(() => generateRandomId()),
// email: text('email').unique().notNull(),
// hashedPassword: text('hashed_password').notNull(),
// isLevel1Admin: integer('is_level_1_admin', { mode: 'boolean' }).default(true),
// isLevel2Admin: integer('is_level_2_admin', { mode: 'boolean' }).default(false),
// isCustomer: integer('is_customer', { mode: 'boolean' }).default(false),
// firstName: text('first_name'),
// lastName: text('last_name'),
// middleName: text('middle_name'),
// phoneNumber: text('phone_number'),
// address: text('address'),
// address2: text('address2'),
// city: text('city'),
// state: text('state'),
// zip: text('zip'),
// company_id: text('company_id'),
// isActive: integer('is_active', { mode: 'boolean' }).default(true)