import { auth } from "@/lib/auth/server";

/**
 * ป้องกันหน้า /admin — ผู้ที่ยังไม่ล็อกอินจะถูกส่งไปหน้า login
 * (Next.js 16 เปลี่ยนชื่อ middleware.ts เป็น proxy.ts)
 */
export default auth.middleware({
  loginUrl: "/admin/login",
});

export const config = {
  // จับทุกหน้าใต้ /admin ยกเว้น /admin/login เอง — ไม่งั้น redirect วนลูป
  matcher: ["/admin", "/admin/((?!login).*)"],
};
