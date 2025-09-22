"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Copy as CopyIcon } from "lucide-react";

export function VSCodeBlock({ lang, code }: { lang: string; code: string }) {
  const [copied, setCopied] = React.useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <div className="relative">
      <pre className="overflow-x-auto rounded-md bg-zinc-900 p-4 text-sm text-zinc-100">
        <code className="whitespace-pre">{code}</code>
      </pre>
      <Button
        variant="outline"
        size="sm"
        onClick={onCopy}
        className="absolute right-2 top-2"
        aria-label="Copier le code"
      >
        <CopyIcon className="mr-1 h-4 w-4" />
        {copied ? "Copié" : "Copier"}
      </Button>
      <span className="sr-only">{lang}</span>
    </div>
  );
}
