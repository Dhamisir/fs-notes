require("dotenv").config();
const { createRedisClient } = require("./redisClient");

const redis = createRedisClient();

async function runExperiments() {
  // Write your Redis experiments here.
  // Investigate strings, structured values, missing keys, deletion, and expiration.
  // Log what you observe after every operation.

  console.log("Add your experiments, then run: npm run experiments");
}

runExperiments().catch((error) => {
  console.error("Experiment failed:", error.message);
  process.exit(1);
});
