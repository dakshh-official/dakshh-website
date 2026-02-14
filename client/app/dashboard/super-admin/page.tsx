import { redirect } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import HandDrawnCard from "@/app/components/HandDrawnCard";
import { DotOrbit } from "@paper-design/shaders-react";
import { getSessionRoleContext } from "@/lib/server-role-access";
import { hasRole } from "@/lib/roles";
import RoleManager from "@/app/dashboard/admin/role-manager";
import SeedControls from "./seed-controls";

export default async function SuperAdminDashboardPage() {
  const context = await getSessionRoleContext();
  if (!context) {
    redirect("/auth?callbackUrl=/dashboard/super-admin");
  }

  if (!hasRole(context.roles, "super_admin")) {
    if (hasRole(context.roles, "admin")) {
      redirect("/dashboard/admin");
    }
    redirect("/dashboard");
  }

  return (
    <div className="w-full min-h-screen relative" data-main-content>
      <Navbar />
      <div className="fixed inset-0 w-full h-full z-0">
        <DotOrbit
          width="100%"
          height="100%"
          colors={["#ffffff", "#006aff", "#fff675"]}
          colorBack="#000000"
          stepsPerColor={4}
          size={0.2}
          sizeRange={0.5}
          spreading={1}
          speed={0.5}
          scale={0.35}
        />
      </div>
      <div className="relative z-10 min-h-screen pt-24 px-4 pb-10">
        <div className="max-w-5xl mx-auto space-y-6">
          <HandDrawnCard className="relative p-6 sm:p-8 pr-16">
            <SeedControls />
            <h1 className="hand-drawn-title text-white text-3xl mb-2">
              Super Admin Dashboard
            </h1>
            <p className="text-cyan text-sm">
              Role control and user access management for operations.
            </p>
          </HandDrawnCard>
          <RoleManager isSuperAdmin />
        </div>
      </div>
    </div>
  );
}
