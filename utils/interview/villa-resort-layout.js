const villaResortLayout = {
  id: "villa-resort-layout",
  title: "Villa Resort Layout",
  name: "HTML & CSS Mock Assignment: Villa Resort Layout",
  assignmentName: "HTML & CSS Mock Assignment: Villa Resort Layout",
  category: "HTML/CSS",
  level: "Intermediate",
  duration: "4 Hours",
  image: "/interview/villa-resort-layout/preview.svg",
  previewImage: "/interview/villa-resort-layout/preview.svg",
  summary:
    "Build a responsive resort landing page with five sections using the required CSS layout methods.",
  description:
    "Create the Villa resort page using only HTML and pure CSS. The layout must include navbar, work, apartment, posts, and tags sections with the required layout methods.",
  stack: ["HTML", "CSS", "Responsive Design"],
  skills: ["HTML", "CSS", "Responsive"],
  facts: [
    { label: "Assignment", value: "Villa Resort Layout" },
    { label: "Allowed stack", value: "HTML + pure CSS" },
    { label: "Time limit", value: "4 Hours" },
  ],
  highlights: [
    "Hero/navbar section with background image and positioning",
    "Work gallery built with CSS Grid",
    "Apartment cards built with Flexbox",
    "Posts section built with CSS Grid",
    "Tags section built with Flexbox",
  ],
  instructions: [
    "Read the entire question carefully before writing code.",
    "Use only HTML and CSS to solve this question.",
    "Use pure CSS; do not use any external libraries.",
    "Do not build sections by taking screenshots and placing them as images.",
    "Commit your code regularly with proper commit messages.",
  ],
  problemStatement:
    "Build the Villa resort layout using the exact section methods described below. Images do not need to match exactly; placeholder or random images are allowed.",
  sections: [
    {
      name: "Navbar section",
      method: "Background image and positions",
      responsive: "Large screen default, medium and small screens adapt hero layout.",
    },
    {
      name: "Work section",
      method: "Grid method",
      responsive: "Gallery changes layout across large, medium, and small screens.",
    },
    {
      name: "Apartment section",
      method: "Flex method",
      responsive: "Large screen default, medium screen 2 cards per row, small screen 1 card per row.",
    },
    {
      name: "Posts section",
      method: "Grid method",
      responsive: "Posts and about content should rearrange cleanly on smaller screens.",
    },
    {
      name: "Tags section",
      method: "Flex method",
      responsive: "Tags wrap naturally across large, medium, and small screens.",
    },
  ],
  responsive: [
    {
      screen: "Large",
      expectation: "Match the default desktop layout with all five sections.",
    },
    {
      screen: "Medium",
      expectation: "Reflow work, apartment, posts, and tags sections as shown.",
    },
    {
      screen: "Small",
      expectation: "Use a single-column friendly layout with responsive spacing.",
    },
  ],
  submission: [
    "Submit deployed link and GitHub link of the code.",
    "Push your code into masai-repo.",
    "Double-check that the deployed version works.",
  ],
  rubrics: [
    "Pixel perfect UI",
    "CSS correctness",
    "Responsiveness",
    "Code cleanliness",
    "Git hygiene",
  ],
};

export default villaResortLayout;
