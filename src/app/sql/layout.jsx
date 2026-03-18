import Link from "next/link";

export default function SqlLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f9fbfc]">
      <header className="border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center gap-4 px-6 py-4">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Home
          </Link>
          <Link href="/sql" className="text-sm text-muted-foreground hover:text-foreground">
            SQL
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}

