import Link from "next/link";
import Logo from "@/components/Logo";
import FindStorageMenu from "@/components/FindStorageMenu";

type Props = {
  variant?: "home" | "compact";
};

export default function SiteHeader({ variant = "compact" }: Props) {
  const isHome = variant === "home";
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--primary)]">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 ${
          isHome ? "h-16" : "h-14"
        }`}
      >
        {isHome ? (
          <Logo variant="header" className="h-10 shrink-0 md:h-12" />
        ) : (
          <Link href="/" className="text-lg font-bold text-[var(--accent)]">
            Mystore
          </Link>
        )}
        <nav className="flex shrink-0 flex-wrap items-center justify-end gap-4 text-sm font-medium text-white/90 md:gap-6">
          <FindStorageMenu />
          <Link href="/list-your-space" className="hover:text-white">
            List Your Space
          </Link>
          <Link href="/become-a-driver" className="hover:text-white">
            Become Driver/Rider
          </Link>
          <Link href="/contact" className="hover:text-white">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
