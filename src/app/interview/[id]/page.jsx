export default async function InterviewDetailPage({ params }) {
  const resolvedParams =
    params && typeof params.then === "function" ? await params : params;
  const rawId = Array.isArray(resolvedParams?.id)
    ? resolvedParams.id[0]
    : resolvedParams?.id;
  const id = decodeURIComponent(String(rawId ?? "")).trim();
  const iframeSrc = `https://organized-wrench-096.notion.site/ebd/${id}`;

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src={iframeSrc}
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
}
