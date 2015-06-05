# Authentication of Express Node.js applications

## What is Passport

Passport is middleware for Express and Connect-based Web applications

- middleware authenticates requests with verification functions writen by application developer
- user object is stored on request object for easy access
- configured woth strategies supporting dozens of different authentication schemes

## Installation

```
npm install passport
```

## Required Middleware

- body-parser
  - for reading credentials from request bodies
- cookie-parser
  - for storing session ID in browser
- express-session
  - for server-side storage of user IDs
  - session usage can be disabled if not desired
  - requires registering functions for serializing and deserializing users
  - not used by HTTP-based strategies (basic, digest, bearer)


