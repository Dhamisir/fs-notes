import Link from "next/link";

export default function DsaLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-4 px-6 py-4">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Home
          </Link>
          <Link
            href="/dsa"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Interview Guide
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}
