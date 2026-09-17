import { teamMembers, openTickets, healthMetrics } from "./data";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// These endpoints simulate a real, slightly unreliable network: every call
// takes a moment and occasionally fails, the same way a real internal API
// would on a bad connection.

export async function getTeamStatus() {
  await delay(600 + Math.random() * 500);
  if (Math.random() < 0.3) {
    throw new Error("Failed to load team status");
  }
  return teamMembers;
}

export async function getOpenTickets() {
  await delay(600 + Math.random() * 500);
  if (Math.random() < 0.3) {
    throw new Error("Failed to load open tickets");
  }
  return openTickets;
}

export async function getServerHealth() {
  await delay(600 + Math.random() * 500);
  if (Math.random() < 0.3) {
    throw new Error("Failed to load server health");
  }
  return healthMetrics;
}
