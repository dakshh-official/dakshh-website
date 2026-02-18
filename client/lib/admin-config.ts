export const ADMIN_BASE_PATH =
  process.env.ADMIN_BASE_PATH ?? "x7k9p2";

export function getAdminBasePath(): string {
  return ADMIN_BASE_PATH.startsWith("/")
    ? ADMIN_BASE_PATH.slice(1)
    : ADMIN_BASE_PATH;
}

export function isMasterKeyValid(input: string): boolean {
  const key = process.env.ADMIN_MASTER_KEY;
  if (!key) return false;
  return input.trim() === key;
}
