import { cssDays } from "@/app/css/data";
import { DayIndex } from "@/components/notes/DayIndex";

export default function CssDay1() {
  const day = cssDays.find((d) => d.slug === "day-1");
  return <DayIndex day={day} baseHref="/css" baseLabel="CSS" />;
}

