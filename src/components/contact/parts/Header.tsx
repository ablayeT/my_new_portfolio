"use client";

export function ContactHeader({
  heading,
  subtitle,
}: {
  heading: string;
  subtitle: string;
}) {
  return (
    <div className="mb-10 text-center">
      <h1
        className={[
          "mb-3 font-extrabold leading-tight",
          "[font-size:clamp(28px,4.2vw,40px)]",
          "bg-gradient-to-r from-[#6d28d9] via-[#7c3aed] to-[#0ea5e9] bg-clip-text text-transparent",
        ].join(" ")}
      >
        {heading}
      </h1>
      <p className="mx-auto max-w-2xl text-[color:var(--color-muted-foreground,#6b7280)] [font-size:var(--tokens-text-body-16,16px)]">
        {subtitle}
      </p>
    </div>
  );
}
