import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const restoreRedirectPath = () => {
  if (typeof window === "undefined") return;

  const redirectPath = window.sessionStorage.getItem("redirectPath");
  if (!redirectPath) return;

  window.sessionStorage.removeItem("redirectPath");

  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
  const normalizedPath = redirectPath.startsWith(basePath)
    ? redirectPath
    : redirectPath.startsWith("/")
      ? `${basePath}${redirectPath}`
      : `${basePath}/${redirectPath}`;

  const targetPath = `${new URL(normalizedPath, window.location.origin).pathname}${new URL(normalizedPath, window.location.origin).search}${new URL(normalizedPath, window.location.origin).hash}`;

  if (targetPath !== window.location.pathname + window.location.search + window.location.hash) {
    window.history.replaceState(null, "", targetPath);
  }
};

export const getRouter = () => {
  restoreRedirectPath();

  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
