import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@libsql/client";

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend files (index.html, style.css, main.js)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "..")));

// Initialize Turso database client
const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

// 1) Get current count
app.get("/api/count", async (_req, res) => {
  const result = await db.execute(
    "SELECT total_click FROM counter WHERE id = 1"); 
  const value = Number(result.rows[0]?.total_click ?? 0);
  res.json({ value });
});

// 2) Increment count + return new value
app.post("/api/increment", async (_req, res) => {
  await db.execute(
    "UPDATE counter SET total_click = total_click + 1 WHERE id = 1");

  const result = await db.execute(
    "SELECT total_click FROM counter WHERE id = 1");
  const value = Number(result.rows[0]?.total_click ?? 0);

  res.json({ value });
});

// Start server on port 3000
const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
