import { nodeDays } from "@/app/nodejs/data";
import { DayIndex } from "@/components/notes/DayIndex";

export default function NodeDay2() {
  const day = nodeDays.find((d) => d.slug === "day-2");
  return <DayIndex day={day} baseHref="/nodejs" baseLabel="Node.js" />;
}

