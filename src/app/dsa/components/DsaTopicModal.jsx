"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { CodeBlock } from "@/components/code/CodeBlock";
import { getTopicContent } from "@/app/dsa/content/topicContent";

function SectionContent({ section }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-base font-semibold text-slate-900">{section.title}</h3>
      {section.links?.length ? (
        <div className="flex flex-wrap gap-2">
          {section.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 transition hover:border-cyan-300 hover:bg-cyan-100"
            >
              {link.label ?? "Open notes"} →
            </a>
          ))}
        </div>
      ) : null}
      {section.quote ? (
        <blockquote className="border-l-4 border-cyan-500 bg-cyan-50 px-4 py-2 text-sm italic text-slate-700">
          {section.quote}
        </blockquote>
      ) : null}
      {section.body ? (
        <p className="text-sm leading-6 text-muted-foreground">{section.body}</p>
      ) : null}
      {section.bullets?.length ? (
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {section.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {section.table ? (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full min-w-[320px] border-collapse text-sm">
            <thead>
              <tr className="border-b bg-slate-50">
                {section.table.headers.map((header) => (
                  <th
                    key={header}
                    className="px-3 py-2 text-left font-semibold text-slate-800"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={rowIndex % 2 === 0 ? "bg-white" : "bg-slate-50/80"}
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-3 py-2 align-top text-muted-foreground"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      {section.code ? (
        <CodeBlock language="cpp" code={section.code} />
      ) : null}
    </div>
  );
}

export function DsaTopicModal({ topic, onClose }) {
  const content = topic ? getTopicContent(topic.slug) : null;

  useEffect(() => {
    if (!topic) return;

    function onKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [topic, onClose]);

  if (!topic) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dsa-topic-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-label="Close dialog"
      />

      <div className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border bg-white shadow-xl">
        <div className="flex items-start justify-between gap-4 border-b px-5 py-4 sm:px-6">
          <div>
            <h2
              id="dsa-topic-modal-title"
              className="text-xl font-semibold tracking-tight text-slate-900"
            >
              {topic.topic}
            </h2>
            <p className="mt-1 text-sm text-cyan-700">
              <span className="font-medium">Goal:</span> {topic.goal}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border p-1.5 text-muted-foreground transition hover:bg-slate-50 hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          <div className="mb-6 grid gap-3 rounded-xl border bg-slate-50 p-4 text-sm sm:grid-cols-2">
            <div>
              <span className="font-semibold text-slate-800">Concepts</span>
              <p className="mt-1 text-muted-foreground">{topic.concepts}</p>
            </div>
            <div>
              <span className="font-semibold text-slate-800">
                Practice Problems
              </span>
              <p className="mt-1 text-muted-foreground">{topic.problems}</p>
            </div>
          </div>

          {content?.opener?.length ? (
            <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-semibold text-amber-900">
                Class opener
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-amber-950">
                {content.opener.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {content?.links?.length ? (
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                Practice Modules
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {content.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col rounded-xl border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-md"
                  >
                    <span className="font-semibold text-slate-900">
                      {link.label}
                    </span>
                    {link.description ? (
                      <span className="mt-1 text-sm text-muted-foreground">
                        {link.description}
                      </span>
                    ) : null}
                    <span className="mt-3 text-sm font-medium text-cyan-700">
                      Open in Notion →
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ) : null}

          {content?.sections?.length ? (
            <div className="flex flex-col gap-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                Lecture Notes
              </p>
              {content.sections.map((section) => (
                <SectionContent key={section.title} section={section} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Detailed notes for this topic are coming soon.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
