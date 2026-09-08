import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/tinyurl-link-generator")({
  beforeLoad: () => {
    throw redirect({ to: "/short-link-generator", replace: true });
  },
  component: () => null,
});
