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

// Very Important: it seems that our database have different field names
// For example, my database have "Total_Click" instead of "total_click"
// so we need to use the correct field names in our queries
const db = getTursoClient();
export async function GET() {
  try {
    const db = getTursoClient();
    // Over here might be the casue of the error, since I've changed the field name to "Total_Click"
    const { rows } = await db.execute(
      "SELECT Total_Click FROM counter WHERE id = 1"
    );
    const value = rows[0]?.Total_Click;
    const count = Number(value) || 0;
    return json({ count });
  } catch (error) {
    console.error("Error fetching count:", error);
    return json({ error: "Error fetching count" }, { status: 500 });
  }
}

export async function POST({ request }): Promise<Response> {
    const data: any = await request.json();
    console.log("@src/routes/api -> RECEIVED DATA:", data);
    console.log("@src/routes/api -> Count:", data.count);
    
    try {
        const mode = data.mode;
        
        if(mode === "decrease"){
            const amount = data.count; 
            await db.execute({
                // Use clear spacing around the operator
                sql: "UPDATE Counter SET Total_Click = Total_Click - ? WHERE id = 1",
                args: [amount]
            });

        }
        else if(mode === "increase"){
            const amount = data.count; 
            await db.execute({
                // Use clear spacing around the operator
                sql: "UPDATE Counter SET Total_Click = Total_Click + ? WHERE id = 1",
                args: [amount]
            });
        
        }
        else if (mode === "reset"){
             await db.execute({
                // Use clear spacing around the operator
                sql: "UPDATE Counter SET Total_Click = ? WHERE id = 1",
                args: [0]
        });
        }

        return json({ success: true });
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        console.error("LibSQL Error:", e);
        return json({ error: errorMessage }, { status: 500 });
    }
}
