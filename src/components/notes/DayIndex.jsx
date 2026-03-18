import Link from "next/link";

export function DayIndex({ day, baseHref = "/css", baseLabel = "CSS" }) {
  if (!day) {
    return (
      <div className="mx-auto max-w-3xl rounded-xl border bg-card p-5 text-card-foreground">
        <div className="text-lg font-semibold">Day not found</div>
        <p className="mt-2 text-sm text-muted-foreground">
          This day is missing from its data file.
        </p>
        <Link href={baseHref} className="mt-4 inline-block text-sm underline">
          Back to {baseLabel}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <div>
        <Link
          href={baseHref}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to {baseLabel}
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-[#2c3e50]">
          {day.title}
        </h1>
        <p className="text-muted-foreground">{day.description}</p>
      </div>

      <div className="grid gap-3">
        {day.lessons.map((lesson, idx) => (
          <Link
            key={lesson.slug}
            href={`${baseHref}/${day.slug}/${lesson.slug}`}
            className="rounded-lg border bg-card px-4 py-3 text-card-foreground shadow-sm transition hover:shadow-md"
          >
            <div className="text-sm text-muted-foreground">Topic {idx + 1}</div>
            <div className="font-medium">{lesson.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

