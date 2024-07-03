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
	isLevel1Admin: integer('is_level_1_admin', { mode: 'boolean' }).default(true),
	isLevel2Admin: integer('is_level_2_admin', { mode: 'boolean' }).default(false),
	isCustomer: integer('is_customer', { mode: 'boolean' }).default(false),
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),	
	middleName: text('middle_name'),
	phoneNumber: text('phone_number'),
	address: text('address'),
	address2: text('address2'),
	city: text('city'),
	state: text('state'),
	zip: text('zip'),
	companyId: text('company_id').default(null),
	isActive: integer('is_active', { mode: 'boolean' }).default(true)
});

const companies = sqliteTable('companies', {
	...timestamp,
	id: text('id').primaryKey().notNull().$defaultFn(() => generateRandomId()),
	name: text('name').notNull(),
	website: text('website'),
	phoneNumber: text('phone_number'),
	address: text('address'),
	address2: text('address2'),
	city: text('city'),
	state: text('state'),
	zip: text('zip'),
	contact: text('contact'),
	isActive: integer('is_active', { mode: 'boolean' }).default(true)
});

const customers = sqliteTable('customers', {
	...timestamp,
	id: text('id').primaryKey().notNull().$defaultFn(() => generateRandomId()),
	name: text('name').notNull(),
	website: text('website'),
	phoneNumber: text('phone_number'),
	address: text('address'),
	address2: text('address2'),
	city: text('city'),
	state: text('state'),
	zip: text('zip'),
	contact: text('contact'),
	companyId: text('company_id').notNull().references(() => companies.id),
	isActive: integer('is_active', { mode: 'boolean' }).default(true) 
});

const properties = sqliteTable('properties', {
	...timestamp,
	id: text('id').primaryKey().notNull().$defaultFn(() => generateRandomId()),
	name: text('name').notNull(),
	website: text('website'),
	phoneNumber: text('phone_number'),
	address: text('address'),
	address2: text('address2'),
	city: text('city'),
	state: text('state'),
	zip: text('zip'),
	contact: text('contact'),
	customerId: text('customer_id').notNull().references(() => customers.id),
	companyId: text('company_id').notNull().references(() => companies.id),
	isActive: integer('is_active', { mode: 'boolean' }).default(true) 
});

const sessions = sqliteTable('sessions', {
	...timestamp,
	id: text('id').primaryKey().notNull().$defaultFn(() => generateRandomId()),
	expiresAt: integer('expires_at').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id)
});

const books = sqliteTable('books', {
	...timestamp,
	id: text('id').primaryKey().notNull().$defaultFn(() => generateRandomId()),
	publicationDate: integer('publication_date', { mode: 'timestamp' }).notNull(),
	title: text('title').notNull(),
	author: text('author').notNull(),
	isbn: integer('isbn').unique()
});

type InsertBookParams = typeof books.$inferInsert;

export { books, sessions, users, companies, customers, properties, type InsertBookParams };
