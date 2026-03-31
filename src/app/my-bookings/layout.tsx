import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Bookings — Mystore",
  description: "View and track your current and past storage booking requests.",
};

export default function MyBookingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
