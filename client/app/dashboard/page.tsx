import { redirect } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import HandDrawnCard from "@/app/components/HandDrawnCard";
import { DotOrbit } from "@paper-design/shaders-react";
import { getSessionRoleContext } from "@/lib/server-role-access";
import { resolveDashboardPath } from "@/lib/roles";

export default async function DashboardPage() {
  const context = await getSessionRoleContext();
  if (!context) {
    redirect("/auth?callbackUrl=/dashboard");
  }

  const dashboardPath = resolveDashboardPath(context.roles);
  if (dashboardPath) {
    redirect(dashboardPath);
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
      <div className="relative z-10 min-h-screen pt-24 px-4">
        <div className="max-w-2xl mx-auto">
          <HandDrawnCard className="p-8 text-center">
            <h1 className="hand-drawn-title text-white text-3xl mb-4">Dashboard Access Needed</h1>
            <p className="text-white/80 mb-6">
              You are signed in but do not currently have a Volunteer, Admin, or Super Admin role.
            </p>
            <Link href="/" className="hand-drawn-button inline-block px-6 py-2">
              Go Home
            </Link>
          </HandDrawnCard>
        </div>
      </div>
    </div>
  );
}
