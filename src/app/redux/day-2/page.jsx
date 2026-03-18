import { reduxDays } from "@/app/redux/data";
import { DayIndex } from "@/components/notes/DayIndex";

export default function ReduxDay2() {
  const day = reduxDays.find((d) => d.slug === "day-2");
  return <DayIndex day={day} baseHref="/redux" baseLabel="Redux" />;
}

