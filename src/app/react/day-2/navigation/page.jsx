import { ReactLesson } from "@/app/react/components/ReactLesson";
import { Callout } from "@/components/notes/Callout";
import { CodeBlock } from "@/components/code/CodeBlock";

export const metadata = { title: "Navigation with Link" };

export default function Navigation() {
  return (
    <ReactLesson backHref="/react/day-2" title="3️⃣ Navigation with Link (No Reload)">
      <Callout variant="reactMini">
        <div className="text-sm text-[#2c3e50]">
          Use <code>{`<Link>`}</code> instead of <code>{`<a>`}</code> so navigation
          doesn’t reload the page.
        </div>
      </Callout>

      <CodeBlock
        language="jsx"
        code={`import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link> | <Link to="/projects">Projects</Link> |{" "}
      <Link to="/contact">Contact</Link>
    </nav>
  );
}`}
      />
    </ReactLesson>
  );
}

