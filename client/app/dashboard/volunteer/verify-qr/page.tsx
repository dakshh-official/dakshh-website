import { redirect } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import HandDrawnCard from "@/app/components/HandDrawnCard";
import { DotOrbit } from "@paper-design/shaders-react";
import { getSessionRoleContext } from "@/lib/server-role-access";
import { hasRole, resolveDashboardPath } from "@/lib/roles";

export default async function VerifyQrPage() {
  const context = await getSessionRoleContext();
  if (!context) {
    redirect("/auth?callbackUrl=/dashboard/volunteer/verify-qr");
  }

  const dashboardPath = resolveDashboardPath(context.roles);
  if (dashboardPath && dashboardPath !== "/dashboard/volunteer") {
    redirect(dashboardPath);
  }

  if (!hasRole(context.roles, "volunteer")) {
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
      <div className="relative z-10 min-h-screen pt-24 px-4">
        <div className="max-w-2xl mx-auto">
          <HandDrawnCard className="p-8">
            <h1 className="hand-drawn-title text-white text-3xl mb-3">
              Verify QR
            </h1>
            <p className="text-white/80 mb-4">
              QR verification module is ready for integration with your scanner
              workflow.
            </p>
            <Link
              href="/dashboard/volunteer"
              className="hand-drawn-button inline-block px-6 py-2"
            >
              Back to Dashboard
            </Link>
          </HandDrawnCard>
        </div>
      </div>
    </div>
  );
}
