// src/routes/books/add/+page.server.ts

import { createNewBook } from '$lib/server/db/models/books';
import { generateRandomId } from '$lib/server/utils';
import { fail } from '@sveltejs/kit';

export const load = async () => {
	return {};
};

export const actions = {
	addNewBook: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());
		const { title, author, isbn, publicationDate } = formData as {
			title: string;
			author: string;
			isbn: string;
			publicationDate: string;
		};

		const book = {
			id: generateRandomId(),
			title,
			author,
			isbn: Number(isbn),
			publicationDate: new Date(publicationDate)
		};

		try {
			await createNewBook(book);
			
			return {
				success: true,
				bookId: book.id
			}
		} catch (error) {
            console.error(error);
			return fail(500, {
				error: 'Something went wrong while adding the book. Please try again.'
			});
		}
	}
};