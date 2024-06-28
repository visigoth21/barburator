// src/routes/books/+page.server.ts

import { getAllBooks } from '$lib/server/db/books';

export const load = async () => {
	return {
		books: await getAllBooks()
	};
};