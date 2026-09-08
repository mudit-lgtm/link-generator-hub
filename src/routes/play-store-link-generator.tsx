import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/play-store-link-generator")({
  beforeLoad: () => {
    throw redirect({ to: "/app-store-link-generator", replace: true });
  },
  component: () => null,
});
