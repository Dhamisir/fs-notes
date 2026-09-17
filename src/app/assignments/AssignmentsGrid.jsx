"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const TECH_ORDER = ["React", "Node.js", "Express", "MySQL"];

const CATEGORY_OPTIONS = [
  { value: "all", label: "All" },
  { value: "frontend", label: "Frontend Only" },
  { value: "fullstack", label: "Full-Stack" },
];

function getTechs(stack) {
  return stack.split(" · ");
}

export default function AssignmentsGrid({ assignments }) {
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState([]);

  function selectCategory(value) {
    setCategory(value);
    setSelected([]);
  }

  const assignmentsInCategory = useMemo(() => {
    if (category === "all") return assignments;
    return assignments.filter((assignment) => assignment.category === category);
  }, [assignments, category]);

  const availableTechs = useMemo(() => {
    const present = new Set();
    assignmentsInCategory.forEach((assignment) =>
      getTechs(assignment.stack).forEach((tech) => present.add(tech)),
    );
    return TECH_ORDER.filter((tech) => present.has(tech));
  }, [assignmentsInCategory]);

  function toggleTech(tech) {
    setSelected((current) =>
      current.includes(tech)
        ? current.filter((item) => item !== tech)
        : [...current, tech],
    );
  }

  const filteredAssignments = useMemo(() => {
    if (selected.length === 0) return assignmentsInCategory;
    return assignmentsInCategory.filter((assignment) => {
      const techs = getTechs(assignment.stack);
      return selected.every((tech) => techs.includes(tech));
    });
  }, [assignmentsInCategory, selected]);

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#8a9ba5]">
          Type
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORY_OPTIONS.map((option) => {
            const active = category === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => selectCategory(option.value)}
                aria-pressed={active}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                  active
                    ? "border-[#195568] bg-[#195568] text-white"
                    : "border-[#cfe3ec] bg-white text-[#195568] hover:border-[#195568]"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#8a9ba5]">
          Technology
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {availableTechs.map((tech) => {
            const active = selected.includes(tech);
            return (
              <button
                key={tech}
                type="button"
                onClick={() => toggleTech(tech)}
                aria-pressed={active}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                  active
                    ? "border-[#0174af] bg-[#0174af] text-white"
                    : "border-[#cfe3ec] bg-white text-[#195568] hover:border-[#0174af]"
                }`}
              >
                {tech}
              </button>
            );
          })}
          {selected.length > 0 && (
            <button
              type="button"
              onClick={() => setSelected([])}
              className="text-xs font-medium text-muted-foreground underline underline-offset-2 hover:text-foreground"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {filteredAssignments.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No assignments match the selected technologies.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAssignments.map((assignment) => (
            <Link
              key={assignment.number}
              href={`/assignments/${assignment.slug}`}
              className="group flex h-full flex-col gap-4 rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#e6f5fb] text-sm font-bold text-[#0174af]">
                  {assignment.number}
                </div>
                <div>
                  <h3 className="font-semibold text-[#195568]">
                    {assignment.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {assignment.description}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-[#517481]">
                  {assignment.stack}
                </p>
                <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#fff4e5] px-3 py-1 text-xs font-semibold text-[#9a5b13]">
                  🎓 You&apos;ll learn: {assignment.learn}
                </p>
              </div>

              <span className="mt-auto inline-flex items-center justify-center rounded-lg bg-[#0174af] px-4 py-2.5 text-sm font-semibold text-white transition group-hover:bg-[#005f91]">
                View Assignment →
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
