import AdminLoginForm from "@/components/AdminLoginForm";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ denied?: string; error?: string }>;
}) {
  const { denied, error } = await searchParams;
  // Neon Auth ส่ง ?error=<code> กลับมาเมื่อล็อกอินด้วย Google ไม่สำเร็จ
  return <AdminLoginForm denied={denied === "1"} oauthError={error} />;
}
