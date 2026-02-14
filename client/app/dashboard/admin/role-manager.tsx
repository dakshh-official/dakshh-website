"use client";

import { useEffect, useMemo, useState } from "react";
import HandDrawnCard from "@/app/components/HandDrawnCard";
import { useAmongUsToast } from "@/app/components/ui/among-us-toast";

interface RoleUser {
  username: string;
  email: string;
  roles: string[];
}

interface RoleApiResponse {
  users: RoleUser[];
}

type AssignableRole = "volunteer" | "admin";

export default function RoleManager({
  isSuperAdmin,
}: {
  isSuperAdmin: boolean;
}) {
  const [role, setRole] = useState<AssignableRole>("volunteer");
  const [action, setAction] = useState<"add" | "remove">("add");
  const [emailsInput, setEmailsInput] = useState("");
  const [users, setUsers] = useState<RoleUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const toast = useAmongUsToast();

  const canManageAdmin = isSuperAdmin;
  const roleOptions: AssignableRole[] = canManageAdmin
    ? ["volunteer", "admin"]
    : ["volunteer"];

  const normalizedEmailsPreview = useMemo(
    () =>
      Array.from(
        new Set(
          emailsInput
            .split(/[,\n;]+/)
            .map((entry) => entry.trim().toLowerCase())
            .filter(Boolean)
        )
      ),
    [emailsInput]
  );

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const response = await fetch("/api/admin/roles", { cache: "no-store" });
      const data = (await response.json()) as RoleApiResponse & {
        error?: string;
      };
      if (!response.ok) {
        throw new Error(data.error ?? "Failed to fetch role data");
      }
      setUsers(data.users ?? []);
    } catch (fetchError) {
      toast.error(
        fetchError instanceof Error
          ? fetchError.message
          : "Failed to fetch role data"
      );
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // Initial load only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitRoleUpdate = async () => {
    if (normalizedEmailsPreview.length === 0) {
      toast.error("Add at least one email.");
      return;
    }

    if (!canManageAdmin && role === "admin") {
      toast.error("Only Super Admin can assign or remove Admin role.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/admin/roles", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emails: emailsInput,
          role,
          action,
        }),
      });

      const data = (await response.json()) as {
        error?: string;
        updated?: string[];
        notFound?: string[];
        skipped?: { email: string; reason: string }[];
      };

      if (!response.ok) {
        throw new Error(data.error ?? "Role update failed");
      }

      const updatedCount = data.updated?.length ?? 0;
      const notFoundCount = data.notFound?.length ?? 0;
      const skippedCount = data.skipped?.length ?? 0;
      toast.success(
        `Updated ${updatedCount} email(s). Not found: ${notFoundCount}. Skipped: ${skippedCount}.`
      );
      await fetchUsers();
      setEmailsInput("");
    } catch (submitError) {
      toast.error(
        submitError instanceof Error
          ? submitError.message
          : "Role update failed"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <HandDrawnCard className="p-6 sm:p-8">
        <h2 className="hand-drawn-title text-white text-2xl mb-3">
          Assign Roles
        </h2>
        <p className="text-white/70 text-sm mb-4">
          Enter one or more emails. Comma, newline, or semicolon separators are
          supported.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <select
            value={role}
            onChange={(event) => setRole(event.target.value as AssignableRole)}
            className="bg-black/30 border-2 border-white/30 rounded px-3 py-2 text-white"
          >
            {roleOptions.map((option) => (
              <option key={option} value={option}>
                {option === "admin" ? "Admin" : "Volunteer"}
              </option>
            ))}
          </select>
          <select
            value={action}
            onChange={(event) =>
              setAction(event.target.value as "add" | "remove")
            }
            className="bg-black/30 border-2 border-white/30 rounded px-3 py-2 text-white"
          >
            <option value="add">Assign</option>
            <option value="remove">Remove</option>
          </select>
          <button
            type="button"
            onClick={submitRoleUpdate}
            disabled={submitting}
            className="hand-drawn-button px-4 py-2 disabled:opacity-70"
          >
            {submitting ? "Saving..." : "Apply"}
          </button>
        </div>

        <textarea
          value={emailsInput}
          onChange={(event) => setEmailsInput(event.target.value)}
          rows={4}
          placeholder="alice@example.com, bob@example.com"
          className="w-full bg-black/30 border-2 border-white/30 rounded px-3 py-2 text-white focus:border-cyan outline-none"
        />

        {normalizedEmailsPreview.length > 0 && (
          <p className="text-cyan text-xs mt-2">
            Parsed {normalizedEmailsPreview.length} unique email(s).
          </p>
        )}

        {!canManageAdmin && (
          <p className="text-yellow text-xs mt-3">
            Admin accounts cannot assign or remove Admin role, and cannot modify
            Super Admin users.
          </p>
        )}
      </HandDrawnCard>

      <HandDrawnCard className="p-6 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="hand-drawn-title text-white text-2xl">
            Role Directory
          </h2>
        </div>

        {loadingUsers && users.length === 0 ? (
          <p className="text-white/70 text-sm">Loading role directory...</p>
        ) : users.length === 0 ? (
          <p className="text-white/70 text-sm">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b-2 border-white/30">
                  <th className="py-2 pr-3 text-cyan font-semibold">User</th>
                  <th className="py-2 pr-3 text-cyan font-semibold">Email</th>
                  <th className="py-2 text-cyan font-semibold">Roles</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.email} className="border-b border-white/10">
                    <td className="py-2 pr-3 text-white">{user.username}</td>
                    <td className="py-2 pr-3 text-white/80">{user.email}</td>
                    <td className="py-2 text-white/90">
                      {user.roles.join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </HandDrawnCard>
    </>
  );
}
