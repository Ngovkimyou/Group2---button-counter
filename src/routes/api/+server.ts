import { createClient } from "@libsql/client";
import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';

function getTursoClient() {
  const databaseUrl = env.TURSO_DATABASE_URL;
  const authToken = env.TURSO_AUTH_TOKEN;
  if (!databaseUrl || !authToken) {
    throw new Error('Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN environment variable');
  }
  return createClient({ url: databaseUrl, authToken });
}

export async function GET() {
  try {
    const db = getTursoClient();
    const { rows } = await db.execute("SELECT total_clicks FROM counter WHERE id = 1");
    const value = rows[0]?.total_clicks;
    const count = Number(value) || 0;
    return json({ count });
  } catch (error) {
    console.error("Error fetching count:", error);
    return json({ error: "Error fetching count" }, { status: 500 });
  }
}

export async function POST() {
  try {
    const db = getTursoClient();

    await db.execute(`
      INSERT INTO counter (id, total_clicks)
      VALUES (1, 1)
      ON CONFLICT(id)
      DO UPDATE SET total_clicks = total_clicks + 1
    `);

    return json({ success: true });
  } catch (error) {
    console.error("Error updating count:", error);
    return json({ error: "Failed to update count" }, { status: 500 });
  }
}

export async function PUT() {
  try {
    const db = getTursoClient();

    await db.execute(`
      INSERT INTO counter (id, total_clicks)
      VALUES (1, 0)
      ON CONFLICT(id)
      DO UPDATE SET total_clicks = 0
    `);

    return json({ success: true, count: 0 });
  } catch (error) {
    console.error("Error resetting count:", error);
    return json({ error: "Failed to reset count" }, { status: 500 });
  }
}

export async function PATCH() {
  try {
    const db = getTursoClient();

    const result = await db.execute(`
      UPDATE counter
      SET total_clicks = CASE 
        WHEN total_clicks > 0 THEN total_clicks - 1
        ELSE 0
      END
      WHERE id = 1
      RETURNING total_clicks
    `);

    const newCount = Number(result.rows[0]?.total_clicks ?? 0);

    return json({ success: true, count: newCount });
  } catch (error) {
    console.error("Error decreasing count:", error);
    return json({ error: "Failed to decrease count" }, { status: 500 });
  }
}
