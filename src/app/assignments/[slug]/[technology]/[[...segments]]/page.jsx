import Link from "next/link";
import { notFound } from "next/navigation";
import AssignmentDetail from "@/app/assignments/AssignmentDetail";
import TopicList from "@/app/assignments/TopicList";
import { assignmentCatalog, getAssignmentPath, getTechnology, starterAssignments } from "@/app/assignments/data";
import { pageMetadata } from "@/lib/seo";

function resolveRoute(areaSlug, technologySlug, segments = []) {
  const entry = getTechnology(areaSlug, technologySlug);
  if (!entry || segments.length > 2) return null;
  const { area, technology } = entry;
  const topic = segments[0] ? technology.topics.find((item) => item.slug === segments[0]) : null;
  if (segments[0] && !topic) return null;
  const assignment = segments[1] ? starterAssignments.find((item) => item.slug === segments[1] && item.area === areaSlug && item.technology === technologySlug && item.topic === topic?.slug) : null;
  if (segments[1] && !assignment) return null;
  return { area, technology, topic, assignment };
}

export function generateStaticParams() {
  const paths = [];
  assignmentCatalog.forEach((area) => area.technologies.forEach((technology) => {
    paths.push({ slug: area.slug, technology: technology.slug, segments: [] });
    technology.topics.forEach((topic) => paths.push({ slug: area.slug, technology: technology.slug, segments: [topic.slug] }));
  }));
  starterAssignments.forEach((item) => paths.push({ slug: item.area, technology: item.technology, segments: [item.topic, item.slug] }));
  return paths;
}

export async function generateMetadata({ params }) {
  const { slug: area, technology, segments = [] } = await params;
  const route = resolveRoute(area, technology, segments);
  if (!route) return {};
  if (route.assignment) return pageMetadata({ title: `${route.assignment.title} — Coding Assignment`, description: route.assignment.description, path: getAssignmentPath(route.assignment) });
  return pageMetadata({ title: route.topic ? `${route.topic.title} Assignments` : `${route.technology.title} Assignments`, description: route.technology.description, path: route.topic ? `/assignments/${area}/${technology}/${route.topic.slug}` : `/assignments/${area}/${technology}` });
}

export default async function TechnologyRoutePage({ params }) {
  const { slug: areaSlug, technology: technologySlug, segments = [] } = await params;
  const route = resolveRoute(areaSlug, technologySlug, segments);
  if (!route) notFound();
  const { area, technology, topic, assignment } = route;
  if (assignment) return <AssignmentDetail assignment={assignment} area={area} technology={technology} topic={topic} />;
  const assignments = starterAssignments.filter((item) => item.area === area.slug && item.technology === technology.slug);
  return <div className="mx-auto flex max-w-3xl flex-col gap-8">
    <nav className="flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb"><Link href="/assignments" className="hover:text-foreground">Assignments</Link><span>/</span><span>{area.title}</span></nav>
    <div><p className="text-xs font-semibold uppercase tracking-wide text-[#8a9ba5]">{area.title}</p><h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#0174af]">{technology.title} Assignments</h1><p className="mt-2 text-sm text-muted-foreground">{technology.description} Select a topic to see its assignments.</p></div>
    <TopicList area={area} technology={technology} assignments={assignments} activeTopic={topic?.slug} />
  </div>;
}
