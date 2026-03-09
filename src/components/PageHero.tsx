import Image from "next/image";

type PageHeroProps = {
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt?: string;
};

export default function PageHero({
  title,
  subtitle,
  imageSrc,
  imageAlt = "",
}: PageHeroProps) {
  return (
    <section className="relative h-48 w-full overflow-hidden bg-[var(--primary)] md:h-56 lg:h-64">
      <Image
        src={imageSrc}
        alt={imageAlt || title}
        fill
        sizes="100vw"
        className="object-cover opacity-90"
        unoptimized
        priority
      />
      <div className="absolute inset-0 bg-[var(--primary)]/60" />
      <div className="absolute inset-0 flex flex-col justify-center px-4 text-center text-white">
        <h1 className="text-3xl font-bold drop-shadow md:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 max-w-2xl mx-auto text-lg opacity-95 md:text-xl">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
