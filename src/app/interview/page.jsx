import Link from "next/link";

export const metadata = { title: "Interview" };

export default function InterviewPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-6 py-12 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
        Interview
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">
        Coming soon
      </h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Interview preparation notes and practice questions will be added here.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg border bg-card px-4 py-2 text-sm font-medium text-card-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        ← Home
      </Link>
    </main>
  );
}
