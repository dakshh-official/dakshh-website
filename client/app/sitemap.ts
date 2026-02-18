import { MetadataRoute } from "next";

const ADMIN_BASE_PATH =
  process.env.ADMIN_BASE_PATH ?? "x7k9p2";
const adminPath = ADMIN_BASE_PATH.startsWith("/")
  ? ADMIN_BASE_PATH
  : `/${ADMIN_BASE_PATH}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.SITE_URL ?? "https://www.dakshh-hitk.com";

  const publicPaths = [
    "",
    "/auth",
    "/events",
    "/schedule",
    "/seminars",
    "/profile",
  ];

  return publicPaths
    .filter((path) => !path.startsWith(adminPath))
    .map((path) => ({
      url: `${baseUrl}${path || "/"}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    }));
}
