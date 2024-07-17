import { db } from '$lib/server/db/client';
import { users, type InsertUserParams, usersInfo, type InsertUserInfoParams } from '$lib/server/db/schema';
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
	return await db.select().from(users).orderBy(desc(users.createdAt)).get();
};

const createNewUser = async (data) => {
	await createUser(data);
	await createUserInfo(data);
};

const createUser = async (data: typeof users.$inferInsert) => {
	await db.insert(users).values(data);
};

const createUserInfo = async (data: typeof usersInfo.$inferInsert) => {
	await db.insert(usersInfo).values(data);

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

// const customer = async (id: string, isCust: boolean) => {
// 	await db.update(users).set({ customer: isCust, updatedAt: sysDate() }).where(eq(users.id, id));
// };

const editUserById = async (user: InsertUserParams & { id: string }) => {
	await db.update(users).set(user).where(eq(users.id, user.id));
};

const setUsersCompany = async (id: string, company: string) => {
	await db.update(users).set({ companyId: company, updatedAt: sysDate() }).where(eq(users.id, id));
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
	setUsersCompany,
};
