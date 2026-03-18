import { jsDays } from "@/app/javascript/data";
import { DayIndex } from "@/components/notes/DayIndex";

export default function JsDay3() {
  const day = jsDays.find((d) => d.slug === "day-3");
  return <DayIndex day={day} baseHref="/javascript" baseLabel="JavaScript" />;
}

