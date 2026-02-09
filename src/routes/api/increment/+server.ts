import client from '$lib/server/db';
import { json } from "@sveltejs/kit";

export async function POST({ request }): Promise<Response> {
    const data = await request.json();
    // Default to 1 if count is missing to prevent "None" errors
    const amount = data.count ?? 1; 
    
    try {
        await client.execute({
            // Use clear spacing around the operator
            sql: "UPDATE Counter SET Total_Click = Total_Click + ? WHERE id = 1",
            args: [amount]
        });

        return json({ success: true });
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        console.error("LibSQL Error:", e);
        return json({ error: errorMessage }, { status: 500 });
    }
}