import { json } from '@sveltejs/kit';
import { createClient } from '@libsql/client';
import { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } from '$env/static/private';

const db = createClient({ url: TURSO_DATABASE_URL, authToken: TURSO_AUTH_TOKEN });

export async function POST() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS counter (
      id INTEGER PRIMARY KEY,
      total_click INTEGER NOT NULL
    )
  `);

  await db.execute(`
    INSERT OR IGNORE INTO counter (id, total_click)
    VALUES (1, 0)
  `);

  return json({ ok: true });
}
