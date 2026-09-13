import { createFileRoute, redirect } from "@tanstack/react-router";

// This page has been retired. It previously targeted paid file-host queries,
// which is off-topic for this site and a quality/trust risk for the domain.
export const Route = createFileRoute("/premium-link-generator")({
  beforeLoad: () => {
    throw redirect({ to: "/direct-download-link-generator", replace: true });
  },
  component: () => null,
});
