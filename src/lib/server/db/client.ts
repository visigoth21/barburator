import { DB_URL, DB_TOKEN } from '$env/static/private';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

const client = createClient({ url: DB_URL, authToken: DB_TOKEN });

const db = drizzle(client);

export { client, db };

