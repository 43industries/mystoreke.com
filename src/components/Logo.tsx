import Link from "next/link";
import Image from "next/image";
import { BRAND_NAME } from "@/lib/brand";
import {
  BRAND_LOGO_INCLUDES_WORDMARK,
  BRAND_LOGO_SRC,
} from "@/lib/logo";

type LogoProps = {
  variant?: "header" | "footer";
  className?: string;
  width?: number;
  height?: number;
};

export default function Logo({
  variant = "header",
  className = "",
  width = 200,
  height: _footerHeight = 64,
}: LogoProps) {
  const imgWidth =
    variant === "footer"
      ? Math.min(320, Math.max(200, width))
      : 220;
  const imgHeight =
    variant === "footer" ? 100 : 44;

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--primary)] rounded-md ${className}`}
      aria-label={`${BRAND_NAME} — Home`}
    >
      <Image
        src={BRAND_LOGO_SRC}
        alt={BRAND_LOGO_INCLUDES_WORDMARK ? `${BRAND_NAME} logo` : ""}
        width={imgWidth}
        height={imgHeight}
        priority
        className={
          variant === "header"
            ? "h-9 w-auto max-w-[min(220px,75vw)] object-contain object-left md:h-11"
            : "h-16 w-auto max-w-[min(320px,90vw)] object-contain object-left md:h-24"
        }
        sizes={variant === "footer" ? "(max-width: 768px) 90vw, 320px" : "(max-width: 768px) 75vw, 220px"}
        aria-hidden={!BRAND_LOGO_INCLUDES_WORDMARK}
      />
      {!BRAND_LOGO_INCLUDES_WORDMARK && (
        <span
          className={
            variant === "header"
              ? "text-lg font-bold tracking-tight text-white md:text-xl"
              : "text-2xl font-bold tracking-tight text-white md:text-3xl"
          }
        >
          {BRAND_NAME}
        </span>
      )}
    </Link>
  );
}
