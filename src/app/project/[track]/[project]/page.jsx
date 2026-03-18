import Link from "next/link";
import { notFound } from "next/navigation";
import { projectTracks } from "@/app/project/data";
import { Callout } from "@/components/notes/Callout";
import { CodeBlock } from "@/components/code/CodeBlock";

const content = {
  frontend: {
    "project-management-app": {
      title: "🥇 Frontend BRD: Task / Project Management App",
      overview: [
        "Level: Beginner. Build first; use mock data or local state; no backend yet.",
        "What you build: Register/Login UI, dashboard (projects), create/edit/delete project, project detail (tasks), add/edit/delete task, update status (To Do / In Progress / Done).",
      ],
      features: [
        "Register / Login (UI + form validation)",
        "Dashboard: list projects",
        "Create / edit / delete project",
        "Project detail: list tasks",
        "Add / edit / delete task; update task status (To Do, In Progress, Done)",
        "Clean UI with Tailwind; responsive layout",
      ],
      tech: "React + Tailwind CSS. Extras: form validation, pagination (optional).",
      crud: [
        "Create: Add project, add task",
        "Read: View projects & tasks",
        "Update: Edit task title/status",
        "Delete: Remove task/project",
      ],
      resume:
        "Built a full-stack Project Management application with React, Node.js, Express, and MongoDB featuring JWT authentication and complete CRUD operations.",
      next: { track: "fullstack", slug: "project-management-app", label: "Fullstack: Integrate frontend + backend" },
    },
    "expense-tracker": {
      title: "🥈 Frontend BRD: Expense Tracker",
      overview: [
        "Level: Beginner → Intermediate. UI-first with mock data/local state.",
        "What you build: Add income/expense, categories, filters, totals, charts (optional).",
      ],
      features: [
        "Add income/expense (form validation)",
        "List transactions with filters (date/category/type)",
        "Summary totals (today/week/month)",
        "Charts (optional)",
        "Responsive UI with Tailwind",
      ],
      tech: "React + Tailwind. Extras: charts library (optional).",
      crud: [
        "Create: Add transaction",
        "Read: View transactions",
        "Update: Edit transaction",
        "Delete: Remove transaction",
      ],
      resume:
        "Built an Expense Tracker UI with React and Tailwind featuring transaction CRUD, filters, and analytics-ready structure.",
      next: { track: "fullstack", slug: "expense-tracker", label: "Fullstack: Integrate frontend + backend" },
    },
    "admin-dashboard": {
      title: "🥉 Frontend BRD: User Management / Admin Dashboard",
      overview: [
        "Level: Beginner → Intermediate. UI-first admin dashboard.",
        "What you build: user list, search/filter, user details, role/status UI, tables and pagination (optional).",
      ],
      features: [
        "Dashboard layout + sidebar",
        "Users table (search/filter/sort)",
        "User detail view",
        "Role/status UI controls",
        "Pagination (optional)",
      ],
      tech: "React + Tailwind.",
      crud: [
        "Create: Add user (optional UI)",
        "Read: View users",
        "Update: Edit user role/status",
        "Delete: Remove user (optional UI)",
      ],
      resume:
        "Built an Admin Dashboard UI with React and Tailwind including tables, filters, and role/status controls.",
      next: { track: "fullstack", slug: "admin-dashboard", label: "Fullstack: Integrate frontend + backend" },
    },
  },
  backend: {
    "project-management-app": {
      title: "🥇 Backend BRD: Task / Project Management App",
      overview: [
        "Level: Beginner. Build APIs only; test with Postman/Thunder Client.",
        "What you build: Auth (register, login → JWT). Projects CRUD. Tasks CRUD under a project with status (To Do / In Progress / Done). Protect routes with JWT.",
      ],
      features: [
        "Auth: register, login → JWT",
        "Projects: CRUD",
        "Tasks: CRUD under a project + status field",
        "Protect routes with JWT middleware",
      ],
      tech: "Node.js + Express. Database: MongoDB or PostgreSQL. Auth: JWT (basic).",
      crud: [
        "Create: Add project, add task",
        "Read: View projects & tasks",
        "Update: Edit task title/status",
        "Delete: Remove task/project",
      ],
      resume:
        "Built a full-stack Project Management application with React, Node.js, Express, and MongoDB featuring JWT authentication and complete CRUD operations.",
      next: { track: "fullstack", slug: "project-management-app", label: "Fullstack: Integrate frontend + backend" },
    },
    "expense-tracker": {
      title: "🥈 Backend BRD: Expense Tracker",
      overview: [
        "Level: Beginner → Intermediate. APIs only; test using Postman.",
        "What you build: Auth + transaction CRUD + categories + summaries.",
      ],
      features: [
        "Auth (JWT)",
        "Transaction CRUD",
        "Category CRUD (optional)",
        "Summary endpoints (totals by range/category)",
      ],
      tech: "Node.js + Express + PostgreSQL (or MongoDB) + JWT.",
      crud: [
        "Create: Add transaction",
        "Read: List transactions",
        "Update: Edit transaction",
        "Delete: Remove transaction",
      ],
      resume:
        "Built an Expense Tracker API with Node.js/Express featuring JWT auth, transaction CRUD, and reporting endpoints.",
      next: { track: "fullstack", slug: "expense-tracker", label: "Fullstack: Integrate frontend + backend" },
    },
    "admin-dashboard": {
      title: "🥉 Backend BRD: User Management / Admin Dashboard",
      overview: [
        "Level: Intermediate. APIs for admin user management with auth + roles.",
        "What you build: user CRUD, login, RBAC, audit-friendly endpoints.",
      ],
      features: [
        "Auth (JWT)",
        "User CRUD",
        "Roles/permissions (RBAC)",
        "Admin-only routes + middleware",
      ],
      tech: "Node.js + Express + PostgreSQL + JWT + RBAC.",
      crud: [
        "Create: Add user",
        "Read: List users",
        "Update: Edit role/status",
        "Delete: Remove user",
      ],
      resume:
        "Built an Admin API with Node.js/Express including JWT auth, RBAC, and user management CRUD.",
      next: { track: "fullstack", slug: "admin-dashboard", label: "Fullstack: Integrate frontend + backend" },
    },
  },
  fullstack: {
    "project-management-app": {
      title: "🥇 Fullstack BRD: Task / Project Management App",
      overview: [
        "Level: Beginner. Stack: React + Tailwind | Node.js + Express | MongoDB or PostgreSQL | JWT.",
        "Flow: Register/Login → Projects → Tasks → Status updates → Delete. Full CRUD + auth.",
      ],
      steps: {
        backend: [
          "Express app; DB connection (MongoDB or PostgreSQL).",
          "User model: email, password (hashed), name. Auth: register, login → JWT.",
          "Project model: name, description, userId. CRUD; protect with JWT.",
          "Task model: title, status, projectId. CRUD; protect with JWT.",
          "Test all routes with Postman/Thunder Client.",
        ],
        frontend: [
          "React + Tailwind app; routing (React Router).",
          "Auth pages; store JWT (localStorage); auth context.",
          "Dashboard: list projects; create/edit/delete project.",
          "Project detail: list tasks; add/edit/delete; status dropdown.",
        ],
        integrate: [
          "Frontend base URL → backend API (e.g. http://localhost:5000/api).",
          "Send JWT in Authorization header.",
          "Handle 401 → redirect to login.",
        ],
      },
      resume:
        "Built a full-stack Project Management application with React, Node.js, Express, and MongoDB featuring JWT authentication and complete CRUD operations.",
    },
    "expense-tracker": {
      title: "🥈 Fullstack BRD: Expense Tracker",
      overview: [
        "Integrated build: backend → frontend → connect the flow.",
      ],
      steps: {
        backend: ["Auth (JWT), transaction CRUD, reporting endpoints."],
        frontend: ["UI for adding/listing/filtering transactions + totals."],
        integrate: ["Connect UI to APIs; protect private routes."],
      },
      resume:
        "Built a full-stack Expense Tracker with auth, transaction CRUD, and analytics-ready reporting.",
    },
    "admin-dashboard": {
      title: "🥉 Fullstack BRD: User Management / Admin Dashboard",
      overview: ["Integrated build with auth + RBAC and admin UI."],
      steps: {
        backend: ["JWT auth, RBAC middleware, user CRUD APIs."],
        frontend: ["Admin UI dashboard: tables, filters, role/status controls."],
        integrate: ["Admin-only routes + secure API calls with JWT."],
      },
      resume:
        "Built a full-stack Admin Dashboard with secure RBAC backend and a responsive React admin UI.",
    },
  },
};

export default async function ProjectPage({ params }) {
  const resolvedParams = params && typeof params.then === "function" ? await params : params;
  const rawTrack = Array.isArray(resolvedParams?.track)
    ? resolvedParams.track[0]
    : resolvedParams?.track;
  const rawProj = Array.isArray(resolvedParams?.project)
    ? resolvedParams.project[0]
    : resolvedParams?.project;

  const track = decodeURIComponent(String(rawTrack ?? "")).toLowerCase().trim();
  const proj = decodeURIComponent(String(rawProj ?? "")).toLowerCase().trim();
  const data = content?.[track]?.[proj];
  if (!data) return notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href={`/project/${track}`}
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← Back to {track}
      </Link>

      <div className="mt-4 flex flex-col gap-6 rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight text-[#0174af]">
          {data.title}
        </h1>

        {"overview" in data ? (
          <Callout variant="projectOverview">
            <h2 className="text-lg font-semibold text-[#195568]">Overview</h2>
            <ul className="mt-2 list-disc pl-6 text-sm text-[#2c3e50]">
              {data.overview.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </Callout>
        ) : null}

        {"features" in data ? (
          <Callout
            variant={
              track === "frontend"
                ? "projectFrontend"
                : track === "backend"
                  ? "projectBackend"
                  : "projectIntegrate"
            }
          >
            <h2 className="text-lg font-semibold text-[#195568]">
              {track === "backend" ? "API & data" : "Pages & features"}
            </h2>
            <ul className="mt-2 list-disc pl-6 text-sm text-[#2c3e50]">
              {data.features.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            {"tech" in data ? (
              <div className="mt-3 rounded-md bg-[#f4f4f6] px-3 py-2 text-sm text-[#2c3e50]">
                <b>Tech:</b> {data.tech}
              </div>
            ) : null}
          </Callout>
        ) : null}

        {"crud" in data ? (
          <Callout variant="projectCrud">
            <h2 className="text-lg font-semibold text-[#195568]">CRUD covered</h2>
            <ul className="mt-2 list-disc pl-6 text-sm text-[#2c3e50]">
              {data.crud.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </Callout>
        ) : null}

        {"steps" in data ? (
          <>
            <h2 className="text-lg font-semibold text-[#195568]">
              Fullstack build order (single flow)
            </h2>

            <Callout variant="projectBackend">
              <h3 className="text-base font-semibold">Step 1 – Backend</h3>
              <ol className="mt-2 list-decimal pl-6 text-sm text-[#2c3e50]">
                {data.steps.backend.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ol>
            </Callout>

            <Callout variant="projectFrontend">
              <h3 className="text-base font-semibold">Step 2 – Frontend</h3>
              <ol className="mt-2 list-decimal pl-6 text-sm text-[#2c3e50]">
                {data.steps.frontend.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ol>
            </Callout>

            <Callout variant="projectIntegrate">
              <h3 className="text-base font-semibold">Step 3 – Integration</h3>
              <ul className="mt-2 list-disc pl-6 text-sm text-[#2c3e50]">
                {data.steps.integrate.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              {data.steps.integrate.some((s) => s.includes("http://")) ? (
                <div className="mt-3">
                  <CodeBlock
                    language="plaintext"
                    code={`Example base URL: http://localhost:5000/api`}
                  />
                </div>
              ) : null}
            </Callout>
          </>
        ) : null}

        <p className="text-sm text-muted-foreground">
          <b>Resume line:</b> <em>{data.resume}</em>
        </p>

        {"next" in data ? (
          <Link
            href={`/project/${data.next.track}/${data.next.slug}`}
            className="inline-flex w-fit rounded-lg bg-[#4caf50] px-4 py-3 text-sm font-semibold text-white hover:bg-[#388e3c]"
          >
            ➡️ {data.next.label}
          </Link>
        ) : null}
      </div>
    </div>
  );
}

