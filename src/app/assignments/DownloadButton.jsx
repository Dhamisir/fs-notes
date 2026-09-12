"use client";

export default function DownloadButton({
  href,
  assignmentTitle,
  assignmentNumber,
  className,
  children,
}) {
  function handleClick() {
    if (typeof window.gtag === "function") {
      window.gtag("event", "assignment_download", {
        assignment_title: assignmentTitle,
        assignment_number: assignmentNumber,
      });
    }
  }

  return (
    <a href={href} download onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
