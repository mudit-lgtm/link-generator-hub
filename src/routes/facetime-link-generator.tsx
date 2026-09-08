import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/facetime-link-generator")({
  beforeLoad: () => {
    throw redirect({ to: "/sms-link-generator", replace: true });
  },
  component: () => null,
});
