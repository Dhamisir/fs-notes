import { SqlLesson } from "@/app/sql/components/SqlLesson";
import { Callout } from "@/components/notes/Callout";
import { CodeBlock } from "@/components/code/CodeBlock";

export const metadata = { title: "LIKE" };

export default function Like() {
  return (
    <SqlLesson backHref="/sql/day-2" title="8️⃣ LIKE (Wildcard Search)">
      <Callout variant="sqlMini">
        <div className="text-sm text-[#2c3e50]">
          <code>LIKE</code> searches patterns in text columns.
          <div className="mt-2">
            <code>%</code> = any length, <code>_</code> = single character
          </div>
        </div>
      </Callout>

      <CodeBlock
        language="sql"
        code={`-- Starts with A
SELECT * FROM students WHERE name LIKE 'A%';

-- Ends with a
SELECT * FROM students WHERE name LIKE '%a';

-- Contains 'vi'
SELECT * FROM students WHERE name LIKE '%vi%';

-- Exactly 4 letters
SELECT * FROM students WHERE name LIKE '____';`}
      />
    </SqlLesson>
  );
}

