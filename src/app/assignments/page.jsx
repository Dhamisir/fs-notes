import { starterAssignments } from "@/app/assignments/data";
import AssignmentsGrid from "@/app/assignments/AssignmentsGrid";
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

      <AssignmentsGrid assignments={starterAssignments} />
    </div>
  );
}
