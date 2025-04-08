import { PGlite } from '@electric-sql/pglite';
import type { MigrationConfig } from 'drizzle-orm/migrator';
import { drizzle as pglite } from 'drizzle-orm/pglite';
import migrations from '~/db/migrations.json';
import { schema } from '~/db/schema';

const DBNAME = import.meta.env.PROD ? 'playground-front' : 'playground-front-dev';
const client = new PGlite(`idb://${DBNAME}`);

export const drizzle = pglite({
  client,
  logger: import.meta.env.DEV,
  schema: {
    ...schema.todolist,
  },
});

export async function migrate() {
  // https://github.com/drizzle-team/drizzle-orm/discussions/2532
  // @ts-expect-error 🤷 dialect and session will appear to not exist...but they do
  await drizzle.dialect.migrate(migrations, drizzle.session, {
    migrationsTable: 'drizzle_migrations',
  } satisfies Omit<MigrationConfig, 'migrationsFolder'>);

  return { sync: true };
}
