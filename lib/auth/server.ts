import { createNeonAuth } from "@neondatabase/auth/next/server";

/** instance ฝั่ง server — ใช้ทั้ง .handler(), .middleware(), .getSession() */
export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL!,
  cookies: { secret: process.env.NEON_AUTH_COOKIE_SECRET! },
});
