import { SqlLesson } from "@/app/sql/components/SqlLesson";
import { Callout } from "@/components/notes/Callout";
import { CodeBlock } from "@/components/code/CodeBlock";

export const metadata = { title: "Insert Data" };

export default function InsertData() {
  return (
    <SqlLesson backHref="/sql/day-1" title="➕ Part 5: Insert Data">
      <Callout variant="sqlMini">
        <div className="text-sm text-[#2c3e50]">
          Use <code>INSERT</code> to add new rows into a table.
        </div>
      </Callout>

      <section>
        <h2 className="text-lg font-semibold text-[#34495e]">Insert one row</h2>
        <CodeBlock
          language="sql"
          code={`INSERT INTO students (student_id, name, age, email, city, status)
VALUES (1, 'Amit', 20, 'amit@gmail.com', 'Delhi', 'active');`}
        />
      </section>

      <section>
        <h2 className="text-lg font-semibold text-[#34495e]">
          Insert multiple rows
        </h2>
        <CodeBlock
          language="sql"
          code={`INSERT INTO students (student_id, name, age, email, city, status) VALUES
(2, 'Neha', 22, 'neha@gmail.com', 'Mumbai', 'active'),
(3, 'Ravi', 19, 'ravi@gmail.com', 'Delhi', 'inactive');`}
        />
      </section>

      <Callout variant="sqlPractice">
        <div className="text-sm text-[#2c3e50]">
          <b>Tip:</b> Always specify column names in inserts — it prevents bugs
          when table structure changes.
        </div>
      </Callout>
    </SqlLesson>
  );
}

