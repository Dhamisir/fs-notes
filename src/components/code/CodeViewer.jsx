"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

export function CodeViewer({ code, language = "plaintext", height = 180 }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1200);
    return () => clearTimeout(t);
  }, [copied]);

  const headerLabel = useMemo(() => {
    if (!language) return "code";
    return language.toLowerCase();
  }, [language]);

  const monacoLanguage = useMemo(() => {
    const lang = (language || "").toLowerCase();
    if (lang === "jsx") return "javascript";
    if (lang === "tsx") return "typescript";
    if (lang === "js") return "javascript";
    if (lang === "ts") return "typescript";
    return lang || "plaintext";
  }, [language]);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(code ?? "");
      setCopied(true);
    } catch {
      // ignore
    }
  }

  return (
    <section className="not-prose overflow-hidden rounded-xl border bg-[#282c34] text-[#abb2bf] shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-black/20 px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="rounded-md border border-white/10 bg-black/30 px-2 py-0.5 text-xs font-medium text-[#abb2bf]">
            {headerLabel}
          </span>
        </div>

        <button
          type="button"
          onClick={onCopy}
          className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-white/10 bg-black/30 px-2.5 py-1.5 text-xs font-medium text-[#e5e7eb] transition hover:bg-black/40"
          aria-label="Copy code"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <MonacoEditor
        height={height}
        defaultLanguage={monacoLanguage}
        theme="vs-dark"
        value={code}
        options={{
          readOnly: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: "on",
          fontSize: 13,
          lineNumbers: "on",
          renderLineHighlight: "none",
          automaticLayout: true,
          padding: { top: 12, bottom: 12 },
          scrollbar: {
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10,
          },
        }}
      />
    </section>
  );
}

