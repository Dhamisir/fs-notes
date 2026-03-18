"use client";

import Link from "next/link";

export function SqlLesson({ backHref, title, children }) {
  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href={backHref}
        className="text-sm font-semibold text-[#007acc] hover:underline"
      >
        ← Back to Menu
      </Link>

      <div className="mt-4 rounded-2xl bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
        <h1 className="text-3xl font-semibold tracking-tight text-[#2c3e50]">
          {title}
        </h1>
        <div className="mt-5 flex flex-col gap-6">{children}</div>
      </div>
    </div>
  );
}

