import { ReactLesson } from "@/app/react/components/ReactLesson";
import { Callout } from "@/components/notes/Callout";

export const metadata = { title: "Virtual DOM" };

export default function VirtualDom() {
  return (
    <ReactLesson backHref="/react/day-1" title="3️⃣ Virtual DOM & Performance">
      <Callout variant="reactMini">
        <div className="text-sm text-[#2c3e50]">
          React keeps a lightweight “virtual” copy of the UI in memory. When
          state changes, React figures out the minimal DOM changes needed and
          updates efficiently.
        </div>
      </Callout>

      <section>
        <h2 className="text-lg font-semibold text-[#2c3e50]">Why it matters</h2>
        <ul className="mt-2 list-disc pl-6 text-muted-foreground">
          <li>Less direct DOM manipulation code</li>
          <li>Efficient updates (diffing)</li>
          <li>Predictable UI from state</li>
        </ul>
      </section>
    </ReactLesson>
  );
}

