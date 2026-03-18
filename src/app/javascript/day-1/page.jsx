import { jsDays } from "@/app/javascript/data";
import { DayIndex } from "@/components/notes/DayIndex";

export default function JsDay1() {
  const day = jsDays.find((d) => d.slug === "day-1");
  return <DayIndex day={day} baseHref="/javascript" baseLabel="JavaScript" />;
}

