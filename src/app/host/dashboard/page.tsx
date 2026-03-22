import type { Metadata } from "next";
import HostDashboardClient from "./HostDashboardClient";

export const metadata: Metadata = {
  title: "Host Dashboard — MyStoreKE",
  description:
    "Dashboard for MyStoreKE hosts to review their own listings.",
};

export default function HostDashboardPage() {
  return <HostDashboardClient />;
}
