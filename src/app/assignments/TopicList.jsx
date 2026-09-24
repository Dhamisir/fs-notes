import Link from "next/link";
import { getAssignmentPath } from "@/app/assignments/data";

const LEVELS = [
  { slug: "basic", title: "Basic" },
  { slug: "advanced", title: "Advanced" },
];

export default function TopicList({ area, technology, assignments, activeTopic }) {
  const basePath = `/assignments/${area.slug}/${technology.slug}`;
  const levels = LEVELS.filter((level) =>
    technology.topics.some((topic) => topic.level === level.slug),
  );

  return <div className="flex flex-col gap-7">{levels.map((level) => {
    const topics = technology.topics.filter((topic) => topic.level === level.slug);
    return <section key={level.slug}>
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#8a9ba5]">{level.title}</h2>
      <div>{topics.map((topic) => {
        const index = technology.topics.findIndex((item) => item.slug === topic.slug);
        const items = assignments.filter((item) => item.topic === topic.slug);
        const isOpen = activeTopic === topic.slug;
        return <section key={topic.slug} className={`relative border-l-2 pb-8 pl-8 last:pb-0 ${isOpen ? "border-[#0174af]" : "border-[#dce8ed]"}`}>
          <span className={`absolute -left-[1.05rem] top-0 flex size-8 items-center justify-center rounded-full border-2 bg-[#f9fbfc] text-[11px] font-bold ${isOpen ? "border-[#0174af] text-[#0174af]" : "border-[#c5d8e0] text-[#6f8791]"}`}>{String(index + 1).padStart(2, "0")}</span>
          <Link href={isOpen ? basePath : `${basePath}/${topic.slug}`} aria-current={isOpen ? "page" : undefined} className={`group flex items-start justify-between gap-4 rounded-lg px-4 py-3 outline-none transition focus-visible:ring-2 focus-visible:ring-[#0174af] ${isOpen ? "bg-[#eaf7fc]" : "hover:bg-[#f2f8fa]"}`}>
            <div>
              <h3 className="font-semibold text-[#195568]">{topic.title}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">{items.length} {items.length === 1 ? "assignment" : "assignments"}</p>
            </div>
            <span className="mt-0.5 whitespace-nowrap text-sm font-semibold text-[#0174af]">{isOpen ? "Close" : "View"} <span aria-hidden="true">{isOpen ? "↑" : "↓"}</span></span>
          </Link>
          {isOpen && <div className="ml-4 divide-y divide-[#dce8ed]">{items.map((assignment) =>
            <Link key={assignment.slug} href={getAssignmentPath(assignment)} className="group grid gap-2 py-4 outline-none sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <h4 className="font-semibold text-[#195568] group-hover:text-[#0174af] group-focus-visible:text-[#0174af]">{assignment.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{assignment.description}</p>
              </div>
              <span className="text-sm font-semibold text-[#0174af]">Open <span className="inline-block transition group-hover:translate-x-1">→</span></span>
            </Link>)}</div>}
        </section>;
      })}</div>
    </section>;
  })}</div>;
}
