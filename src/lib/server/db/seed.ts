// src/lib/server/db/seed.ts

import { randBetweenDate, randBook } from '@ngneat/falso';
import { db } from './client';
import { books, type InsertBookParams } from './schema';

const generateRsndomBooks = async (count: number) => {
	for (let i = 0; i < count; i++) {
		const randomBook = randBook();

		const book: InsertBookParams = {
			title: randomBook.title,
			author: randomBook.author,
			isbn: Math.floor(Math.random() * 1000000000),
			publicationDate: randBetweenDate({ from: new Date(2000, 0, 1), to: new Date() })
		};

		await db.insert(books).values(book);

		console.log(`Inserted book ${i + 1} of ${count}: ${book.title}`);
	}
};

await generateRsndomBooks(20);