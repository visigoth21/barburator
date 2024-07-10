import { db } from '$lib/server/db/client';
import { users, type InsertUserParams } from '$lib/server/db/schema';
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
};

const isUserActive = async (id: string, isUserActive: boolean) => {
	await db.update(users).set({ isActive: isUserActive, updatedAt: sysDate() }).where(eq(users.id, id));
};

const isLevel1Admin = async (id: string, isAdmin: boolean) => {
	await db.update(users).set({ isLevel1Admin: isAdmin, updatedAt: sysDate() }).where(eq(users.id, id));
};

const isLevel2Admin = async (id: string, isAdmin: boolean) => {
	await db.update(users).set({ isLevel2Admin: isAdmin, updatedAt: sysDate() }).where(eq(users.id, id));
};

const isCustomer = async (id: string, isCust: boolean) => {
	await db.update(users).set({ isCustomer: isCust, updatedAt: sysDate() }).where(eq(users.id, id));
};

const editUserById = async (book: InsertUserParams & { id: string }) => {
	await db.update(users).set(book).where(eq(users.id, users.id));
};

const setUsersCompany = async (id: string, company: string) => {
	await db.update(users).set({ company_id: company, updatedAt: sysDate() }).where(eq(users.id, id));
};

export {
	createNewUser,
	getUserByEmail,
	getUserById,
	getAllUsers,
	deleteUserById,
	editUserById,
	isUserActive,
	isLevel1Admin,
	isLevel2Admin,
	isCustomer,
	setUsersCompany,
};
