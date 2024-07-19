import { db } from '$lib/server/db/client';
import { users, sessions } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

const getSessionById = async (sessionId: string) => {
	return ;//await db.select().from(sessions).where(eq(sessions.id, sessionId)).get();
};

const getUserBySessionId = async (sessionId: string) => {
	return ;//await db.select().from(users).innerJoin(sessions, eq(users.id, sessions.userId)).where(eq(sessions.id, sessionId)).get();
};

export {
  getSessionById,
  getUserBySessionId
};