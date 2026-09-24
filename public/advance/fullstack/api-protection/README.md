# Backend Assignment

A small backend learning challenge built with Node.js, Express, and JavaScript.

## Existing Application

This project is an already-working public product-search application. Express serves a small browser interface and a product API backed by an in-memory catalog. Users can search normally, view matching products, and see how many searches the server has processed.

The application runs correctly as provided. You do not need to rebuild it or create its routes.

## Problem

The API is publicly accessible and currently accepts requests without considering how frequently the same client is calling it. A client can repeatedly call the search endpoint within a short period, and the server continues filtering and sorting the catalog for every request.

A normal search works correctly, but one unusually active client can make the server perform far more work than reasonable and affect the service available to everyone else.

Use the **Run repeated requests** button and inspect the browser Network panel, API responses, and backend behavior to reproduce the problem.

## Your Task

Modify the existing backend so that one client cannot continuously send an unreasonable number of requests in a short period of time.

Normal users should still be able to search normally. When a client reaches an appropriate boundary, the API should respond clearly instead of continuing to process every request. After an appropriate waiting period, that client should be able to make requests again.

Decide what behavior is reasonable for this API and where the protection belongs.

## Requirements

- Normal API usage must continue working.
- Excessive repeated requests from the same client must be controlled.
- The backend must stop processing requests after the allowed threshold.
- A blocked response must clearly tell the client that it needs to wait.
- Protection must be enforced by the backend, not only by the browser UI.
- The solution should not require changes to every individual route.
- Different clients should not unnecessarily affect each other.
- The existing search response must continue working for normal requests.

## Constraints

- Modify the existing project; do not rebuild it.
- Do not add artificial delays.
- Do not disable the API.
- Do not hardcode one special client or address as the solution.
- Do not modify every route individually when a centralized approach can meet the requirement.
- Do not add unnecessary libraries.
- Keep existing API behavior working for normal requests.

## How You Know You Are Done

Test the API by making repeated requests within a short period and verify that:

1. Normal requests succeed.
2. Repeated requests eventually get controlled.
3. The API returns an appropriate response when the boundary is reached.
4. After the waiting period, requests can succeed again.
5. A different client is not incorrectly blocked because another client exceeded its usage.

## Investigation Questions

- What happens when the same client sends many requests very quickly?
- Should the server process every request from every client?
- How can the server identify repeated requests from the same client?
- Where would this protection belong if many API routes needed it?
- What should happen when a client exceeds the allowed usage?

## Real-World Context

Public APIs, login endpoints, search services, payment APIs, and other backend systems need safeguards so that one client cannot consume an unreasonable share of server resources. These safeguards help keep services responsive and available for normal users.

## Student Deliverable

Submit:

- Updated backend code
- A short explanation of the problem you discovered
- A short explanation of how you solved it
- Evidence showing behavior before and after the change
- One real-world example where this kind of protection is useful

## Project Structure

```text
api-protection/
├── public/          Browser testing interface
├── server.js        Express application and search endpoint
└── package.json
```

## Run the Project

From the project folder:

```bash
npm install
npm run dev
```

Open [http://localhost:4000](http://localhost:4000).
