import Link from "next/link";
import { projectTracks } from "@/app/project/data";
import { Callout } from "@/components/notes/Callout";

export const metadata = { title: "Project BRDs" };

export default function ProjectHome() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-[#0174af]">
          📋 Project BRDs
        </h1>
        <Callout variant="intro">
          <div className="text-sm text-[#2c3e50]">
            <b>Learning flow:</b> Frontend → Backend → Fullstack (integrated
            build).
            <ul className="mt-2 list-disc pl-6">
              <li>Frontend: UI, pages, forms with mock data</li>
              <li>Backend: API, database, auth</li>
              <li>Fullstack: connect both in one flow</li>
            </ul>
          </div>
        </Callout>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {projectTracks.map((t) => (
          <Link
            key={t.slug}
            href={`/project/${t.slug}`}
            className="rounded-xl border bg-white p-5 text-[#195568] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="text-lg font-semibold tracking-tight">{t.title}</div>
            <div className="mt-1 text-sm text-muted-foreground">
              {t.description}
            </div>
            <div className="mt-3 text-sm text-muted-foreground">Open →</div>
          </Link>
        ))}
      </div>

      <Callout variant="solution">
        <div className="text-sm text-[#2c3e50]">
          <b>Projects:</b> 1️⃣ Task/Project Management App • 2️⃣ Expense Tracker •
          3️⃣ User Management / Admin Dashboard
        </div>
      </Callout>
    </div>
  );
}

