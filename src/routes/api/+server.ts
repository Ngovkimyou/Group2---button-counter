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


export async function POST({ request }): Promise<Response> {
    const data: any = await request.json();
    console.log("@src/routes/api -> RECEIVED DATA:", data);
    console.log("@src/routes/api -> Count:", data.count);
    
    try {
        const mode = data.mode;
        
        if(mode === "decrease"){
            const amount = data.count; 
            await client.execute({
                // Use clear spacing around the operator
                sql: "UPDATE Counter SET Total_Click = Total_Click - ? WHERE id = 1",
                args: [amount]
            });

        }
        else if(mode === "increase"){
            const amount = data.count; 
            await client.execute({
                // Use clear spacing around the operator
                sql: "UPDATE Counter SET Total_Click = Total_Click + ? WHERE id = 1",
                args: [amount]
            });
        
        }
        else if (mode === "reset"){
             await client.execute({
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

