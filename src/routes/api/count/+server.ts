import client from '$lib/server/db';
import { json } from '@sveltejs/kit';

// GET current value
export async function GET(): Promise<Response> {
    let id = 1;
    const result = await client.execute({
        sql: "SELECT Total_Click FROM Counter WHERE id = ?",
        args: [id]
    });
    
    if (result.rows.length === 0) {
        throw new Error(`Counter with id ${id} not found`);
    }
    
    const currentValue = result.rows[0].Total_Click as number;
    console.log(`GET: Counter ${id} = ${currentValue}`);
    return json({ total_clicks: currentValue });
}
