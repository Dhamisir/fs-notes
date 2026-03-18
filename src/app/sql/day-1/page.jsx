import { sqlDays } from "@/app/sql/data";
import { DayIndex } from "@/components/notes/DayIndex";

export default function SqlDay1() {
  const day = sqlDays.find((d) => d.slug === "day-1");
  return <DayIndex day={day} baseHref="/sql" baseLabel="SQL" />;
}

