import Link from "next/link";

export const metadata = { title: "DSA" };

export default function DsaPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-6 py-12 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
        DSA
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">
        Coming soon
      </h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Data structures and algorithms practice notes will be added here.
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
