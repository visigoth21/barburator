//import { DB_URL, DB_TOKEN } from '$env/static/private';
import * as dotenv from 'dotenv';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

dotenv.config();

const client = createClient({ url: process.env.DB_URL, authToken: process.env.DB_TOKEN });

const db = drizzle(client);

export { client, db };

