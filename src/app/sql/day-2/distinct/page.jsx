import { SqlLesson } from "@/app/sql/components/SqlLesson";
import { Callout } from "@/components/notes/Callout";
import { CodeBlock } from "@/components/code/CodeBlock";

export const metadata = { title: "DISTINCT" };

export default function Distinct() {
  return (
    <SqlLesson backHref="/sql/day-2" title="6️⃣ DISTINCT">
      <Callout variant="sqlMini">
        <div className="text-sm text-[#2c3e50]">
          <code>DISTINCT</code> removes duplicate rows from the selected columns.
        </div>
      </Callout>

      <CodeBlock
        language="sql"
        code={`-- Unique cities
SELECT DISTINCT city FROM students;

-- Unique status values
SELECT DISTINCT status FROM students;`}
      />
    </SqlLesson>
  );
}

