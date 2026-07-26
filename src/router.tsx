import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const restoreRedirectPath = () => {
  if (typeof window === "undefined") return;

  const redirectPath = window.sessionStorage.getItem("redirectPath");
  if (!redirectPath) return;

  window.sessionStorage.removeItem("redirectPath");

  const basePath = import.meta.env.BASE_URL;
  const canonicalPath = redirectPath.startsWith(basePath)
    ? redirectPath.replace(basePath, "/")
    : redirectPath;

  if (canonicalPath.startsWith("/")) {
    window.history.replaceState(null, "", canonicalPath);
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
