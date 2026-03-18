import { ReactLesson } from "@/app/react/components/ReactLesson";
import { Callout } from "@/components/notes/Callout";
import { CodeBlock } from "@/components/code/CodeBlock";

export const metadata = { title: "Form Handling" };

export default function FormHandling() {
  return (
    <ReactLesson backHref="/react/day-2" title="7️⃣ Form Handling in React">
      <Callout variant="reactMini">
        <div className="text-sm text-[#2c3e50]">
          In controlled forms, inputs take their value from state and update
          state on change.
        </div>
      </Callout>

      <CodeBlock
        language="jsx"
        code={`import { useState } from "react";

export default function FeedbackForm() {
  const [comment, setComment] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    alert(comment);
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Your feedback..."
      />
      <button type="submit">Send</button>
    </form>
  );
}`}
      />
    </ReactLesson>
  );
}

