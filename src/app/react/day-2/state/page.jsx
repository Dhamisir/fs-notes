import { ReactLesson } from "@/app/react/components/ReactLesson";
import { Callout } from "@/components/notes/Callout";
import { CodeBlock } from "@/components/code/CodeBlock";

export const metadata = { title: "State (useState)" };

export default function State() {
  return (
    <ReactLesson backHref="/react/day-2" title="🧠 State: Component Memory">
      <Callout variant="reactInfo" className="border-l-[#03a9f4] bg-[#e1f5fe]">
        <h3 className="text-base font-semibold text-[#2c3e50]">What is state?</h3>
        <p className="mt-2 text-sm text-[#2c3e50]">
          State is data that lives inside a component and can change over time.
          When state changes, React automatically updates the UI.
        </p>
      </Callout>

      <section>
        <h2 className="text-lg font-semibold text-[#2c3e50]">
          🧩 The counter example
        </h2>
        <p className="mt-2 text-muted-foreground">
          We use the <code>useState</code> hook to create state variables.
        </p>
        <CodeBlock
          language="jsx"
          code={`import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Current Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}`}
        />
      </section>

      <section>
        <h3 className="text-base font-semibold text-[#2c3e50]">
          🔍 Breaking it down
        </h3>
        <ul className="mt-2 list-disc pl-6 text-muted-foreground">
          <li>
            <code>count</code>: current value (starts at 0)
          </li>
          <li>
            <code>setCount</code>: function used to update value
          </li>
          <li>
            <code>useState(0)</code>: initial value is 0
          </li>
        </ul>
      </section>

      <Callout
        variant="problem"
        className="border-l-[#f44336] bg-[#ffebee]"
      >
        <h3 className="text-base font-semibold text-[#2c3e50]">
          ❌ Never update state directly
        </h3>
        <p className="mt-2 text-sm text-[#2c3e50]">
          Don’t do: <code>count = count + 1;</code>
        </p>
        <p className="mt-1 text-sm text-[#2c3e50]">
          Always do: <code>setCount(count + 1);</code>
        </p>
        <p className="mt-2 text-sm text-[#2c3e50]">
          React only knows it should re-render when you call the setter function.
        </p>
      </Callout>

      <section>
        <h2 className="text-lg font-semibold text-[#2c3e50]">🔍 Props vs State</h2>
        <div className="mt-3 overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-3 py-2 text-left">Feature</th>
                <th className="px-3 py-2 text-left">Props 📦</th>
                <th className="px-3 py-2 text-left">State 🧠</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Source", "Passed from parent", "Created inside component"],
                ["Mutable?", "Read-only", "Can be updated"],
                ["Purpose", "Configure component", "Store changing data"],
              ].map((row) => (
                <tr key={row[0]} className="border-t">
                  {row.map((cell) => (
                    <td key={cell} className="px-3 py-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </ReactLesson>
  );
}

