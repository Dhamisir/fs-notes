import { ReactLesson } from "@/app/react/components/ReactLesson";
import { CodeBlock } from "@/components/code/CodeBlock";

export const metadata = { title: "React Day 2 Assignment" };

function Task({ badge, title, description, solution }) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-[#e74c3c] px-3 py-1 text-xs font-semibold text-white">
          {badge}
        </span>
        <div className="text-base font-semibold text-[#2c3e50]">{title}</div>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{description}</p>

      {solution ? (
        <details className="mt-4 rounded-lg bg-[#f0f7ff] p-3">
          <summary className="cursor-pointer font-semibold text-[#0066cc]">
            💡 View Solution
          </summary>
          <div className="mt-3 rounded-md border-l-4 border-[#0066cc] bg-white p-3">
            <CodeBlock language="jsx" code={solution} />
          </div>
        </details>
      ) : null}
    </div>
  );
}

export default function ReactDay2Assignment() {
  return (
    <ReactLesson backHref="/react/day-2" title="🎯 Day 2 Assignment: Adding Life to your App">
      <Task
        badge="Task 1"
        title="Simple Multi-page Navigation"
        description='Create 3 pages: Home, Projects, Contact. Implement navigation using "react-router-dom" without page reload.'
        solution={`import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/projects">Projects</Link> |{" "}
        <Link to="/contact">Contact</Link>
      </nav>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/projects" element={<h1>My Projects</h1>} />
        <Route path="/contact" element={<h1>Contact Me</h1>} />
      </Routes>
    </BrowserRouter>
  );
}`}
      />

      <Task
        badge="Task 2"
        title="Profile Props Challenge"
        description="Create a UserProfile component accepting name, age, city props, and render 5 users."
        solution={`function UserProfile({ name, age, city }) {
  return (
    <div style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
      <h2>Name: {name}</h2>
      <p>Age: {age}</p>
      <p>City: {city}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <UserProfile name="Rahul" age={25} city="Delhi" />
      <UserProfile name="Sanya" age={22} city="Mumbai" />
      {/* Add 3 more... */}
    </div>
  );
}`}
      />

      <Task
        badge="Task 3"
        title="The Toggle State"
        description='Create a "Dark Mode" toggle using useState. Toggle background + text between morning/night.'
        solution={`import { useState } from "react";

function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div
      style={{
        background: isDarkMode ? "black" : "white",
        color: isDarkMode ? "white" : "black",
        height: 200,
        padding: 20,
      }}
    >
      <h1>{isDarkMode ? "Good Night 🌙" : "Good Morning ☀️"}</h1>
      <button onClick={() => setIsDarkMode(!isDarkMode)}>
        Switch to {isDarkMode ? "Light" : "Dark"} Mode
      </button>
    </div>
  );
}`}
      />

      <Task
        badge="Task 4"
        title="The Feedback Form"
        description="Create a textarea + select rating (1-5). On submit, alert the feedback. Use preventDefault."
        solution={`import { useState } from "react";

function FeedbackForm() {
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState("5");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(\`Rating: \${rate}, Comment: \${comment}\`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      <select value={rate} onChange={(e) => setRate(e.target.value)}>
        <option value="1">1 Star</option>
        <option value="5">5 Stars</option>
      </select>
      <button type="submit">Send Feedback</button>
    </form>
  );
}`}
      />
    </ReactLesson>
  );
}

