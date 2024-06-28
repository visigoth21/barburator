// src/lib/server/db/books.ts

import { db } from '$lib/server/db/client';
import { books, type InsertBookParams } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';

const createNewBook = async (book: InsertBookParams) => {
	await db.insert(books).values(book);
};

const getBookById = async (id: string) => {
	const book = await db.select().from(books).where(eq(books.id, id));

	return book[0];
};

const deleteBookById = async (id: string) => {
	await db.delete(books).where(eq(books.id, id));
};

const getAllBooks = async () => {
	return await db.select().from(books).orderBy(desc(books.publicationDate));
};

const editBookById = async (book: InsertBookParams & { id: string }) => {
	await db.update(books).set(book).where(eq(books.id, book.id));
};

export { deleteBookById, editBookById, getAllBooks, getBookById, createNewBook };