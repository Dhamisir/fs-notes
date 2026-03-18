"use client";

import { CodeViewer } from "@/components/code/CodeViewer";

export function CodeBlock({ code, language = "plaintext" }) {
  const lineCount = (code ?? "").split("\n").length;
  const height = Math.min(520, Math.max(140, 22 * (lineCount + 1)));
  return <CodeViewer code={code ?? ""} language={language} height={height} />;
}

