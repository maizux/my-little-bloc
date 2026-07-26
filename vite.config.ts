// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const repoName = "my-little-bloc";
const isBuild = process.argv.includes("build");
const isLovable =
  process.env.LOVABLE_SANDBOX === "1" || !!process.env.DEV_SERVER__PROJECT_PATH;
// Static GitHub Pages build (local + CI). Lovable keeps its Cloudflare/nitro pipeline.
const isGitHubPages = isBuild && !isLovable;

export default defineConfig({
  // Cloudflare nitro breaks TanStack prerender's preview server (expects dist/server/server.js).
  nitro: isGitHubPages ? false : undefined,
  vite: {
    base: isGitHubPages ? `/${repoName}/` : "/",
    build: {
      manifest: true,
      assetsDir: "assets",
    },
    publicDir: "public",
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
    ...(isGitHubPages
      ? {
          prerender: {
            enabled: true,
            crawlLinks: true,
            failOnError: true,
          },
          // Shell page used as SPA fallback (copied to 404.html after build).
          spa: {
            enabled: true,
          },
        }
      : {}),
  },
});
