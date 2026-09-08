import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/deep-link-generator")({
  beforeLoad: () => {
    throw redirect({ to: "/app-store-link-generator", replace: true });
  },
  component: () => null,
});
