import AdminLoginForm from "@/components/AdminLoginForm";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ denied?: string }>;
}) {
  const { denied } = await searchParams;
  return <AdminLoginForm denied={denied === "1"} />;
}
