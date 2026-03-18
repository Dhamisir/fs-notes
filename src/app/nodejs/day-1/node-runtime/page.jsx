import { NodeLesson } from "@/app/nodejs/components/NodeLesson";
import { Callout } from "@/components/notes/Callout";
import { CodeBlock } from "@/components/code/CodeBlock";

export const metadata = { title: "Node Runtime" };

export default function NodeRuntime() {
  return (
    <NodeLesson backHref="/nodejs/day-1" title="⚙️ The Node.js Runtime">
      <p className="text-muted-foreground">
        Node.js is not a programming language — it’s a runtime environment that
        lets you execute JavaScript outside the browser.
      </p>

      <section>
        <h2 className="text-lg font-semibold text-[#2c3e50]">
          1. Checking Node version
        </h2>
        <CodeBlock language="bash" code={`node -v`} />
      </section>

      <section>
        <h2 className="text-lg font-semibold text-[#2c3e50]">
          2. Running your first file
        </h2>
        <Callout variant="nodeMini">
          <ol className="list-decimal pl-6 text-sm text-[#333]">
            <li>Create <code>index.js</code></li>
            <li>Write <code>console.log("Hello Node")</code></li>
            <li>Run: <code>node index.js</code></li>
          </ol>
        </Callout>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-[#2c3e50]">3. The global object</h2>
        <p className="mt-2 text-muted-foreground">
          Instead of <code>window</code>, Node has <code>global</code>.
        </p>
        <CodeBlock language="js" code={`console.log(global);`} />
      </section>
    </NodeLesson>
  );
}

