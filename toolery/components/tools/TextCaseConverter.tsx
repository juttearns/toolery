"use client";

import { useMemo, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";

function toTitleCase(s: string) {
  return s.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase());
}
function toSentenceCase(s: string) {
  const lower = s.toLowerCase();
  return lower.replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase());
}
function words(s: string) {
  return s
    .trim()
    .split(/[\s_\-]+/)
    .filter(Boolean);
}
function toCamelCase(s: string) {
  const w = words(s).map((word) => word.toLowerCase());
  return w.map((word, i) => (i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))).join("");
}
function toPascalCase(s: string) {
  return words(s)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}
function toSnakeCase(s: string) {
  return words(s).map((w) => w.toLowerCase()).join("_");
}
function toKebabCase(s: string) {
  return words(s).map((w) => w.toLowerCase()).join("-");
}
function toAlternatingCase(s: string) {
  return s
    .split("")
    .map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
    .join("");
}

export default function TextCaseConverter() {
  const [text, setText] = useState("Toolery makes free online tools");
  const [copied, setCopied] = useState<string | null>(null);

  const outputs = useMemo(
    () => [
      { label: "UPPERCASE", value: text.toUpperCase() },
      { label: "lowercase", value: text.toLowerCase() },
      { label: "Title Case", value: toTitleCase(text) },
      { label: "Sentence case", value: toSentenceCase(text) },
      { label: "camelCase", value: toCamelCase(text) },
      { label: "PascalCase", value: toPascalCase(text) },
      { label: "snake_case", value: toSnakeCase(text) },
      { label: "kebab-case", value: toKebabCase(text) },
      { label: "aLtErNaTiNg CaSe", value: toAlternatingCase(text) },
    ],
    [text]
  );

  async function copy(label: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      // clipboard unavailable — ignore silently
    }
  }

  return (
    <div className="space-y-6">
      <GlassCard className="p-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste text here…"
          rows={4}
          className="w-full rounded-xl bg-transparent px-4 py-3 text-fg outline-none resize-y"
        />
      </GlassCard>

      <div className="grid sm:grid-cols-2 gap-3">
        {outputs.map((o) => (
          <button
            key={o.label}
            onClick={() => copy(o.label, o.value)}
            className="glass glass-hover rounded-xl p-4 text-left"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-muted">{o.label}</span>
              <span className="text-[11px] text-teal">{copied === o.label ? "Copied!" : "Copy"}</span>
            </div>
            <div className="mt-1.5 text-fg text-sm break-words">{o.value || " "}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
