import Link from "next/link";
import { assignmentCatalog, starterAssignments } from "@/app/assignments/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Coding Assignments",
  description: "Browse coding assignments by area, technology, and topic.",
  path: "/assignments",
});

export default function AssignmentsPage() {
  return <div className="mx-auto flex flex-col gap-5">
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-semibold tracking-tight text-[#0174af]">📋 Assignments</h1>
      <p className="text-sm text-muted-foreground">Choose an area and technology, then select the topic you want to practise.</p>
    </div>
    <div className="overflow-hidden border-y border-[#dce8ed]">
      {assignmentCatalog.map((area, index) => {
        const count = starterAssignments.filter((item) => item.area === area.slug).length;
        return <section key={area.slug} className="grid gap-3 border-b border-[#dce8ed] py-5 last:border-b-0 sm:grid-cols-[2.5rem_1fr]">
          <span className="text-sm font-semibold tabular-nums text-[#8a9ba5]">{String(index + 1).padStart(2, "0")}</span>
          <div>
            <h2 className="text-xl font-semibold text-[#195568]">{area.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{area.description}</p>
            <div className="mt-3 divide-y divide-[#e5eef2] border-y border-[#e5eef2]">
              {area.technologies.map((technology) => <Link key={technology.slug} href={`/assignments/${area.slug}/${technology.slug}`} className="group flex items-center justify-between gap-4 py-3 outline-none transition hover:pl-2 focus-visible:pl-2">
                <div>
                  <h3 className="font-semibold text-[#0174af] group-focus-visible:underline">{technology.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{technology.topics.length} topics · {count} assignments</p>
                </div>
                <span className="text-sm font-semibold text-[#0174af]">View learning path <span className="inline-block transition group-hover:translate-x-1">→</span></span>
              </Link>)}
            </div>
          </div>
        </section>;
      })}
    </div>
  </div>;
}
