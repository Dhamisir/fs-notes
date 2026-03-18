import { sqlDays } from "@/app/sql/data";
import { DayIndex } from "@/components/notes/DayIndex";

export default function SqlDay2() {
  const day = sqlDays.find((d) => d.slug === "day-2");
  return <DayIndex day={day} baseHref="/sql" baseLabel="SQL" />;
}

