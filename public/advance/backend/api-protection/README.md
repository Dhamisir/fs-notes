# Backend Assignment

A small backend learning challenge built with Node.js, Express, JavaScript, and MySQL.

## Existing Application

This is an already-working public product-search application. Express serves a browser interface and an API backed by a realistic MySQL product catalog containing product, category, inventory, and warehouse information.

The application runs correctly as provided. You do not need to rebuild it or create its routes.

## Problem

The API is publicly accessible and currently accepts requests without considering how frequently the same client is calling it. One client can send many different searches within a short period, and the server continues querying MySQL for every request.

Normal searches work correctly, but one unusually active client can occupy database connections and consume an unreasonable amount of application and database capacity.

Use **Run repeated requests** and inspect the Network panel, API responses, backend behavior, and database activity to reproduce the problem. The test intentionally uses varied search terms, so the requests do not all ask for identical data.

## Your Task

Modify the existing backend so one client cannot continuously send an unreasonable number of requests within a short period.

Normal users should still be able to search normally. When a client reaches an appropriate boundary, the API should respond clearly instead of continuing to query the database. After an appropriate waiting period, that client should be able to make requests again.

Decide what behavior is reasonable and where this protection belongs.

## Requirements

- Normal API usage must continue working.
- Excessive repeated requests from the same client must be controlled.
- The backend must stop unnecessary database processing after the allowed threshold.
- A blocked response must clearly tell the client that it needs to wait.
- Protection must be enforced by the backend.
- The solution should not require changes to every individual route.
- Different clients should not unnecessarily affect each other.
- Existing search responses must remain unchanged for normal requests.

## Constraints

- Modify the existing project; do not rebuild it.
- Do not remove or replace MySQL.
- Do not add artificial delays.
- Do not disable the API.
- Do not hardcode one special client or address as the solution.
- Do not modify every route individually when a centralized approach can meet the requirement.
- Do not add unnecessary libraries.

## How You Know You Are Done

Verify that normal requests succeed, repeated requests eventually get controlled, blocked requests receive an appropriate response, requests work again after the waiting period, and one client does not incorrectly block another.

## Investigation Questions

- What happens to the API and database when one client sends many requests quickly?
- Should the server process every request from every client?
- How can the server identify repeated requests from the same client?
- Where should protection belong if many routes need it?
- What response should a client receive after exceeding reasonable usage?

## Real-World Context

Public APIs, login endpoints, search services, and payment APIs need safeguards so one client cannot consume an unreasonable share of application or database resources. These safeguards help keep services available for normal users.

## Student Deliverable

Submit updated backend code, an explanation of the problem and solution, evidence showing behavior before and after, and one real-world example where this protection is useful.

## Project Structure

```text
api-protection/
├── public/          Browser testing interface
├── database.js      MySQL connection pool
├── schema.sql       Product catalog schema
├── seed.js          Realistic sample-data generator
└── server.js        Express application
```

## Run the Project

Copy the environment file and add your local MySQL credentials:

```bash
cp .env.example .env
```

Then install, seed, and run:

```bash
npm install
npm run seed
npm run dev
```

Open [http://localhost:4000](http://localhost:4000).
