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
      <Image
        src="/logo.png"
        alt="MyStoreKE"
        width={width}
        height={height}
        priority
        className="h-full w-auto object-contain object-left"
      />
    </Link>
  );
}
