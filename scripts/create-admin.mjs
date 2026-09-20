/**
 * สร้างบัญชีแอดมินใน Neon Auth
 *
 *   node --env-file=.env.local scripts/create-admin.mjs
 *
 * โหมดไม่ต้องพิมพ์ตอบ (เช่นใช้ใน CI):
 *   ADMIN_PASSWORD='...' node --env-file=.env.local scripts/create-admin.mjs \
 *     --email admin@example.com --name "Admin"
 *
 * อีเมลที่สร้างต้องอยู่ใน ADMIN_EMAILS ด้วย ไม่งั้นล็อกอินได้แต่เข้าหน้า /admin ไม่ได้
 */
import { createInterface } from "node:readline";
import { stdin, stdout, argv, env, exit } from "node:process";

function flag(name) {
  const i = argv.indexOf(`--${name}`);
  return i !== -1 ? argv[i + 1] : undefined;
}

function ask(rl, question, { hidden = false } = {}) {
  return new Promise((resolve) => {
    rl.muted = false;
    rl.question(question, (answer) => {
      rl.muted = false;
      if (hidden) stdout.write("\n");
      resolve(answer.trim());
    });
    rl.muted = hidden;
  });
}

const baseUrl = env.NEON_AUTH_BASE_URL;
if (!baseUrl) {
  console.error("ไม่พบ NEON_AUTH_BASE_URL — รันด้วย node --env-file=.env.local");
  exit(1);
}

const rl = createInterface({ input: stdin, output: stdout, terminal: true });
// ซ่อนรหัสผ่านตอนพิมพ์
rl._writeToOutput = function (str) {
  if (this.muted) return;
  this.output.write(str);
};

const email = flag("email") ?? (await ask(rl, "อีเมลแอดมิน: "));
const name = flag("name") ?? (await ask(rl, "ชื่อที่แสดง [Admin]: ")) ?? "";
const password =
  env.ADMIN_PASSWORD ?? (await ask(rl, "รหัสผ่าน (อย่างน้อย 8 ตัว): ", { hidden: true }));
rl.close();

if (!email || !password) {
  console.error("ต้องระบุทั้งอีเมลและรหัสผ่าน");
  exit(1);
}

const res = await fetch(`${baseUrl}/sign-up/email`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    // Neon Auth ต้องการ Origin header เมื่อ callbackURL ไม่ใช่ absolute URL
    Origin: env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  },
  body: JSON.stringify({ email, password, name: name || "Admin" }),
});

const body = await res.json().catch(() => ({}));
if (!res.ok) {
  console.error(`สร้างไม่สำเร็จ (HTTP ${res.status}):`, body.message || body.code || body);
  exit(1);
}

const allowlist = (env.ADMIN_EMAILS ?? env.ADMIN_EMAIL ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

console.log(`สร้างบัญชี ${email} เรียบร้อย — เข้าใช้งานได้ที่ /admin/login`);
if (!allowlist.includes(email.toLowerCase())) {
  console.warn(
    `เตือน: ${email} ไม่ได้อยู่ใน ADMIN_EMAILS (${allowlist.join(", ") || "ว่าง"}) ` +
      "— ล็อกอินได้แต่จะถูกเด้งออกจากหน้า /admin"
  );
}
