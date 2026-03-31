import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Access — Mystore",
  description: "Sign up or log in to manage your Mystore bookings, listings, and profile.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
