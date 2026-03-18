import { ReactLesson } from "@/app/react/components/ReactLesson";
import { Callout } from "@/components/notes/Callout";
import { CodeBlock } from "@/components/code/CodeBlock";

export const metadata = { title: "Dynamic Routes (useParams)" };

export default function DynamicRoutes() {
  return (
    <ReactLesson backHref="/react/day-2" title="4️⃣ Dynamic Routes (useParams)">
      <Callout variant="reactMini">
        <div className="text-sm text-[#2c3e50]">
          Dynamic routes let you read values from the URL like{" "}
          <code>/products/42</code>.
        </div>
      </Callout>

      <CodeBlock
        language="jsx"
        code={`import { Routes, Route, useParams } from "react-router-dom";

function ProductPage() {
  const { id } = useParams();
  return <h1>Product ID: {id}</h1>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/products/:id" element={<ProductPage />} />
    </Routes>
  );
}`}
      />
    </ReactLesson>
  );
}

