import { migrate } from 'drizzle-orm/libsql/migrator';
import { db } from './client';

try {
	migrate(db, { migrationsFolder: 'src/lib/server/db/migrations' });
	console.log('Migrations applied');
} catch (error) {
	console.error('Error migrating database:', error);
	throw error;
}
