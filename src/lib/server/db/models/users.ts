import { db } from '$lib/server/db/client';
import { users, type InsertUserParams, companies, type InsertCompanyParams } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';

const sysDate = () => new Date()

const getUserByEmail = async (email: string) => {
	return await db.select().from(users).where(eq(users.email, email)).get();
};

const getUserById = async (id: string) => {
	const user = await db.select().from(users).where(eq(users.id, id));
	return user[0];
};

const deleteUserById = async (id: string) => {
	await db.delete(users).where(eq(users.id, id));
};

const getAllUsers = async () => {
	return await db.select().from(users).orderBy(desc(users.lastName));
};

const createNewUser = async (data: typeof users.$inferInsert) => {

	await db.insert(users).values(data);
	if (data.sysAdmin) {
	createUsersCompany(data);
	}
};

const userActive = async (id: string, isUserActive: boolean) => {
	await db.update(users).set({ active: isUserActive, updatedAt: sysDate() }).where(eq(users.id, id));
};

const level1Admin = async (id: string, isAdmin: boolean) => {
	await db.update(users).set({ level1Admin: isAdmin, updatedAt: sysDate() }).where(eq(users.id, id));
};

const level2Admin = async (id: string, isAdmin: boolean) => {
	await db.update(users).set({ level2Admin: isAdmin, updatedAt: sysDate() }).where(eq(users.id, id));
};

const customer = async (id: string, isCust: boolean) => {
	await db.update(users).set({ customer: isCust, updatedAt: sysDate() }).where(eq(users.id, id));
};

const editUserById = async (user: InsertUserParams & { id: string }) => {
	await db.update(users).set(user).where(eq(users.id, user.id));
};

const setUsersCompany = async (id: string, company: string) => {
	await db.update(users).set({ company_id: company, updatedAt: sysDate() }).where(eq(users.id, id));
};


const createUsersCompany = async (data) => {
	await db.insert(companies).values({ id: data.company_id });
};

export {
	createNewUser,
	getUserByEmail,
	getUserById,
	getAllUsers,
	deleteUserById,
	editUserById,
	userActive,
	level1Admin,
	level2Admin,
	customer,
	setUsersCompany,
};
