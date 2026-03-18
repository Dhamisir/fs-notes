import { reactDays } from "@/app/react/data";
import { DayIndex } from "@/components/notes/DayIndex";

export default function ReactDay1() {
  const day = reactDays.find((d) => d.slug === "day-1");
  return <DayIndex day={day} baseHref="/react" baseLabel="React" />;
}

