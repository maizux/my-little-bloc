import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const restoreRouteFromHash = () => {
  if (typeof window === "undefined") return;

  const hash = window.location.hash.replace(/^#/, "");
  if (!hash) return;

  try {
    const decoded = decodeURIComponent(hash);
    if (!decoded.startsWith("/")) return;
    if (decoded === window.location.pathname) return;
    window.history.replaceState(null, "", decoded);
  } catch {
    // Ignore invalid hash values
  }
};

export const getRouter = () => {
  restoreRouteFromHash();

  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
