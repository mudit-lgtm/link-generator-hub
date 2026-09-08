import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/onedrive-direct-link-generator")({
  beforeLoad: () => {
    throw redirect({ to: "/direct-download-link-generator", replace: true });
  },
  component: () => null,
});
