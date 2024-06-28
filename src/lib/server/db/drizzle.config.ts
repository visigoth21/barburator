import type {Config} from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config();

export default {
    schema: "./src/lib/server/db/schema.ts",
    out: './src/lib/server/db/migrations',
    driver: 'turso',
    dialect: 'sqlite',
    dbCredentials: {
        url: process.env.DB_URL!,
        authToken: process.env.DB_TOKEN
    }
} satisfies Config;
