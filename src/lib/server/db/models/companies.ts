import { db } from '$lib/server/db/client';
import { companies, type InsertCompanyParams, sessions } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';

const sysDate = () => new Date()

const getCompanyById = async (id: string) => {
    const company = await db.select().from(companies).where(eq(companies.id, id));
    return company[0];
};

const getCompanyIdBySessionId = async (sessionId: string) => {
	const sessionCompanyId = await db.select().from(sessions).where(eq(sessions.id, sessionId)).get();
	return sessionCompanyId.company_id;
};

const deleteCompanyById = async (id: string) => {
    await db.delete(companies).where(eq(companies.id, id));
};

const getAllCompanies = async () => {
    return await db.select().from(companies).orderBy(desc(companies.name));
};

const createNewCompany = async (data: typeof companies.$inferInsert) => {
    await db.insert(companies).values(data);
};

const activateCompanyById = async (id: string, active: boolean) => {
    await db.update(companies).set({ active: active, updatedAt: sysDate() }).where(eq(companies.id, id));
};

const editCompanyById = async (book: InsertCompanyParams & { id: string }) => {
    await db.update(companies).set(book).where(eq(companies.id, companies.id));
};

// const setCompanyUser = async (id: string, company: string) => {
// 	await db.update(users).set({ company_id: company, updatedAt: sysDate() }).where(eq(users.id, id));
// };

export {
    createNewCompany,
    getCompanyById,
    getCompanyIdBySessionId,
    getAllCompanies,
    editCompanyById,
    deleteCompanyById,
    activateCompanyById
};


// const companies = sqliteTable('companies', {
// 	...timestamp,
// 	id: text('id').primaryKey().notNull().$defaultFn(() => generateRandomId()),
// 	name: text('name').notNull(),
// 	website: text('website'),
// 	phoneNumber: text('phone_number'),
// 	address: text('address'),
// 	address2: text('address2'),
// 	city: text('city'),
// 	state: text('state'),
// 	zip: text('zip'),
// 	contact: text('contact'),
// 	isActive: integer('is_active', { mode: 'boolean' }).default(false)
// });