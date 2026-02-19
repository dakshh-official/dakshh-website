import { MetadataRoute } from "next";

const ADMIN_BASE_PATH =
  process.env.ADMIN_BASE_PATH ?? "x7k9p2";
const adminPath = ADMIN_BASE_PATH.startsWith("/")
  ? ADMIN_BASE_PATH
  : `/${ADMIN_BASE_PATH}`;

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.SITE_URL ?? "https://www.dakshh-hitk.com";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [adminPath, "/api/admin-panel"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
