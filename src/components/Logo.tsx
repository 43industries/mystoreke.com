import Link from "next/link";
import Image from "next/image";
import { BRAND_NAME } from "@/lib/brand";
import { BRAND_LOGO_MARK_SRC } from "@/lib/logo";

type LogoProps = {
  variant?: "header" | "footer";
  className?: string;
  width?: number;
  height?: number;
};

export default function Logo({
  variant = "header",
  className = "",
  width: _w = 220,
  height: _h = 70,
}: LogoProps) {
  const markClass =
    variant === "header"
      ? "h-8 w-auto md:h-10"
      : "h-14 w-auto md:h-16";

  return (
    <Link
      href="/"
      className={`inline-flex flex-col items-center gap-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--primary)] rounded-md ${className}`}
      aria-label={`${BRAND_NAME} — Home`}
    >
      <Image
        src={BRAND_LOGO_MARK_SRC}
        alt={BRAND_NAME}
        width={_w}
        height={_h}
        priority
        className={`${markClass} shrink-0 object-contain`}
      />
    </Link>
  );
}
