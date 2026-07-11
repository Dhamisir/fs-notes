"use client";

import { useState } from "react";
import { DsaTopicModal } from "@/app/dsa/components/DsaTopicModal";

export function DsaTopicTable({ topics, layout = "table" }) {
  const [selectedTopic, setSelectedTopic] = useState(null);

  if (layout === "cards") {
    return (
      <>
        <p className="mt-3 text-xs text-muted-foreground">
          Click any phase card to open question notes
        </p>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          {topics.map((topic, index) => (
            <button
              key={topic.slug}
              type="button"
              onClick={() => setSelectedTopic(topic)}
              className={[
                "group rounded-2xl border bg-white p-5 text-left shadow-sm transition",
                "hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-md",
                "focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
                    Phase {index + 1}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight text-slate-900">
                    {topic.topic}
                  </h3>
                </div>
                <span className="text-sm font-medium text-cyan-700 transition group-hover:translate-x-0.5">
                  Open →
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {topic.concepts}
              </p>
              <p className="mt-3 text-sm font-medium text-slate-700">
                {topic.problems}
              </p>
            </button>
          ))}
        </div>

        <DsaTopicModal
          topic={selectedTopic}
          onClose={() => setSelectedTopic(null)}
        />
      </>
    );
  }

  return (
    <>
      <p className="mt-3 text-xs text-muted-foreground">
        Click any row to open lecture notes
      </p>
      <div className="mt-2 overflow-x-auto rounded-2xl border">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b bg-slate-50 text-left">
              <th className="px-4 py-3 font-semibold text-slate-800">Topic</th>
              <th className="px-4 py-3 font-semibold text-slate-800">
                Concepts
              </th>
              <th className="px-4 py-3 font-semibold text-slate-800">
                Practice Problems
              </th>
              <th className="px-4 py-3 font-semibold text-slate-800">Goal</th>
            </tr>
          </thead>
          <tbody>
            {topics.map((row, index) => (
              <tr
                key={row.slug}
                onClick={() => setSelectedTopic(row)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedTopic(row);
                  }
                }}
                tabIndex={0}
                role="button"
                className={[
                  "cursor-pointer transition hover:bg-cyan-50 focus:bg-cyan-50 focus:outline-none",
                  index % 2 === 0 ? "bg-white" : "bg-slate-50/80",
                ].join(" ")}
              >
                <td className="px-4 py-3 align-top font-medium text-slate-900">
                  {row.topic}
                  <span className="mt-1 block text-xs font-normal text-cyan-700">
                    View notes →
                  </span>
                </td>
                <td className="px-4 py-3 align-top text-muted-foreground">
                  {row.concepts}
                </td>
                <td className="px-4 py-3 align-top text-muted-foreground">
                  {row.problems}
                </td>
                <td className="px-4 py-3 align-top text-slate-700">
                  {row.goal}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DsaTopicModal
        topic={selectedTopic}
        onClose={() => setSelectedTopic(null)}
      />
    </>
  );
}
