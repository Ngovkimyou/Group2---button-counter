// ======================================================================================================================
// Table name: counter
// Columns:
// - id (INTEGER PRIMARY KEY)
// - total_clicks (INTEGER)
// ======================================================================================================================

import { createClient } from "@libsql/client";
import { env } from "$env/dynamic/private";
import { json } from "@sveltejs/kit";

// Helper to create and return a Turso client instance using environment variables
function getTursoClient() {
  const databaseUrl = env.TURSO_DATABASE_URL;
  const authToken = env.TURSO_AUTH_TOKEN;

  if (!databaseUrl || !authToken) {
    throw new Error("Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN environment variable");
  }

  return createClient({ url: databaseUrl, authToken });
}

const db = getTursoClient();

// If row doesn't exist on Turso, insert a row
async function ensureCounterRow() {
  await db.execute({
    sql: "INSERT OR IGNORE INTO counter (id, total_clicks) VALUES (?, ?)",
    args: [1, 0]
  });
}

// GET /api - return the current count
export async function GET() {
  try {
    const { rows } = await db.execute(
      "SELECT total_clicks FROM counter WHERE id = 1"
    );

    // If row doesn't exist, return 0
    const value = (rows?.[0] as any)?.total_clicks;
    const count = Number(value ?? 0);

    return json({ count });
  } catch (error) {
    console.error("Error fetching count:", error);
    return json({ error: "Error fetching count" }, { status: 500 });
  }
}

// POST /api - update the count based on the mode (increase, decrease, reset)
export async function POST({ request }): Promise<Response> {
  try {
    const data = await request.json().catch(() => ({}));

    const mode = data?.mode as "increase" | "decrease" | "reset" | undefined;
    const amount = Number(data?.count ?? 0);

    if (!mode) return json({ error: "Missing mode" }, { status: 400 });

    // Ensure row exists ONLY when user clicks actions
    await ensureCounterRow();

    // Perform the appropriate SQL query based on the mode
    if (mode === "decrease") {
      await db.execute({
        sql: "UPDATE counter SET total_clicks = total_clicks - ? WHERE id = 1",
        args: [amount]
      });
    } else if (mode === "increase") {
      await db.execute({
        sql: "UPDATE counter SET total_clicks = total_clicks + ? WHERE id = 1",
        args: [amount]
      });
    } else if (mode === "reset") {
      await db.execute({
        sql: "UPDATE counter SET total_clicks = ? WHERE id = 1",
        args: [0]
      });
    } else {
      return json({ error: "Invalid mode" }, { status: 400 });
    }

    // Optional but nice: return the updated count so frontend can skip a GET
    const { rows } = await db.execute("SELECT total_clicks FROM counter WHERE id = 1");
    const newValue = (rows?.[0] as any)?.total_clicks;
    const count = Number(newValue ?? 0);

    return json({ success: true, count });
  } catch (e) {
    console.error("LibSQL Error:", e);
    return json(
      { error: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}
