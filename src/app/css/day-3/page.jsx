import { cssDays } from "@/app/css/data";
import { DayIndex } from "@/components/notes/DayIndex";

export default function CssDay3() {
  const day = cssDays.find((d) => d.slug === "day-3");
  return <DayIndex day={day} baseHref="/css" baseLabel="CSS" />;
}

