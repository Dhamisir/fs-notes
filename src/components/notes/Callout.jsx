"use client";

import { cn } from "@/lib/utils";

const variantStyles = {
  intro: "bg-[#fff8e1] border-l-[#ffc107]",
  problem: "bg-[#ffebee] border-l-[#f44336]",
  solution: "bg-[#e8f5e9] border-l-[#4caf50]",
  jsIntro: "bg-[#fff9db] border-l-[#f1c40f]",
  jsExample: "bg-[#fff9db] border-l-[#f1c40f]",
  jsAssignment: "bg-[#e8f5e9] border-l-[#4caf50]",
  jsInfo: "bg-[#e3f2fd] border-l-[#2196f3]",
  sqlIntro: "bg-[#eef7ff] border-l-[#007acc]",
  sqlMini: "bg-[#f7fcff] border-l-[#35baf6]",
  sqlExample: "bg-[#f5fff5] border-l-[#27ae60]",
  sqlPractice: "bg-[#fff8e1] border-l-[#ffc107]",
  sqlHighlight: "bg-[#e8f4fd] border-l-[#3498db]",
  reactIntro: "bg-[#fff8e1] border-l-[#ffc107]",
  reactMini: "bg-[#f7fcff] border-l-[#35baf6]",
  reactExample: "bg-[#f5fff5] border-l-[#27ae60]",
  reactPractice: "bg-[#fff8e1] border-l-[#ffc107]",
  reactInfo: "bg-[#e3f2fd] border-l-[#61dafb]",
  reduxIntro: "bg-[#f3e5f5] border-l-[#ab47bc]",
  reduxMini: "bg-[#f7fcff] border-l-[#764abc]",
  reduxExample: "bg-[#e3f2fd] border-l-[#2196f3]",
  reduxProblem: "bg-[#ffebee] border-l-[#f44336]",
  reduxSuccess: "bg-[#e8f5e9] border-l-[#4caf50]",
  nodeIntro: "bg-[#f1f8f1] border-l-[#68a063]",
  nodeMini: "bg-[#f1f8f1] border-l-[#68a063]",
  nodeExample: "bg-[#eef7ff] border-l-[#007acc]",
  nodeAssignment: "bg-[#e8f5e9] border-l-[#4caf50]",
  projectOverview: "bg-[#f7fcff] border-l-[#35baf6]",
  projectFrontend: "bg-[#e3f2fd] border-l-[#1976d2]",
  projectBackend: "bg-[#e8f5e9] border-l-[#388e3c]",
  projectIntegrate: "bg-[#fff3e0] border-l-[#ff9800]",
  projectCrud: "bg-[#fff8e1] border-l-[#ffc107]",
};

export function Callout({ variant = "intro", className, children }) {
  return (
    <div
      className={cn(
        "rounded-md border-l-4 px-5 py-4",
        variantStyles[variant] ?? variantStyles.intro,
        className
      )}
    >
      {children}
    </div>
  );
}

