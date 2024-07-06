import { dev } from '$app/environment';
import { client } from '$lib/server/db/client';
import { LibSQLAdapter } from '@lucia-auth/adapter-sqlite';
import { Lucia } from 'lucia';

interface DatabaseUserAttributes {
	email: string;
	company_id: string;
}

interface DatabaseSessionAttributes {
	company_id: string;
	created_at: Date;
	updated_at: Date;
}

const adapter = new LibSQLAdapter(client, {
	user: 'users',
	session: 'sessions'
});

const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			email: attributes.email,
			companyId: attributes.company_id
		};
	},
	getSessionAttributes: (attributes) => {
		return {
			company_id: attributes.company_id,
			created_at: attributes.created_at,
			updated_at: attributes.updated_at
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
		DatabaseSessionAttributes: DatabaseSessionAttributes;
	}
}

export { lucia };
