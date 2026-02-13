"use client";

import { useState } from "react";
import { useAmongUsToast } from "@/app/components/ui/among-us-toast";

interface SeedResponse {
  error?: string;
  superAdminEmail?: string;
  roles?: string[];
}

export default function SeedControls() {
  const [loading, setLoading] = useState(false);
  const toast = useAmongUsToast();

  const handleSeed = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/admin/super-admin/seed-check", {
        method: "POST",
      });
      const data = (await response.json()) as SeedResponse;

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to seed Super Admin role");
      }

      toast.success(
        `${
          data.superAdminEmail ?? "Super Admin"
        } seeded successfully. Roles: ${(data.roles ?? []).join(", ")}`
      );
    } catch (seedError) {
      toast.error(
        seedError instanceof Error
          ? seedError.message
          : "Failed to seed Super Admin role"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-2">
      <button
        type="button"
        className="w-10 h-10 rounded-full border-2 border-cyan bg-black/80 text-cyan flex items-center justify-center text-lg leading-none hover:bg-cyan hover:text-black transition-colors disabled:opacity-70"
        onClick={handleSeed}
        disabled={loading}
        title="Seed Super Admin role"
        aria-label="Seed Super Admin role"
      >
        <span className={loading ? "animate-spin" : ""}>
          {loading ? "⟳" : "↻"}
        </span>
      </button>
    </div>
  );
}
