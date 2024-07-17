import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
//import { generateId } from 'lucia';
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
	id: text('id').primaryKey().notNull().$defaultFn(() => generateRandomId()),
	email: text('email').unique().notNull(),
	hashedPassword: text('hashed_password').notNull(),
	sysAdmin: integer('level1Admin', { mode: 'boolean' }).default(false),
	level1Admin: integer('level1Admin', { mode: 'boolean' }).default(true),
	level2Admin: integer('level2Admin', { mode: 'boolean' }).default(false),
	company_id: text('company_id'),
	active: integer('active', { mode: 'boolean' }).default(true)
});

const usersInfo = sqliteTable('usersInfo', {
	...timestamp,
	id: text('id').primaryKey().notNull(),
	firstName: text('firstName'),
	lastName: text('lastName'),
	middleName: text('middleName'),
	phoneNumber: text('phoneNumber'),
	address: text('address'),
	address_2: text('address_2'),
	city: text('city'),
	state: text('state'),
	zip: text('zip'),
	active: integer('active', { mode: 'boolean' }).default(true)
});

const companies = sqliteTable('companies', {
	...timestamp,
	id: text('id').primaryKey().notNull().$defaultFn(() => generateRandomId()),
	name: text('name').notNull(),
	website: text('website'),
	phoneNumber: text('phoneNumber'),
	address: text('address'),
	address2: text('address2'),
	city: text('city'),
	state: text('state'),
	zip: text('zip'),
	contact: text('contact'),
	active: integer('active', { mode: 'boolean' }).default(true)
});

const customers = sqliteTable('customers', {
	...timestamp,
	id: text('id').primaryKey().notNull().$defaultFn(() => generateRandomId()),
	name: text('name').notNull(),
	website: text('website'),
	phoneNumber: text('phoneNumber'),
	address: text('address'),
	address2: text('address2'),
	city: text('city'),
	state: text('state'),
	zip: text('zip'),
	contact: text('contact'),
	companyId: text('companyId').notNull().references(() => companies.id),
	active: integer('active', { mode: 'boolean' }).default(true)
});

const properties = sqliteTable('properties', {
	...timestamp,
	id: text('id').primaryKey().notNull().$defaultFn(() => generateRandomId()),
	name: text('name').notNull(),
	website: text('website'),
	phoneNumber: text('phoneNumber'),
	address: text('address'),
	address2: text('address2'),
	city: text('city'),
	state: text('state'),
	zip: text('zip'),
	contact: text('contact'),
	customerId: text('customerId').notNull().references(() => customers.id),
	companyId: text('companyId').notNull().references(() => companies.id),
	active: integer('active', { mode: 'boolean' }).default(true)
});

const sessions = sqliteTable('sessions', {
	...timestamp,
	id: text('id').primaryKey().notNull().$defaultFn(() => generateRandomId()),
	expiresAt: integer('expires_at').notNull(),
	userId: text('user_id').notNull().references(() => users.id)
});

// const books = sqliteTable('books', {
// 	...timestamp,
// 	id: text('id').primaryKey().notNull().$defaultFn(() => generateRandomId()),
// 	publicationDate: integer('publication_date', { mode: 'timestamp' }).notNull(),
// 	title: text('title').notNull(),
// 	author: text('author').notNull(),
// 	isbn: integer('isbn').unique()
// });

// type InsertBookParams = typeof books.$inferInsert;
type InsertUserParams = typeof users.$inferInsert;
type InsertUserInfoParams = typeof usersInfo.$inferInsert;
type InsertCompanyParams = typeof companies.$inferInsert;
type InsertCustomerParams = typeof customers.$inferInsert;
type InsertPropertyParams = typeof properties.$inferInsert;

export {
	// books,
	// type InsertBookParams,
	sessions,
	users,
	usersInfo,
	companies,
	customers,
	properties,
	type InsertUserParams,
	type InsertUserInfoParams,
	type InsertCompanyParams,
	type InsertCustomerParams,
	type InsertPropertyParams
};
