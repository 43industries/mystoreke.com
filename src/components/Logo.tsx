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
  width = 280,
  height = 88,
}: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 rounded ${className}`}
      aria-label="Cornerstone – building dreams – Home"
    >
      <Image
        src="/logo.png"
        alt="Cornerstone building dreams"
        width={width}
        height={height}
        priority
        className="h-full w-auto object-contain object-left"
        style={{ maxHeight: "120px" }}
      />
    </Link>
  );
}
