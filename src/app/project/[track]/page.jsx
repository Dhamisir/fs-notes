import Link from "next/link";
import { notFound } from "next/navigation";
import { projectTracks } from "@/app/project/data";
import { Callout } from "@/components/notes/Callout";

export default async function TrackIndex({ params }) {
  const resolvedParams = params && typeof params.then === "function" ? await params : params;
  const rawTrack = Array.isArray(resolvedParams?.track)
    ? resolvedParams.track[0]
    : resolvedParams?.track;
  const trackSlug = decodeURIComponent(String(rawTrack ?? ""))
    .toLowerCase()
    .trim();

  const track = projectTracks.find((t) => t.slug === trackSlug);
  if (!track) return notFound();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <div>
        <Link
          href="/project"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to Project
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-[#0174af]">
          {track.title} BRDs
        </h1>
        <Callout variant={track.accent}>
          <p className="text-sm text-[#2c3e50]">{track.description}</p>
        </Callout>
      </div>

      <div className="grid gap-3">
        {track.items.map((p) => (
          <Link
            key={p.slug}
            href={`/project/${track.slug}/${p.slug}`}
            className="rounded-xl border bg-white p-4 text-[#195568] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="font-semibold">{p.title}</div>
            <div className="mt-1 text-sm text-muted-foreground">Open →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

