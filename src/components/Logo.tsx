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
  width: _w = 200,
  height: _h = 64,
}: LogoProps) {
  const markClass =
    variant === "header"
      ? "h-8 w-8 md:h-9 md:w-9"
      : "h-14 w-14 md:h-16 md:w-16";
  const textClass =
    variant === "header"
      ? "text-xs font-semibold tracking-normal text-white md:text-sm"
      : "text-sm font-semibold tracking-normal text-white md:text-base";

  return (
    <Link
      href="/"
      className={`inline-flex flex-col items-center gap-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--primary)] rounded-md ${className}`}
      aria-label={`${BRAND_NAME} — Home`}
    >
      <Image
        src={BRAND_LOGO_MARK_SRC}
        alt=""
        width={48}
        height={48}
        priority
        className={`${markClass} shrink-0 object-contain`}
        aria-hidden
      />
      <span className={textClass}>{BRAND_NAME}</span>
    </Link>
  );
}
