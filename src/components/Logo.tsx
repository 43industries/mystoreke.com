import Link from "next/link";
import Image from "next/image";

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
  height = 64,
}: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 rounded ${className}`}
      aria-label="MyStoreKE — Home"
    >
      <div className="flex flex-col items-center">
        <div
          className={
            variant === "header"
              ? "h-8 overflow-hidden md:h-10"
              : "h-12 overflow-hidden md:h-16"
          }
        >
          <Image
            src="/logo.png"
            alt="MyStoreKE roof mark"
            width={width}
            height={height}
            priority
            className="h-full w-auto object-contain object-top"
          />
        </div>
        <span
          className={
            variant === "header"
              ? "mt-1 text-sm font-semibold tracking-wide text-white"
              : "mt-2 text-lg font-semibold tracking-wide text-white"
          }
        >
          MyStore
        </span>
      </div>
    </Link>
  );
}
