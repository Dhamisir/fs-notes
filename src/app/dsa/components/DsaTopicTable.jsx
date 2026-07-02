"use client";

import { useState } from "react";
import { DsaTopicModal } from "@/app/dsa/components/DsaTopicModal";

export function DsaTopicTable({ topics }) {
  const [selectedTopic, setSelectedTopic] = useState(null);

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
