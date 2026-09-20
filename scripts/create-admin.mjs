/**
 * สร้างบัญชีแอดมินใน Neon Auth
 *
 *   node --env-file=.env.local scripts/create-admin.mjs
 *
 * สคริปต์จะถามอีเมลกับรหัสผ่าน (รหัสผ่านไม่ถูกแสดงบนหน้าจอ) แล้วเรียก
 * endpoint sign-up ของ Neon Auth โดยตรง — อย่าลืมว่าอีเมลนั้นต้องอยู่ใน
 * ADMIN_EMAILS ด้วย ถึงจะเข้าหน้า /admin ได้
 */
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

const baseUrl = process.env.NEON_AUTH_BASE_URL;
if (!baseUrl) {
  console.error("ไม่พบ NEON_AUTH_BASE_URL — รันด้วย node --env-file=.env.local");
  process.exit(1);
}

const rl = createInterface({ input: stdin, output: stdout });
const email = await rl.question("อีเมลแอดมิน: ");
const name = (await rl.question("ชื่อที่แสดง [Admin]: ")) || "Admin";

stdout.write("รหัสผ่าน (อย่างน้อย 8 ตัว): ");
stdin.setRawMode?.(true);
let password = "";
for await (const chunk of stdin) {
  const ch = chunk.toString();
  if (ch === "\r" || ch === "\n") break;
  if (ch === "\u0003") process.exit(1);
  if (ch === "\u007f") password = password.slice(0, -1);
  else password += ch;
}
stdin.setRawMode?.(false);
stdout.write("\n");
rl.close();

const res = await fetch(`${baseUrl}/sign-up/email`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    // Neon Auth ต้องการ Origin header เมื่อ callbackURL ไม่ใช่ absolute URL
    Origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  },
  body: JSON.stringify({ email, password, name }),
});

const body = await res.text();
if (!res.ok) {
  console.error(`สร้างไม่สำเร็จ (HTTP ${res.status}):`, body);
  process.exit(1);
}
console.log(`สร้างบัญชี ${email} เรียบร้อย — เข้าใช้งานได้ที่ /admin/login`);
