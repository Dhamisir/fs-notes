import { SqlLesson } from "@/app/sql/components/SqlLesson";
import { Callout } from "@/components/notes/Callout";
import { CodeBlock } from "@/components/code/CodeBlock";

export const metadata = { title: "JOINS" };

export default function Joins() {
  return (
    <SqlLesson backHref="/sql/day-2" title="🔟+1️⃣ JOINS (Combining Tables)">
      <Callout variant="sqlMini">
        <div className="text-sm text-[#195568]">
          <div className="font-semibold">📘 Definition</div>
          <div className="mt-1 text-[#2c3e50]">
            <strong>JOIN</strong> combines rows from two or more tables based on
            a related column.
          </div>
        </div>
      </Callout>

      <Callout variant="sqlMini">
        <div className="text-sm text-[#2c3e50]">
          <b>💡 Why use JOIN?</b>
          <div className="mt-3 rounded-md bg-[#fff8e1] px-4 py-3">
            <p>Our tables are related:</p>
            <ul className="mt-2 list-disc pl-6">
              <li>
                <strong>students</strong> table has student information
              </li>
              <li>
                <strong>enrollments</strong> table links students to courses
              </li>
              <li>
                <strong>courses</strong> table has course information
              </li>
            </ul>
            <p className="mt-2">JOIN helps us see all this together.</p>
          </div>
        </div>
      </Callout>

      <section>
        <Callout variant="sqlMini">
          <div className="text-sm text-[#2c3e50]">
            <b>1. INNER JOIN (most common)</b>
            <div className="mt-2 font-semibold text-[#195568]">👉 Meaning</div>
            <div className="mt-1">Returns only matching rows from both tables.</div>

            <Callout variant="sqlExample" className="mt-3">
              <div className="text-sm">
                <b>🧠 Example Code</b>
                <div className="mt-2">
                  <CodeBlock
                    language="sql"
                    code={`-- Show student names with their enrolled courses
SELECT s.name, c.course_name
FROM enrollments e
JOIN students s ON e.student_id = s.student_id
JOIN courses c ON e.course_id = c.course_id;`}
                  />
                </div>
              </div>
            </Callout>

            <div className="mt-3 rounded-md bg-[#fff8e1] px-4 py-3">
              <b>📝 Result:</b> Shows which student is enrolled in which course
              <br />
              <small>Only students who have enrollments</small>
            </div>
          </div>
        </Callout>
      </section>

      <section>
        <Callout variant="sqlMini">
          <div className="text-sm text-[#2c3e50]">
            <b>🔍 How JOIN works</b>
            <Callout variant="sqlExample" className="mt-3">
              <CodeBlock
                language="sql"
                code={`-- Step 1: Start with enrollments table
-- Step 2: JOIN students table using student_id
-- Step 3: JOIN courses table using course_id
-- Result: We get student name + course name together

SELECT 
  s.name AS student_name,
  c.course_name,
  e.enroll_date
FROM enrollments e
JOIN students s ON e.student_id = s.student_id
JOIN courses c ON e.course_id = c.course_id;`}
              />
            </Callout>
          </div>
        </Callout>
      </section>

      <section>
        <Callout variant="sqlMini">
          <div className="text-sm text-[#2c3e50]">
            <b>2. Simple two-table JOIN</b>
            <Callout variant="sqlExample" className="mt-3">
              <CodeBlock
                language="sql"
                code={`-- Students with their enrollment dates
SELECT s.name, e.enroll_date
FROM enrollments e
JOIN students s ON e.student_id = s.student_id;`}
              />
            </Callout>
          </div>
        </Callout>
      </section>

      <section>
        <Callout variant="sqlMini">
          <div className="text-sm text-[#2c3e50]">
            <b>3. JOIN with WHERE clause</b>
            <Callout variant="sqlExample" className="mt-3">
              <CodeBlock
                language="sql"
                code={`-- Active students and their courses
SELECT s.name, c.course_name
FROM enrollments e
JOIN students s ON e.student_id = s.student_id
JOIN courses c ON e.course_id = c.course_id
WHERE s.status = 'active';`}
              />
            </Callout>
          </div>
        </Callout>
      </section>

      <section>
        <Callout variant="sqlMini">
          <div className="text-sm text-[#2c3e50]">
            <b>4. JOIN with aggregate functions</b>
            <Callout variant="sqlExample" className="mt-3">
              <CodeBlock
                language="sql"
                code={`-- Count courses per student
SELECT s.name, COUNT(c.course_id) AS course_count
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
JOIN courses c ON e.course_id = c.course_id
GROUP BY s.name;`}
              />
            </Callout>
          </div>
        </Callout>
      </section>

      <section>
        <Callout variant="sqlMini">
          <div className="text-sm text-[#2c3e50]">
            <b>5. LEFT JOIN (optional)</b>
            <div className="mt-2 font-semibold text-[#195568]">👉 Meaning</div>
            <div className="mt-1">
              Returns all rows from left table, even if no match on right.
            </div>
            <Callout variant="sqlExample" className="mt-3">
              <CodeBlock
                language="sql"
                code={`-- Show ALL students, even if they have no enrollment
SELECT s.name, c.course_name
FROM students s
LEFT JOIN enrollments e ON s.student_id = e.student_id
LEFT JOIN courses c ON e.course_id = c.course_id;`}
              />
            </Callout>
            <div className="mt-3 rounded-md bg-[#fff8e1] px-4 py-3">
              <b>📝 Result:</b> Shows all students; course_name will be NULL if no enrollments.
            </div>
          </div>
        </Callout>
      </section>

      <section>
        <Callout variant="sqlMini">
          <div className="text-sm text-[#2c3e50]">
            <b>📊 JOIN types summary</b>
            <div className="mt-3 rounded-md bg-[#fff8e1] px-4 py-3">
              <ul className="list-disc pl-6">
                <li>
                  <strong>INNER JOIN</strong> (or JOIN): only matching rows
                </li>
                <li>
                  <strong>LEFT JOIN</strong>: all left + matches from right
                </li>
                <li>
                  <strong>RIGHT JOIN</strong>: all right + matches from left
                </li>
                <li>
                  <strong>FULL JOIN</strong>: all rows from both tables
                </li>
              </ul>
              <p className="mt-2 text-xs">
                For beginners: focus on INNER JOIN first.
              </p>
            </div>
          </div>
        </Callout>
      </section>
    </SqlLesson>
  );
}

