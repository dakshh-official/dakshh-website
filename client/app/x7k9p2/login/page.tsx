import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-session";
import { getAdminBasePath } from "@/lib/admin-config";
import AdminLoginClient from "./AdminLoginClient";

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) {
    redirect(`/${getAdminBasePath()}/dashboard`);
  }

  return <AdminLoginClient />;
}
