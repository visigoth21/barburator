// src/routes/books/+page.server.ts
import { redirect } from '@sveltejs/kit';
import { getAllBooks } from '$lib/server/db/models/books';

export const load = async ({parent}) => {

	const { localsUser } = await parent();
	
	if (!localsUser) {
		redirect(302, '../../login');
	}

	return {
		books: await getAllBooks()
	};
};