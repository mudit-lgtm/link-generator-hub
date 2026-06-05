import { createFileRoute, redirect } from "@tanstack/react-router";

// The Premium Link Generator is the homepage — redirect legacy URL.
export const Route = createFileRoute("/premium-link-generator")({
  beforeLoad: () => {
    throw redirect({ to: "/", code: 301 });
  },
  component: () => null,
});
