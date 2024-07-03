import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { generateId } from 'lucia';
import { generateRandomId } from '../utils';

const timestamp = {
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date()),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date())
};

const users = sqliteTable('users', {
	...timestamp,
	id: text('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => generateId(15)),
	email: text('email').unique().notNull(),
	hashedPassword: text('hashed_password').notNull()
});

const sessions = sqliteTable('sessions', {
	...timestamp,
	id: text('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => generateId(15)),
	expiresAt: integer('expires_at').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id)
});

const books = sqliteTable('books', {
	...timestamp,
	id: text('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => generateRandomId()),
	publicationDate: integer('publication_date', { mode: 'timestamp' }).notNull(),
	title: text('title').notNull(),
	author: text('author').notNull(),
	isbn: integer('isbn').unique()
});

type InsertBookParams = typeof books.$inferInsert;

export { books, sessions, users, type InsertBookParams };
