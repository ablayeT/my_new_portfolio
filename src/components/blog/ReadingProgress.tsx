"use client";

import React from "react";

export function ReadingProgress() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    function onScroll() {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      const p = total > 0 ? (el.scrollTop / total) * 100 : 0;
      setProgress(Math.max(0, Math.min(100, p)));
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-[60] h-0.5 bg-transparent"
    >
      <div
        className="h-full"
        style={{
          width: `${progress}%`,
          background:
            "linear-gradient(90deg, var(--tokens-color-brand-purple,#6d28d9), var(--tokens-color-brand-primary,#1e3a5f))",
          transition: "width 120ms linear",
        }}
      />
    </div>
  );
}
