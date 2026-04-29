import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import interviewAssignment from "../../../../utils/interview/villa-resort-layout";

const assignments = {
  [interviewAssignment.id]: interviewAssignment,
};

export async function generateStaticParams() {
  return Object.keys(assignments).map((assignment) => ({ assignment }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = params && typeof params.then === "function" ? await params : params;
  const id = decodeURIComponent(String(resolvedParams?.assignment ?? ""));
  const assignment = assignments[id];

  return {
    title: assignment ? assignment.title : "Interview Assignment",
  };
}

export default async function InterviewAssignmentPage({ params }) {
  const resolvedParams = params && typeof params.then === "function" ? await params : params;
  const id = decodeURIComponent(String(resolvedParams?.assignment ?? ""));
  const assignment = assignments[id];

  if (!assignment) return notFound();

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-12">
      <Link
        href="/interview"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← Back to Interview
      </Link>

      <section className="overflow-hidden rounded-3xl border bg-card shadow-sm">
        <Image
          src={assignment.previewImage}
          alt={`${assignment.title} preview`}
          width={1200}
          height={800}
          className="h-72 w-full object-cover"
          priority
        />
        <div className="flex flex-col gap-4 p-6 sm:p-8">
          <div className="flex flex-wrap gap-2">
            {assignment.stack.map((item) => (
              <span
                key={item}
                className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">
            {assignment.assignmentName}
          </h1>
          <p className="max-w-3xl text-muted-foreground">
            {assignment.summary}
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {assignment.facts.map((item) => (
          <div key={item.label} className="rounded-2xl border bg-card p-5">
            <div className="text-sm text-muted-foreground">{item.label}</div>
            <div className="mt-1 text-lg font-semibold">{item.value}</div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border bg-card p-6">
          <h2 className="text-xl font-semibold">Instructions</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            {assignment.instructions.map((instruction) => (
              <li key={instruction}>{instruction}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border bg-card p-6">
          <h2 className="text-xl font-semibold">Required sections</h2>
          <div className="mt-4 flex flex-col gap-3">
            {assignment.sections.map((section) => (
              <div key={section.name} className="rounded-xl bg-muted p-4">
                <div className="font-medium">{section.name}</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Use {section.method}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-card p-6">
        <h2 className="text-xl font-semibold">Responsive requirements</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {assignment.responsive.map((item) => (
            <div key={item.screen} className="rounded-xl bg-muted p-4">
              <div className="font-medium">{item.screen}</div>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.expectation}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
