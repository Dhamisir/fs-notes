import { ReactLesson } from "@/app/react/components/ReactLesson";
import { Callout } from "@/components/notes/Callout";

export const metadata = { title: "CSR vs SSR" };

export default function CsrVsSsr() {
  return (
    <ReactLesson backHref="/react/day-1" title="5️⃣ CSR vs SSR (Rendering)">
      <Callout variant="reactMini">
        <div className="text-sm text-[#2c3e50]">
          <strong>CSR</strong> renders UI in the browser using JavaScript.{" "}
          <strong>SSR</strong> renders HTML on the server first, then hydrates
          on the client.
        </div>
      </Callout>

      <div className="grid gap-4 sm:grid-cols-2">
        <Callout variant="reactPractice">
          <b>CSR (Client-Side Rendering)</b>
          <ul className="mt-2 list-disc pl-6 text-sm">
            <li>Fast after initial load</li>
            <li>More JS work on the client</li>
            <li>Initial blank screen can happen</li>
          </ul>
        </Callout>
        <Callout variant="reactPractice" className="border-l-[#35baf6]">
          <b>SSR (Server-Side Rendering)</b>
          <ul className="mt-2 list-disc pl-6 text-sm">
            <li>Faster first content</li>
            <li>Better SEO for content pages</li>
            <li>Server does initial render</li>
          </ul>
        </Callout>
      </div>
    </ReactLesson>
  );
}

