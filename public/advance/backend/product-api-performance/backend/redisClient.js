require("dotenv").config();
const { Redis } = require("@upstash/redis");

function createRedisClient() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    throw new Error("Add your Upstash REST URL and token to backend/.env first.");
  }

  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
    signal: () => AbortSignal.timeout(1500),
  });
}

module.exports = { createRedisClient };
