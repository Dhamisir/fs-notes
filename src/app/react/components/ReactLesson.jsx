"use client";

import Link from "next/link";

export function ReactLesson({ backHref, title, children }) {
  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href={backHref}
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← Back
      </Link>

      <div className="mt-4 flex flex-col gap-6 rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight text-[#0174af]">
          {title}
        </h1>
        <div className="flex flex-col gap-6">{children}</div>
      </div>
    </div>
  );
}

