import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

/** Vite injects BASE_URL from `base` (e.g. `/my-little-bloc/` or `/`). */
const basepath = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

/**
 * GitHub Pages serves 404.html for unknown paths. Our postbuild copies the SPA
 * shell there, so deep links keep a real pathname. This hash restore remains for
 * older fallbacks that redirected to `/#/path`.
 */
const restoreRouteFromHash = () => {
  if (typeof window === "undefined") return;

  const hash = window.location.hash.replace(/^#/, "");
  if (!hash) return;

  try {
    const decoded = decodeURIComponent(hash);
    if (!decoded.startsWith("/")) return;

    // Accept either app-relative (`/about`) or absolute (`/my-little-bloc/about`) hashes.
    const nextPath =
      basepath !== "/" && decoded.startsWith(basepath)
        ? decoded
        : `${basepath === "/" ? "" : basepath}${decoded}`;

    if (nextPath === window.location.pathname) return;
    window.history.replaceState(null, "", nextPath);
  } catch {
    // Ignore invalid hash values
  }
};

export const getRouter = () => {
  restoreRouteFromHash();

  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    basepath,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
