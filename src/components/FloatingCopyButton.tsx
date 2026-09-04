"use client";

import { useState } from "react";
import { Check, ClipboardCopy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { copyText } from "@/lib/clipboard";
import { cn } from "@/lib/utils";

type FloatingCopyButtonProps = {
  text: string;
  className?: string;
  label?: string;
};

/** Sticky 1-click copy for result panels */
export function FloatingCopyButton({
  text,
  className,
  label = "Copy",
}: FloatingCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const ok = await copyText(text);
    if (ok) {
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error("Copy failed — select and copy manually");
    }
  };

  return (
    <Button
      type="button"
      size="sm"
      onClick={handleCopy}
      disabled={!text}
      className={cn("shrink-0 shadow-soft", copied && "bg-primary/90", className)}
    >
      {copied ? (
        <>
          <Check className="animate-check-pop" />
          Copied
        </>
      ) : (
        <>
          <ClipboardCopy />
          {label}
        </>
      )}
    </Button>
  );
}
