import React, { useState } from "react";
import { cn } from "../ui/utils";
import { PurpleButton } from "./purple-button";

export interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "",
  className = "",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      className={cn(
        "relative bg-[var(--color-neutral-900)] rounded-[var(--radius-12)] p-4",
        "dark:bg-[var(--color-neutral-950)]",
        className
      )}
    >
      <div className="flex justify-between items-center mb-3">
        {language && (
          <span className="text-[var(--color-neutral-300)] text-sm font-mono">
            {language}
          </span>
        )}
        <PurpleButton
          intent="ghost"
          size="sm"
          onClick={handleCopy}
          className="text-[var(--color-neutral-300)] hover:text-white hover:bg-[var(--color-neutral-700)]"
        >
          {copied ? "Copied!" : "Copy"}
        </PurpleButton>
      </div>
      <pre className="text-[var(--color-neutral-0)] font-mono text-sm leading-relaxed overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
};
