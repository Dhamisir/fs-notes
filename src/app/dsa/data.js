export const neetcodeReference = {
  label: "NeetCode Roadmap",
  url: "https://neetcode.io/roadmap",
};

export const module1Sections = [
  {
    id: "basics",
    title: "Module 1 — Basics",
    emoji: "📘",
    subtitle:
      "Build foundation: DSA intro, complexity, arrays, nested loops, 2D arrays, dry runs, and problem solving.",
    topics: [
      {
        slug: "introduction-to-dsa",
        topic: "Introduction to DSA",
        concepts: "What is DSA, interviews, problem-solving mindset",
        problems: "Sum of array, max element",
        goal: "Build confidence",
      },
      {
        slug: "time-complexity",
        topic: "Time Complexity",
        concepts: "Big-O, nested loops, O(N), O(log N)",
        problems: "Linear search, count operations",
        goal: "Understand optimization",
      },
      {
        slug: "space-complexity",
        topic: "Space Complexity",
        concepts: "Auxiliary space, O(1), O(N), input vs extra memory",
        problems: "Temp array, frequency map, recursion stack",
        goal: "Understand memory usage",
      },
      {
        slug: "arrays-basics",
        topic: "Arrays Basics",
        concepts: "Traversal, insert/delete, frequency",
        problems: "Largest/smallest element",
        goal: "Array fundamentals",
      },
      {
        slug: "nested-loops-on-arrays",
        topic: "Nested Loops on Arrays",
        concepts: "Pair/triplet iteration, brute force, O(n²) complexity",
        problems: "Print all pairs, find duplicate, two-sum brute force",
        goal: "Understand when nested loops are needed",
      },
      {
        slug: "2d-arrays",
        topic: "2D Arrays (Matrices)",
        concepts: "Rows/columns, matrix traversal, nested indexing",
        problems: "Sum of matrix, search element in matrix",
        goal: "2D array confidence",
      },
      {
        slug: "dry-run-skills",
        topic: "Dry Run Skills",
        concepts: "Variable tracking, visualization",
        problems: "Reverse array, rotate array",
        goal: "Thinking ability",
      },
      {
        slug: "problem-solving-intro",
        topic: "Problem Solving Intro",
        concepts: "Brute force vs optimized",
        problems: "Two Sum",
        goal: "Pattern awareness",
      },
      {
        slug: "practice-session",
        topic: "Practice Session",
        concepts: "Guided solving",
        problems: "Easy array questions",
        goal: "Independent solving",
      },
      {
        slug: "weekly-revision-contest",
        topic: "Weekly Revision + Contest",
        concepts: "Revision + mini contest",
        problems: "5 easy problems",
        goal: "Confidence boost",
      },
    ],
  },
  {
    id: "patterns",
    title: "Module 2 — Two Pointer + Sliding Window + Hashing",
    emoji: "📗",
    subtitle:
      "Core interview patterns: start with brute-force nested loops, then optimize with hashing, two pointers, sliding window, prefix sum, and binary search.",
    layout: "cards",
    topics: [
      {
        slug: "phase-1-nested-loop-thinking",
        topic: "📘 Phase 1 – Nested Loop Thinking (Brute Force)",
        concepts: "Pair, frequency, subarray, and array manipulation problems solved with brute-force thinking.",
        problems: "A–D question groups",
        goal: "Build brute-force problem-solving confidence",
      },
      {
        slug: "phase-2-optimization",
        topic: "📘 Phase 2 – Optimization",
        concepts: "Optimize the same ideas using hashing, two pointers, sliding window, prefix sum, and binary search.",
        problems: "Pattern 1–5 question groups",
        goal: "Convert brute-force solutions into efficient patterns",
      },
    ],
  },
];
