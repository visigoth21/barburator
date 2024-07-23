// src/routes/books/[bookId]/+page.server.ts

import { getBookCoverId } from '$lib/server/books';
import { getBookById } from '$lib/server/db/models/books';
import { error, redirect } from '@sveltejs/kit';


export const load = async ({ params }) => {



	const { bookId } = params;
	const book = await getBookById(bookId);

	if (!book) {
		error(404, 'Book not found');
	}

	const coverIdPromise = getBookCoverId(book.isbn ? String(book.isbn) : undefined);

	return {
		book,
		coverIdPromise
	};
};
import { editBookById } from '$lib/server/db/models/books';
import { fail } from '@sveltejs/kit';

export const actions = {
	async updateBook({ params, request }) {
		const { bookId } = params;
		const { title, author, publicationDate, isbn } = Object.fromEntries(
			await request.formData()
		) as {
			title: string;
			author: string;
			publicationDate: string;
			isbn: string;
		};

		try {
			await editBookById({
				id: bookId,
				title,
				author,
				publicationDate: new Date(publicationDate),
				isbn: isbn ? parseInt(isbn) : undefined
			});
	
			return {
				success: true
			};
		} catch (error) {
            console.error(error);
			return fail(500, {
				error: 'Something went wrong while updating the book. Please try again.'
			});
		}
	},

	async deleteBook({ params }) {
		const { bookId } = params;
		await deleteBookById(bookId);

		throw redirect(302, '/books');
	}
};

import { deleteBookById } from '$lib/server/db/models/books';

