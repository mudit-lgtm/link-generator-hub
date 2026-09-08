import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/pinterest-share-link-generator")({
  beforeLoad: () => {
    throw redirect({ to: "/reddit-share-link-generator", replace: true });
  },
  component: () => null,
});
