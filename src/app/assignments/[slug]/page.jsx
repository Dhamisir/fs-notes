import { notFound, permanentRedirect } from "next/navigation";
import { getAssignmentPath, starterAssignments } from "@/app/assignments/data";

export function generateStaticParams() {
  return starterAssignments.map((assignment) => ({ slug: assignment.slug }));
}

export default async function LegacyAssignmentPage({ params }) {
  const { slug } = await params;
  const assignment = starterAssignments.find((item) => item.slug === slug);
  if (!assignment) notFound();
  permanentRedirect(getAssignmentPath(assignment));
}
