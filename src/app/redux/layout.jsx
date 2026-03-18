import Link from "next/link";

export default function ReduxLayout({ children }) {
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
          <Link
            href="/redux"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Redux
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}

