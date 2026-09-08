import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/gmail-compose-link-generator")({
  beforeLoad: () => {
    throw redirect({ to: "/mailto-link-generator", replace: true });
  },
  component: () => null,
});
