import Image from "next/image";
import Link from "next/link";
import interviewAssignment from "../../../utils/interview/villa-resort-layout";

export const metadata = { title: "Interview" };

export default function InterviewPage() {
  const assignments = [interviewAssignment];

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-6 py-12">
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← Home
      </Link>

      <section className="rounded-3xl border bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 py-10 text-white shadow-sm sm:px-10">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-pink-300">
          Interview
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
          Mock assignments
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-200">
          Practice HTML, CSS, and JavaScript interview assignments with clear
          requirements, layout notes, and submission rubrics.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {["HTML", "CSS", "JavaScript"].map((skill) => (
          <div
            key={skill}
            className="rounded-2xl border bg-card p-5 text-card-foreground shadow-sm"
          >
            <div className="text-lg font-semibold">{skill}</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Mock assignment practice for layout, responsiveness, and clean
              code review.
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-5">
        {assignments.map((assignment) => (
          <Link
            key={assignment.id}
            href={`/interview/${assignment.id}`}
            className="grid overflow-hidden rounded-2xl border bg-white text-[#1f2937] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:grid-cols-[280px_1fr]"
          >
            <Image
              src={assignment.image}
              alt={assignment.title}
              width={1200}
              height={800}
              className="h-full min-h-56 w-full object-cover"
            />
            <div className="flex flex-col gap-4 p-6">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-pink-500">
                  {assignment.category}
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  {assignment.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {assignment.summary}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {assignment.stack.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="text-sm font-medium text-[#0174af]">Open →</div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
