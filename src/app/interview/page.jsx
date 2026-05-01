"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { RefreshCw } from "lucide-react";
import { fetchMocks } from "@/utils/api";

function getInterviewId(url) {
  if (!url || typeof url !== "string") return "";
  const trimmedUrl = url.trim().replace(/\/+$/, "");
  const parts = trimmedUrl.split("/");
  return parts[parts.length - 1] ?? "";
}

export default function InterviewPage() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadMocks(forceRefresh = false) {
    setIsLoading(true);
    setError("");

    try {
      const data = await fetchMocks(
        forceRefresh ? { refreshKey: Date.now() } : {},
      );
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.message || "Failed to load mocks");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let isMounted = true;
    if (isMounted) loadMocks();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <Link
        href="/"
        className="mb-4 inline-flex w-fit text-sm text-muted-foreground hover:text-foreground sm:mb-5"
      >
        ← Back
      </Link>

      <div className="mb-6 flex flex-col gap-2 sm:mb-8">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold tracking-tight text-[#2c3e50] sm:text-3xl">
            Interview Mocks
          </h1>
          <button
            type="button"
            onClick={() => loadMocks(true)}
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm text-muted-foreground transition hover:text-foreground disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="Refresh interview mocks"
            title="Refresh interview mocks"
          >
            <RefreshCw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              aria-hidden="true"
            />
            Refresh
          </button>
        </div>
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          Choose a mock to open the interview page.
        </p>
      </div>

      {isLoading ? (
        <div className="rounded-xl border bg-card p-5 text-sm text-muted-foreground shadow-sm">
          Loading mocks...
        </div>
      ) : null}

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {!isLoading && !error ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const id = getInterviewId(item?.url);
            const title = item?.name?.trim() || `Mock ${index + 1}`;
            const description = item?.description?.trim();
            const categories = Array.isArray(item?.category) ? item.category : [];
            if (!id) return null;

            return (
              <Link
                key={`${id}-${index}`}
                href={`/interview/${id}`}
                className="group flex min-h-[132px] flex-col justify-between rounded-xl border bg-card p-5 text-card-foreground shadow-sm transition duration-150 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="pr-2 text-base font-semibold tracking-tight sm:text-lg">
                  {title}
                </div>
                {description ? (
                  <div className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {description}
                  </div>
                ) : null}
                {categories.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <span
                        key={`${id}-${cat}`}
                        className="rounded-full border px-2.5 py-1 text-xs capitalize text-muted-foreground"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                ) : null}
                <div className="mt-4 text-sm text-muted-foreground transition group-hover:text-foreground">
                  Open interview →
                </div>
              </Link>
            );
          })}
        </div>
      ) : null}

      {!isLoading && !error && items.length === 0 ? (
        <div className="rounded-xl border bg-card p-5 text-sm text-muted-foreground shadow-sm">
          No mocks found.
        </div>
      ) : null}
    </div>
  );
}