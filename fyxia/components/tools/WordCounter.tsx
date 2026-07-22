"use client";

import { useMemo, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";

export default function WordCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const sentences = trimmed ? (trimmed.match(/[.!?]+(\s|$)/g) || []).length || (trimmed ? 1 : 0) : 0;
    const paragraphs = trimmed ? trimmed.split(/\n+/).filter((p) => p.trim()).length : 0;
    const readingTime = Math.max(1, Math.ceil(words / 200));
    return { words, characters, charactersNoSpaces, sentences, paragraphs, readingTime };
  }, [text]);

  return (
    <div className="space-y-6">
      <GlassCard className="p-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here…"
          rows={12}
          className="w-full rounded-xl bg-transparent px-4 py-3 text-fg outline-none resize-y"
        />
      </GlassCard>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Stat label="Words" value={stats.words} />
        <Stat label="Characters" value={stats.characters} />
        <Stat label="Characters (no spaces)" value={stats.charactersNoSpaces} />
        <Stat label="Sentences" value={stats.sentences} />
        <Stat label="Paragraphs" value={stats.paragraphs} />
        <Stat label="Reading time" value={`${stats.readingTime} min`} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="glass rounded-xl p-4">
      <div className="text-xs uppercase tracking-wider text-muted">{label}</div>
      <div className="data-num mt-1 text-xl font-semibold text-fg">{value}</div>
    </div>
  );
}
