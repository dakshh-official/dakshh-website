import { DotOrbit } from "@paper-design/shaders-react";
import HandDrawnCard from "@/app/components/HandDrawnCard";
import AdminDashboardClient from "./AdminDashboardClient";
import { getAdminSession } from "@/lib/admin-session";

export default async function AdminDashboardHomePage() {
  const session = await getAdminSession();

  return (
    <>
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
        <div className="max-w-7xl mx-auto space-y-6">
          <HandDrawnCard className="p-6 sm:p-8">
            <h1 className="hand-drawn-title text-white text-3xl mb-2">
              Admin Dashboard
            </h1>
            <p className="text-cyan text-sm">
              Welcome, {session?.email ?? "Admin"}.
              {session?.isMaster && " You have full master access."}
            </p>
          </HandDrawnCard>
          <AdminDashboardClient />
        </div>
      </div>
    </>
  );
}
