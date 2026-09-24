# Backend Assignment — Redis in a Real Application

An advanced problem-first assignment using React, Node.js, Express, MySQL, and a free Upstash Redis database.

## Existing Application

This is an already-working Product Catalog application. The React frontend requests individual products from an Express API. The backend retrieves persistent product, category, sales, and rating information from MySQL.

The frontend, API, MySQL schema, seed data, and testing controls are complete. Your new work is learning Redis and deciding how it can help with a real application problem.

## Part 1 — Learn Redis

Create your own free Redis database in the [Upstash Console](https://console.upstash.com/). Open its **Connect** page and copy the REST URL and REST token into **backend/.env** using the variable names from **backend/.env.example**. Never commit these credentials to GitHub.

The starter includes the Redis client dependency and connection structure in **backend/redisClient.js**. Read it and understand how environment variables create the client.

Complete **backend/redis-experiments.js**. Write small experiments that investigate how to store, retrieve, update, and delete values; store structured data; check whether data exists; set an expiration; read before and after expiration; and observe a missing key. Log what you observe after each operation.

## Part 2 — Understand Redis and MySQL

Before modifying the product endpoint, investigate:

- Why Redis should not replace MySQL here
- Which product data must remain persistent
- Which data could be stored temporarily
- What happens if temporary Redis data disappears
- Why frequently accessed information might benefit from Redis

Record your answers without changing the application yet.

## Part 3 — Application Problem

**GET /api/products/:id** retrieves product information from MySQL. The application works, but popular products are requested repeatedly and every request performs the same database operation even when the product has not changed.

Use the React interface to load one product repeatedly. Observe request count, database-operation count, response time, and backend code. Investigate how the Redis behavior from Part 1 could reduce unnecessary database work while keeping responses correct.

## Part 4 — Improve the Application

Modify the backend so frequently requested product information can be temporarily stored and reused appropriately. Determine where Redis belongs based on your experiments. Do not hardcode products; different product IDs must work independently.

## Part 5 — Failure Scenario

Investigate missing or incorrect Upstash credentials and temporary Redis unavailability. The product API must continue working by obtaining persistent data from MySQL.

## Requirements

- Existing API behavior must continue working.
- Product data must remain correct.
- Redis must be used meaningfully and temporary data must expire.
- Missing Redis data must be handled.
- MySQL must remain the persistent source of product data.
- The application must continue working if Redis is unavailable.
- Different products must be handled independently.
- Credentials must remain in environment variables and outside Git.
- Product changes must eventually become visible.

## Investigation Questions

- What is Redis actually storing?
- Why is Redis useful for this data?
- What happens when a Redis key does not exist?
- Why should product data remain in MySQL?
- What happens when Redis data expires?
- What should happen if Redis is unavailable?
- What happens when MySQL changes while older temporary data still exists?

## Real-World Context

Research Redis usage for caching, sessions, rate limiting, temporary data, and frequently accessed information. Explain why Redis is useful in each example without adding unrelated features here.

## Student Deliverable

Submit Redis experiment code, updated application code, explanations of Redis and Redis versus MySQL, expiration and failure behavior, before-and-after database evidence, and one additional real-world Redis use case.

## Project Structure

- **backend/database/** — MySQL connection, schema, and seed
- **backend/redisClient.js** — Upstash connection structure
- **backend/redis-experiments.js** — student experiments
- **backend/server.js** — Express product API
- **frontend/** — React and Vite interface

## Run the Project

Copy **backend/.env.example** to **backend/.env**, then add local MySQL and Upstash REST credentials.

From **backend/** run: **npm install**, **npm run seed**, **npm run experiments**, and **npm run dev**.

In another terminal, from **frontend/** run: **npm install** and **npm run dev**.

Open [http://localhost:5173](http://localhost:5173).
