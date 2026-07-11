"use client";

import { useState } from "react";

interface DevNoteProps {
  note: string;
  label?: string;
}

export default function DevNote({ note, label = "DEV NOTE" }: DevNoteProps) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-flex align-middle">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-amber-500/40 bg-amber-500/10 text-[10px] font-bold text-amber-400 transition hover:bg-amber-500/20"
        aria-label="Developer note"
        title="Developer note"
      >
        i
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-1/2 top-full z-50 mt-2 w-72 -translate-x-1/2 animate-fade-in rounded-lg border border-amber-500/30 bg-surface-700 p-3 shadow-xl">
            <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-400">{label}</div>
            <p className="text-xs leading-relaxed text-slate-300">{note}</p>
          </div>
        </>
      )}
    </span>
  );
}
