import Link from "next/link";
import { starterAssignments } from "@/app/assignments/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Coding Assignments",
  description:
    "Download starter React, Node.js, Express, and MySQL projects and complete real backend challenges — from connecting a frontend to live data through to authentication, authorization, and validation.",
  path: "/assignments",
});

export default function AssignmentsPage() {
  return (
    <div className="mx-auto flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-[#0174af]">
          📋 Assignments
        </h1>
        <p className="text-sm text-muted-foreground">
          Download a starter project, complete its challenge, and test your
          result locally.
        </p>
      </div>

      <section className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {starterAssignments.map((assignment) => (
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
      </section>
    </div>
  );
}
