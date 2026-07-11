export const topicContentBySlug = {
  "introduction-to-dsa": {
    opener: [
      "Welcome everyone! Before we start coding, I want to ask one question.",
      "Have you ever heard that DSA is difficult?",
      "How many of you are afraid of coding interviews?",
      "What is your goal—internship, placement, or a product company?",
    ],
    sections: [
      {
        title: "What is DSA?",
        body: "DSA stands for Data + Structure + Algorithms. It is the study of how data is organized (Data Structure) and how data is processed (Algorithm) efficiently.",
      },
      {
        title: "What is Data?",
        body: "Data is simply information — student name, age, marks, salary, product price, mobile number.",
        bullets: ["Name: Rahul", "Age: 22", "Marks: 85"],
      },
      {
        title: "What is a Data Structure?",
        quote: "Data Structure = How data is stored.",
        body: "A Data Structure is a way of organizing and storing data so it can be accessed and modified efficiently. Think of a library: if books are organized on shelves, finding one is easy.",
        bullets: [
          "Array — continuous collection of elements",
          "Linked List — connected nodes",
          "Stack — Last In First Out (LIFO)",
          "Queue — First In First Out (FIFO)",
          "Hash Map — key-value pairs",
          "Tree — hierarchical data",
          "Graph — connected relationships",
        ],
      },
      {
        title: "What is an Algorithm?",
        quote: "Algorithm = How we solve a problem.",
        body: "An Algorithm is a step-by-step procedure to solve a problem. Example: making tea — boil water → add tea leaves → add milk → add sugar → serve.",
        bullets: [
          "Find largest in array: take first as max → traverse → compare → update max → print",
        ],
      },
      {
        title: "Data Structure vs Algorithm",
        table: {
          headers: ["Data Structure", "Algorithm"],
          rows: [
            ["Organizes data", "Solves problems"],
            ["Focuses on storing data", "Focuses on processing data"],
            ["Example: Array", "Example: Binary Search"],
            ["Example: Stack", "Example: Merge Sort"],
          ],
        },
      },
      {
        title: "Kitchen Analogy",
        body: "Data Structure = kitchen shelves (organize utensils). Algorithm = recipe (how to cook). Without shelves, finding utensils is hard. Without a recipe, you don't know how to cook.",
      },
      {
        title: "Why DSA Matters",
        body: "10 names in a list — finding one is easy. 10 million names — how you search becomes very important. That's what DSA teaches: solving problems efficiently.",
      },
      {
        title: "Interview Quick Check",
        bullets: [
          "Is an Array a Data Structure or Algorithm? → Data Structure",
          "Is Binary Search a Data Structure or Algorithm? → Algorithm",
          "Which one stores data? → Data Structure",
          "Which one solves problems? → Algorithm",
        ],
      },
      {
        title: "Key Takeaways",
        bullets: [
          "Data is information.",
          "A Data Structure organizes and stores data.",
          "An Algorithm is a step-by-step procedure to solve a problem.",
          "Efficient software needs the right Data Structure and the right Algorithm.",
        ],
      },
    ],
  },
  "time-complexity": {
    links: [
      {
        label: "Time Complexity (TC)",
        description: "Open the detailed Notion notes for deeper understanding.",
        url: "https://anshu-fs-notes.notion.site/Time-Complexity-TC-39a4291ef87c801dafedfedc87e11741?pvs=74",
      },
    ],
    sections: [
      {
        title: "What is Time Complexity?",
        body: "Time Complexity measures how the number of operations grows as input size (N) increases. It does NOT measure actual seconds — different computers run at different speeds.",
      },
      {
        title: "Real-Life Example",
        body: "Finding a friend's name among 10 students vs 10,00,000 students. The larger the input, the more work the computer performs.",
      },
      {
        title: "Common Time Complexities",
        table: {
          headers: ["Complexity", "Meaning", "Example"],
          rows: [
            ["O(1)", "Constant Time", "Access first element"],
            ["O(log N)", "Logarithmic Time", "Binary Search"],
            ["O(N)", "Linear Time", "Array Traversal"],
            ["O(N log N)", "Linear Logarithmic", "Merge Sort"],
            ["O(N²)", "Quadratic", "Nested Loops"],
            ["O(2ⁿ)", "Exponential", "Recursive Backtracking"],
          ],
        },
      },
      {
        title: "O(1) Example",
        code: "int a = 10;\ncout << a;",
        body: "Operations run once regardless of input size. Time: O(1). Space: O(1).",
      },
      {
        title: "O(N) Example",
        code: "for(int i=0; i<n; i++) {\n  cout << arr[i];\n}",
        body: "Loop runs N times. Time: O(N). Space: O(1).",
      },
      {
        title: "O(N²) Example",
        code: "for(int i=0; i<n; i++) {\n  for(int j=0; j<n; j++) {\n    cout << i << j;\n  }\n}",
        body: "Outer loop N × inner loop N = N² operations. Time: O(N²). Space: O(1).",
      },
      {
        title: "O(log N) Example",
        body: "Binary Search removes half the search space each step: 100 → 50 → 25 → 12 → 6 → 3 → 1. Time: O(log N).",
      },
      {
        title: "What is Space Complexity?",
        body: "Extra memory used by an algorithm while solving a problem. Input memory is NOT counted — only extra memory.",
        bullets: [
          "int sum = 0 → O(1) space",
          "int temp[n] → O(N) extra space",
          "vector<int> ans with N pushes → O(N) space",
          "Input array arr[n] alone → O(1) extra space",
        ],
      },
      {
        title: "Complexity Summary",
        table: {
          headers: ["Code", "Time", "Space"],
          rows: [
            ["Print Variable", "O(1)", "O(1)"],
            ["Single Loop", "O(N)", "O(1)"],
            ["Nested Loop", "O(N²)", "O(1)"],
            ["Binary Search", "O(log N)", "O(1)"],
            ["Extra Array", "O(N)", "O(N)"],
          ],
        },
      },
      {
        title: "Homework",
        bullets: [
          "Q1: Single for loop printing i — find time & space",
          "Q2: Nested for loops — find time & space",
          "Q3: Sum array with one loop — find time & space",
          "Q4: vector<int> temp(n) — find space",
          "Q5: Binary search while loop — find time",
        ],
      },
    ],
  },
  "space-complexity": {
    links: [
      {
        label: "Space Complexity (SC)",
        description: "Open the detailed Notion notes for deeper understanding.",
        url: "https://anshu-fs-notes.notion.site/Space-Complexity-SC-39a4291ef87c80b1a88ed92e376d4938?pvs=74",
      },
    ],
    sections: [
      {
        title: "What is Space Complexity?",
        body: "Space Complexity measures how much extra memory an algorithm uses as input size (N) grows. It focuses on additional memory created by your solution.",
      },
      {
        title: "Input Space vs Auxiliary Space",
        bullets: [
          "Input space: memory already used to store the given input, like arr[n].",
          "Auxiliary space: extra memory your algorithm creates, like temp arrays, hash maps, or recursion stack.",
          "When we discuss Space Complexity in interviews, we usually focus on auxiliary space.",
        ],
      },
      {
        title: "Common Space Complexities",
        table: {
          headers: ["Complexity", "Meaning", "Example"],
          rows: [
            ["O(1)", "Constant extra memory", "Only variables like sum, max, count"],
            ["O(N)", "Extra memory grows with N", "Temporary array or frequency map"],
            ["O(N²)", "Extra grid or matrix", "DP table with N x N cells"],
            ["O(log N)", "Recursive stack grows by halves", "Binary search recursion"],
          ],
        },
      },
      {
        title: "O(1) Space Example",
        code: "int sum = 0;\nfor(int i = 0; i < n; i++) {\n  sum += arr[i];\n}",
        body: "Only one extra variable is used. Even if N grows, extra memory stays constant.",
      },
      {
        title: "O(N) Space Example",
        code: "vector<int> temp;\nfor(int i = 0; i < n; i++) {\n  temp.push_back(arr[i]);\n}",
        body: "The temp vector grows with the input size, so auxiliary space is O(N).",
      },
      {
        title: "Interview Quick Check",
        bullets: [
          "One variable for sum -> O(1) space",
          "Extra array of size N -> O(N) space",
          "Hash map storing frequencies of N values -> O(N) space",
          "Recursive function depth N -> O(N) stack space",
        ],
      },
      {
        title: "Key Takeaways",
        bullets: [
          "Time Complexity tells how fast operations grow.",
          "Space Complexity tells how extra memory grows.",
          "Always ask: did I create extra arrays, maps, sets, or recursive calls?",
        ],
      },
    ],
  },
  "arrays-basics": {
    sections: [
      {
        title: "What is an Array?",
        body: "An array is a collection of elements stored in continuous memory. Each element has an index starting from 0.",
        code: "Index:   0    1    2    3    4\nArray: [10] [20] [30] [40] [50]\n\narr[0] = 10\narr[2] = 30\narr[4] = 50",
      },
      {
        title: "Why Use Arrays?",
        bullets: [
          "Store multiple values of the same type",
          "Access any element in O(1) using index",
          "Foundation for most DSA problems",
        ],
      },
      {
        title: "Array Traversal",
        code: "for(int i = 0; i < n; i++) {\n  cout << arr[i];\n}",
        body: "Draw the flowchart before explaining code. Use ovals for start/end, rectangles for process, diamonds for conditions.",
      },
      {
        title: "Progressive Practice Sequence",
        bullets: [
          "Print all elements",
          "Print elements in reverse order",
          "Count the number of elements",
          "Print only even-index elements",
          "Print only odd-index elements",
          "Calculate the sum",
          "Find the maximum",
          "Find the minimum",
        ],
      },
    ],
  },
  "nested-loops-on-arrays": {
    sections: [
      {
        title: "When to Use Nested Loops",
        body: "Use nested loops when you need to compare or combine every element with every other element — brute force approach before optimization.",
      },
      {
        title: "O(N²) Pattern",
        code: "for(int i = 0; i < n; i++) {\n  for(int j = 0; j < n; j++) {\n    // pair work\n  }\n}",
        body: "Total operations = N × N. This is the baseline before two-pointer or hashing optimizations.",
      },
      {
        title: "Practice Problems",
        bullets: [
          "Print all pairs in an array",
          "Find duplicate element (brute force)",
          "Two Sum — check all pairs before using HashMap",
        ],
      },
    ],
  },
  "2d-arrays": {
    sections: [
      {
        title: "What is a 2D Array?",
        body: "A 2D array (matrix) stores data in rows and columns. Access with matrix[row][col].",
      },
      {
        title: "Traversal",
        code: "for(int i = 0; i < rows; i++) {\n  for(int j = 0; j < cols; j++) {\n    cout << matrix[i][j];\n  }\n}",
        body: "Row-wise traversal uses nested loops — connects to O(rows × cols) complexity.",
      },
      {
        title: "Practice Problems",
        bullets: [
          "Sum of all elements in a matrix",
          "Search for an element in a matrix",
          "Print boundary elements",
        ],
      },
    ],
  },
  "dry-run-skills": {
    sections: [
      {
        title: "Why Dry Run?",
        body: "Dry running means manually tracking variables step by step. It builds thinking ability before writing code.",
      },
      {
        title: "Example Dry Run Table",
        body: "arr = [5, 10, 15, 20], n = 4",
        table: {
          headers: ["Iteration", "i", "Condition", "Printed"],
          rows: [
            ["1", "0", "0 < 4 ✅", "5"],
            ["2", "1", "1 < 4 ✅", "10"],
            ["3", "2", "2 < 4 ✅", "15"],
            ["4", "3", "3 < 4 ✅", "20"],
            ["5", "4", "4 < 4 ❌", "End"],
          ],
        },
      },
      {
        title: "Practice Problems",
        bullets: [
          "Reverse array — dry run before coding",
          "Rotate array by one — track index shifts",
        ],
      },
    ],
  },
  "problem-solving-intro": {
    sections: [
      {
        title: "The 6-Step Flow",
        body: "Every problem in this course follows the same steps:",
        bullets: [
          "Problem",
          "Think",
          "Brute Force",
          "Optimize",
          "Code",
          "Dry Run",
          "Complexity Analysis",
        ],
      },
      {
        title: "7 Questions Before Coding",
        bullets: [
          "What is the input?",
          "What is the expected output?",
          "Can we solve it manually?",
          "What is the brute-force approach?",
          "Can we optimize it?",
          "Now let's write the code.",
          "What's the time and space complexity?",
        ],
      },
      {
        title: "Two Sum — Pattern Awareness",
        body: "Start with brute force (nested loops, O(N²)). Later in Module 2, optimize with HashMap to O(N).",
      },
    ],
  },
  "practice-session": {
    links: [
      {
        label: "Array Traversal",
        description: "Linear array traversal and foundational loop practice",
        url: "https://anshu-fs-notes.notion.site/Module-1-Array-Traversal-3914291ef87c8061824cdb1d9f28052f",
      },
      {
        label: "2D Array Traversal",
        description: "Row/column matrix traversal with nested loops",
        url: "https://anshu-fs-notes.notion.site/Module-1-2D-Array-Traversal-38d4291ef87c808bb143dc1a35be5002",
      },
      {
        label: "Searching",
        description: "Linear search and basic search patterns on arrays",
        url: "https://anshu-fs-notes.notion.site/Module-1-Searching-Part-1-3964291ef87c80d78abee8cae86a7672",
      },
      {
        label: "Array Manipulation",
        description: "Reverse, rotate, shift, and modify array elements",
        url: "https://anshu-fs-notes.notion.site/Module-1-Array-Manipulation-Part-1-3964291ef87c802ba551de4c37ffac87",
      },
      {
        label: "Frequency (Brute Force)",
        description: "Count occurrences using nested loops before hashing",
        url: "https://anshu-fs-notes.notion.site/Module-1-Frequency-Brute-Force-Part-1-3964291ef87c8014b484dfcad3041103",
      },
      {
        label: "Hashing",
        description: "Object, Map, and Set for frequency and lookup",
        url: "https://anshu-fs-notes.notion.site/Module-1-Hashing-Object-Map-Set-Part-1-3964291ef87c80c1ae2dc39610e80075",
      },
    ],
    sections: [
      {
        title: "Guided Solving",
        body: "Work through easy array questions with hints. Focus on applying the 7-question framework independently.",
      },
      {
        title: "Suggested Problems",
        bullets: [
          "Sum of array",
          "Find maximum and minimum",
          "Count even numbers",
          "Reverse array",
          "Find second largest",
        ],
      },
    ],
  },
  "weekly-revision-contest": {
    sections: [
      {
        title: "Revision Checklist",
        bullets: [
          "DSA vs Algorithm definitions",
          "O(1), O(N), O(N²), O(log N)",
          "Array traversal and indexing",
          "Nested loops and pairs",
          "Dry run any loop on paper",
          "Brute force vs optimized thinking",
        ],
      },
      {
        title: "Mini Contest",
        body: "Solve 5 easy problems in a timed session. Mix arrays, complexity analysis, and one brute-force pair problem.",
      },
    ],
  },
  "two-pointer-basics": {
    sections: [
      {
        title: "Two Pointer Basics",
        body: "Use left and right pointers moving toward each other or in the same direction to avoid nested loops.",
        bullets: ["Reverse string", "Check palindrome", "Goal: reduce O(N²) to O(N)"],
      },
    ],
  },
  "two-pointer-advanced": {
    sections: [
      {
        title: "Two Pointer Advanced",
        body: "Optimize pointer movement based on conditions — skip duplicates, maximize area, etc.",
        bullets: ["Remove duplicates from sorted array", "Container with most water"],
      },
    ],
  },
  "sliding-window-intro": {
    sections: [
      {
        title: "Fixed-Size Sliding Window",
        body: "Maintain a window of size K and slide it across the array. Add new element, remove oldest.",
        bullets: ["Maximum sum subarray of size K"],
      },
    ],
  },
  "sliding-window-advanced": {
    sections: [
      {
        title: "Variable-Size Sliding Window",
        body: "Expand and shrink the window based on conditions — classic for substring problems.",
        bullets: ["Longest substring without repeating characters"],
      },
    ],
  },
  "hashmap-basics": {
    sections: [
      {
        title: "HashMap Basics",
        body: "Use a hash map for O(1) average lookups — frequency counting and complement search.",
        bullets: ["Majority element", "Two Sum (optimized)"],
      },
    ],
  },
  "prefix-sum": {
    sections: [
      {
        title: "Prefix Sum",
        body: "Precompute running cumulative sums to answer range sum queries in O(1) after O(N) preprocessing.",
        bullets: ["Subarray sum equals K", "Range sum queries"],
      },
    ],
  },
  "revision-contest": {
    sections: [
      {
        title: "Module 2 Revision + Contest",
        body: "Mixed practice on two pointer, sliding window, hashing, and prefix sum patterns.",
        bullets: [
          "One two-pointer problem",
          "One fixed window problem",
          "One variable window problem",
          "One HashMap frequency problem",
          "One prefix sum problem",
        ],
      },
    ],
  },
};

export function getTopicContent(slug) {
  return topicContentBySlug[slug] ?? null;
}
