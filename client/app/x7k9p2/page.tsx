import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-session";
import { getAdminBasePath } from "@/lib/admin-config";
import AdminGateClient from "./AdminGateClient";

export default async function AdminGatePage() {
  const session = await getAdminSession();
  if (session) {
    redirect(`/${getAdminBasePath()}/dashboard`);
  }

  return <AdminGateClient />;
}
