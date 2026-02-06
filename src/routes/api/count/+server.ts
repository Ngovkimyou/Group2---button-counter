import { json } from '@sveltejs/kit';
import { createClient } from '@libsql/client';
import { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } from '$env/static/private';

const db = createClient({ url: TURSO_DATABASE_URL, authToken: TURSO_AUTH_TOKEN });

export async function GET() {
  const r = await db.execute('SELECT total_click FROM counter WHERE id = 1');
  const count = Number(r.rows[0]?.total_click ?? 0);
  return json({ count });
}
