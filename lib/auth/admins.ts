/**
 * รายชื่ออีเมลที่เข้าหน้า /admin ได้ — คั่นด้วย comma ใน ADMIN_EMAILS
 * จำเป็นเพราะ Neon Auth เปิดให้สมัครสมาชิกเองได้ การมี session อย่างเดียว
 * จึงไม่พอที่จะถือว่าเป็นแอดมิน
 */
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const allowed = (process.env.ADMIN_EMAILS ?? process.env.ADMIN_EMAIL ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return allowed.includes(email.toLowerCase());
}
