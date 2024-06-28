// src/lib/server/db/client.ts

import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as dotenv from 'dotenv';
import * as schema from "./schema";

dotenv.config();

const client = createClient({url: process.env.DB_URL, authToken: process.env.DB_TOKEN});
const db = drizzle(client, { schema });

export { client, db };