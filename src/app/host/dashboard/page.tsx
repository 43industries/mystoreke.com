import type { Metadata } from "next";
import HostDashboardClient from "./HostDashboardClient";

export const metadata: Metadata = {
  title: "Host Dashboard — Mystore",
  description:
    "Dashboard for Mystore hosts to review their own listings.",
};

export default function HostDashboardPage() {
  return <HostDashboardClient />;
}
