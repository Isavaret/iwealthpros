import { neon } from "@neondatabase/serverless";

/**
 * Neon serverless client — ใช้ผ่าน HTTP จึงเหมาะกับ serverless function
 * ใช้ได้เฉพาะฝั่ง server เท่านั้น (DATABASE_URL เป็นความลับ)
 */
export const sql = neon(process.env.DATABASE_URL!);
