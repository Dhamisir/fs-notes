import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { starterAssignments } from "@/app/assignments/data";
import DownloadButton from "@/app/assignments/DownloadButton";
import { pageMetadata } from "@/lib/seo";

function getAssignment(slug) {
  return starterAssignments.find((assignment) => assignment.slug === slug);
}

export function generateStaticParams() {
  return starterAssignments.map((assignment) => ({ slug: assignment.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const assignment = getAssignment(slug);
  if (!assignment) return {};

  return pageMetadata({
    title: `${assignment.title} — Coding Assignment`,
    description: assignment.description,
    path: `/assignments/${assignment.slug}`,
  });
}

const markdownComponents = {
  h1: (props) => (
    <h1 className="mt-8 text-2xl font-semibold text-[#0174af] first:mt-0" {...props} />
  ),
  h2: (props) => (
    <h2 className="mt-8 text-xl font-semibold text-[#195568]" {...props} />
  ),
  h3: (props) => (
    <h3 className="mt-6 text-base font-semibold text-[#195568]" {...props} />
  ),
  p: (props) => <p className="mt-3 text-sm leading-relaxed text-muted-foreground" {...props} />,
  ul: (props) => <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground" {...props} />,
  ol: (props) => <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-muted-foreground" {...props} />,
  li: (props) => <li className="marker:text-[#0174af]" {...props} />,
  a: (props) => <a className="font-medium text-[#0174af] underline" {...props} />,
  code: (props) => (
    <code className="rounded bg-[#e6f5fb] px-1.5 py-0.5 text-[0.85em] text-[#195568]" {...props} />
  ),
  pre: (props) => (
    <pre
      className="mt-3 overflow-x-auto rounded-lg bg-[#0b1220] p-4 text-sm text-white [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit"
      {...props}
    />
  ),
  input: (props) => <input className="mr-2 accent-[#0174af]" disabled {...props} />,
};

export default async function AssignmentDetailPage({ params }) {
  const { slug } = await params;
  const assignment = getAssignment(slug);
  if (!assignment) notFound();

  const readmePath = path.join(process.cwd(), "public", "advance", assignment.slug, "README.md");
  const readme = fs.readFileSync(readmePath, "utf8");

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <Link
        href="/assignments"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← All assignments
      </Link>

      <div className="flex flex-col gap-4 rounded-xl border bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#e6f5fb] text-sm font-bold text-[#0174af]">
            {assignment.number}
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-[#195568]">
              {assignment.title}
            </h1>
            <p className="mt-1 text-xs font-medium text-[#517481]">{assignment.stack}</p>
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#fff4e5] px-3 py-1 text-xs font-semibold text-[#9a5b13]">
              🎓 You&apos;ll learn: {assignment.learn}
            </p>
          </div>
        </div>

        <DownloadButton
          href={assignment.download}
          assignmentTitle={assignment.title}
          assignmentNumber={assignment.number}
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-[#0174af] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#005f91] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0174af] focus-visible:ring-offset-2"
        >
          Download ZIP ↓
        </DownloadButton>
      </div>

      <article className="rounded-xl border bg-white p-6 shadow-sm">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {readme}
        </ReactMarkdown>
      </article>
    </div>
  );
}
