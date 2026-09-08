import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/venmo-link-generator")({
  beforeLoad: () => {
    throw redirect({ to: "/payment-link-generator", replace: true });
  },
  component: () => null,
});
