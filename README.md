<div align="center">

# ⚡ PairPrep-IQ

### The pair‑programming interview room for people who'd rather practice together than alone.

Video call. Live chat. A real, judged code editor. One shared problem — two people solving it side by side.

[![Repo Stars](https://img.shields.io/github/stars/abhijeethkv17/PairPrep-IQ?style=flat-square&color=blueviolet)](https://github.com/abhijeethkv17/PairPrep-IQ/stargazers)
[![Forks](https://img.shields.io/github/forks/abhijeethkv17/PairPrep-IQ?style=flat-square&color=blue)](https://github.com/abhijeethkv17/PairPrep-IQ/network/members)
[![Open Issues](https://img.shields.io/github/issues/abhijeethkv17/PairPrep-IQ?style=flat-square&color=orange)](https://github.com/abhijeethkv17/PairPrep-IQ/issues)
[![Open PRs](https://img.shields.io/github/issues-pr/abhijeethkv17/PairPrep-IQ?style=flat-square&color=success)](https://github.com/abhijeethkv17/PairPrep-IQ/pulls)
[![Last Commit](https://img.shields.io/github/last-commit/abhijeethkv17/PairPrep-IQ?style=flat-square)](https://github.com/abhijeethkv17/PairPrep-IQ/commits)

![Node](https://img.shields.io/badge/Node.js-20%2B-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?style=flat-square&logo=clerk&logoColor=white)
![Stream](https://img.shields.io/badge/Realtime-Stream-005FFF?style=flat-square)
![Inngest](https://img.shields.io/badge/Events-Inngest-000000?style=flat-square)

</div>

<p align="center">
  <img src="Screenshots/Landing Page.png" alt="PairPrep-IQ dashboard screenshot placeholder" width="85%" />
</p>
<p align="center">
  <img src="Screenshots/Problems Page.png" alt="PairPrep-IQ dashboard screenshot placeholder" width="85%" />
</p>
<p align="center">
  <img src="Screenshots/Dashboard Page.png" alt="PairPrep-IQ dashboard screenshot placeholder" width="85%" />
</p>
<p align="center">
  <img src="Screenshots/Session Page.png" alt="PairPrep-IQ dashboard screenshot placeholder" width="85%" />
</p>
<p align="center">
  <img src="Screenshots/Session Problem Accepted.png" alt="PairPrep-IQ dashboard screenshot placeholder" width="85%" />
</p>
<p align="center">
  <img src="Screenshots/Session Problem wrong answer.png" alt="PairPrep-IQ dashboard screenshot placeholder" width="85%" />
</p>

<p align="center"><i>📸 Screenshots of PairPrep-IQ — see <a href="#-screenshots">Screenshots</a> for the full shot list.</i></p>

<br/>

> [!NOTE]
> This README was written by reading the actual source in this repository — every feature, route, model, and env var below reflects what's implemented today. Nothing here is aspirational except the sections explicitly marked **Roadmap**.

<br/>

## 📚 Table of Contents

- [Introduction](#-introduction)
- [Features](#-features)
- [Architecture Overview](#-architecture-overview)
- [System Design](#-system-design)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Usage Guide](#-usage-guide)
- [Database Models](#-database-models)
- [API Reference](#-api-reference)
- [Authentication & Authorization](#-authentication--authorization)
- [Real-Time Layer: Video & Chat](#-real-time-layer-video--chat)
- [Background Jobs (Inngest)](#-background-jobs-inngest)
- [Code Execution Engine](#-code-execution-engine)
- [Client-Side State Management](#-client-side-state-management)
- [Validation & Error Handling](#-validation--error-handling)
- [Security Notes](#-security-notes)
- [Developer Experience](#-developer-experience)
- [Known Limitations & Design Trade-offs](#-known-limitations--design-trade-offs)
- [Roadmap](#-roadmap)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)
- [Testing](#-testing)
- [Contributing](#-contributing)
- [FAQ](#-faq)
- [Acknowledgements](#-acknowledgements)
- [License](#-license)
- [Author](#-author)

<br/>

## 🧭 Introduction

Most interview-prep tools are single-player: you open a problem, you solve it, you close the tab. **PairPrep-IQ** exists for the part of interview prep that single-player tools skip — sitting across from another person, explaining your thinking out loud, and getting unstuck together.

**What it does.** PairPrep-IQ is a full-stack MERN application that pairs a LeetCode-style problem bank with a live video call and chat room. A host picks a problem and difficulty, PairPrep-IQ spins up a session with a real-time video call and chat channel, and a second person joins from a shared link. Both people get their own Monaco-powered code editor pointed at the same problem; submissions are graded against real test cases by an isolated code-execution backend, not string-matched or eyeballed.

**Who it's for.** Two people prepping for technical interviews together — study partners, bootcamp cohorts, mentor/mentee pairs — who want the LeetCode-style problem/judge experience without losing the face-to-face, talk-through-your-approach part of a real interview. It also works solo: every problem is fully solvable and gradeable outside of a session.

**Why it was built.** Pairing a judged problem bank with disposable, on-demand video rooms means every practice session doubles as a mock interview — no separate call-scheduling tool, no copy-pasting a LeetCode link into a Zoom chat, no manually checking someone else's output by hand.

<br/>

## ✨ Features

| Feature | What it does | How it works | Why it matters |
|---|---|---|---|
| **Judged problem bank** | Browse, filter, and solve a curated set of coding problems with real pass/fail grading | Each `Problem` document stores per-language starter code, hidden test cases, and reference solutions; submissions are executed against the hidden test cases via an external judge | Turns "I think this works" into a verified result, the same way a real online assessment does |
| **Multi-language grading** | Solve any problem in **JavaScript**, **Python**, or **Java** | The problem schema stores parallel `codeSnippets` / `referenceSolutions` / `examples` per language; the submit endpoint maps the selected language to a Judge0 language ID | Interview panels don't all use the same language — practicing in your actual interview language matters |
| **Solo practice mode** | Solve any problem on its own, no session required | `/problem/:id` renders the same description + Monaco editor + output panel used in a session, without the video/chat panel | Not every practice rep needs a partner — the judge and editor work standalone |
| **Live pair sessions** | Two people share a problem, a video call, and a chat channel in one room | Creating a session provisions a Stream video call and a Stream chat channel keyed to the same `callId`; the second visitor auto-joins via `POST /sessions/:id/join` | Recreates the "two people, one shared problem" shape of a real pairing/technical interview |
| **HD video + screen share** | Face-to-face video with call controls (mute, camera, screen share, leave) | Stream's Video React SDK (`@stream-io/video-react-sdk`) renders `SpeakerLayout` and `CallControls` inside a `StreamCall` | Talking through your approach out loud is the whole point of pairing |
| **In-session chat** | A collapsible chat panel scoped to the session, for links, hints, or notes | `stream-chat-react` renders a `Channel` bound to the same Stream channel created at session start | Not everything needs to be said out loud — pasting a snippet or a link is often faster |
| **Split, resizable workspace** | Problem statement, editor, and output panel are independently resizable | `react-resizable-panels` (`PanelGroup`/`Panel`/`PanelResizeHandle`) lays out the whole session and solo-problem screens | Mirrors the resizable layout of the coding tools most interview platforms already use |
| **Monaco-powered editor** | Real syntax highlighting, line numbers, and a dark theme, per language | `@monaco-editor/react` renders VS Code's editor engine client-side, keyed to the selected language | Practicing in a toy `<textarea>` doesn't build the same muscle memory as a real editor |
| **Automatic per-test-case grading** | "Run Code" submits against *every* hidden test case and reports pass/fail per case | The backend batches all test cases to Judge0 in one call, polls until every result resolves, and derives one overall status (`Accepted`, `Wrong Answer`, `Time Limit Exceeded`, `Compile Error`, `Runtime Error`) | Partial credit visibility (which cases failed, and why) is what makes debugging useful instead of guesswork |
| **Progress tracking** | Solved problems are marked and remembered per user | A `ProblemSolved` record is upserted the moment all test cases pass; the problems list annotates each entry with `isSolved` | Lets you see what's left instead of re-solving the same five problems by accident |
| **Admin-managed problem CRUD** | Admins can create, edit, and archive problems from the UI — everyone else just solves them | `requireAdmin` middleware gates `POST` / `PUT` / `DELETE /api/problems`; a React Hook Form + Zod form drives creation and edits | Keeps the problem bank a first-class, database-backed resource instead of a hardcoded file only a developer can touch |
| **Safe problem deletion** | "Deleting" a problem archives it instead of hard-deleting, and is blocked while a session is using it | `deleteProblem` sets `isArchived: true` and refuses if an *active* `Session` still references that problem | Prevents a live pairing session from losing its problem out from under both participants |
| **Google-account-free auth** | Sign up / sign in via Clerk's hosted modal — no custom password handling anywhere in this codebase | `@clerk/express` verifies session JWTs on the API; `@clerk/clerk-react` renders the sign-in UI on the client | Authentication is the single easiest thing to get subtly wrong by hand — this app doesn't try to |
| **Event-driven user sync** | New Clerk accounts get a matching MongoDB `User` automatically, no manual step | Clerk's `user.created` / `user.deleted` events trigger Inngest functions (`sync-user`, `delete-user-from-db`) that create/remove the Mongo record and the mirrored Stream Chat user | Keeps three separate systems (Clerk, MongoDB, Stream) about "who this user is" from drifting apart |
| **Config-driven admin bootstrapping** | The first admins are granted by email, no manual DB edit required | `sync-user` checks the new user's email against a comma-separated `ADMIN_EMAILS` list at signup time | Lets you seed real admin accounts without ever hand-editing a document in Mongo |

<br/>

## 🏗 Architecture Overview

PairPrep-IQ is a classic **MERN** monolith split into two workspaces — `frontend` (Vite + React) and `backend` (Express) — plus three managed third-party platforms that do the heavy lifting Claude... err, that no single-developer project should reinvent:

- **Frontend** — a Vite-built React 19 SPA. Routing via `react-router`, server-state via **TanStack Query**, forms via **React Hook Form + Zod**, styling via **Tailwind CSS v4 + DaisyUI**, and the code editor via **Monaco**.
- **Backend** — a single Express 5 app exposing a REST API under `/api/*`, backed by **MongoDB** via **Mongoose**. In production it also serves the built frontend as static files from the same process (see [Deployment](#-deployment)).
- **Database** — MongoDB, with five collections: `users`, `problems`, `sessions`, `submissions`, `problemsolveds`.
- **Authentication** — **Clerk** issues and verifies session JWTs; the Express app trusts `req.auth()` via `clerkMiddleware()` and looks up the matching local `User` document on every protected request.
- **AI/Judge layer** — *no LLM is involved in grading.* Code is executed and graded by a **Judge0-compatible execution service** (referred to in the codebase as "CodeBox"), called over HTTP from the backend.
- **Real-time layer** — **Stream** provides both the WebRTC video call and the chat channel for a session; the backend provisions both when a session is created and tears both down when it ends.
- **Workflow/event engine** — **Inngest** listens for Clerk webhook events (`user.created`, `user.deleted`) and reconciles MongoDB + Stream accordingly, completely decoupled from the request/response cycle.
- **Storage** — no object storage or file uploads exist in this codebase; profile images are hosted by Clerk and referenced by URL only.

<br/>

## 🧩 System Design

### High-level architecture

```mermaid
flowchart LR
    subgraph Client["Browser — React 19 + Vite SPA"]
        UI["React UI (pages/components)"]
        RQ["TanStack Query cache"]
        ME["Monaco Editor"]
    end

    subgraph Server["Express API (Node.js, single process)"]
        MW["clerkMiddleware()"]
        PR["protectRoute / requireAdmin"]
        RT["REST Routers"]
        CT["Controllers"]
    end

    subgraph Data["Persistence"]
        Mongo[("MongoDB")]
    end

    subgraph ThirdParty["Managed Platforms"]
        Clerk["Clerk — Auth"]
        Stream["Stream — Video + Chat"]
        Judge0["Judge0 / CodeBox — Execution Engine"]
        Inngest["Inngest — Event Bus"]
    end

    UI -- "REST + Bearer JWT" --> RT
    RT --> MW --> PR --> CT
    CT --> Mongo
    CT -- "create/join call, chat channel" --> Stream
    CT -- "submit + poll batch" --> Judge0
    Clerk -- "user.created / user.deleted webhook" --> Inngest
    Inngest --> Mongo
    Inngest --> Stream
    UI -- "sign-in, session token" --> Clerk
    UI <-- "WebRTC + WebSocket" --> Stream
```

### User onboarding flow

```mermaid
sequenceDiagram
    participant U as User
    participant FE as React App
    participant Clerk as Clerk
    participant Inngest as Inngest
    participant API as Express API
    participant DB as MongoDB

    U->>FE: Sign up via Clerk modal
    FE->>Clerk: Create account
    Clerk-->>Inngest: user.created event
    Inngest->>DB: create User (role = admin if email in ADMIN_EMAILS)
    Inngest->>Inngest: upsert matching Stream Chat user
    FE->>API: GET /api/users/me (retries up to 8x — DB write is async)
    API->>DB: find User by clerkId
    API-->>FE: { id, name, email, profileImage, role }
```

### Session creation & join flow

```mermaid
sequenceDiagram
    participant Host
    participant FE as React App
    participant API as Express API
    participant DB as MongoDB
    participant Stream as Stream
    participant Peer as Participant

    Host->>FE: Pick a problem + difficulty
    FE->>API: POST /api/sessions
    API->>DB: create Session (status: active)
    API->>Stream: create video call + chat channel (same callId)
    API-->>FE: session (with populated problem)
    FE->>Host: navigate to /session/:id

    Peer->>FE: Open the session link
    FE->>API: POST /api/sessions/:id/join
    API->>DB: attach participant (rejected if already full or host)
    API->>Stream: add participant to chat channel
    API-->>FE: updated session
    Host-->>Stream: join call (WebRTC)
    Peer-->>Stream: join call (WebRTC)
```

### Code submission & grading flow

```mermaid
sequenceDiagram
    participant FE as React App
    participant API as Express API
    participant Judge0 as Judge0 / CodeBox
    participant DB as MongoDB

    FE->>API: POST /api/problems/:id/submit { language, sourceCode }
    API->>DB: load Problem.testCases
    API->>Judge0: POST /submissions/batch (all test cases, batched by 20)
    Judge0-->>API: submission tokens
    loop poll until resolved (≤ 30 rounds, 1s apart)
        API->>Judge0: GET /submissions/batch?tokens=...
        Judge0-->>API: per-token status
    end
    API->>API: derive overall status from per-case results
    API->>DB: save Submission + testCaseResults
    alt all test cases passed
        API->>DB: upsert ProblemSolved(user, problem)
    end
    API-->>FE: { submission }
    FE-->>FE: confetti + toast on "Accepted"
```

<br/>

## 🛠 Tech Stack

### Backend

| Technology | Purpose | Why it was chosen | Alternatives |
|---|---|---|---|
| **Node.js + Express 5** | HTTP server, REST routing | Minimal, unopinionated, first-class ESM support in v5 | Fastify, Hono, NestJS |
| **MongoDB + Mongoose** | Primary datastore + schema/validation layer | Document shape (a `Problem` with nested per-language maps) fits naturally as JSON; Mongoose gives schema validation without a separate ORM migration story | PostgreSQL + Prisma, PostgreSQL + Drizzle |
| **Clerk (`@clerk/express`)** | Session verification, auth middleware | Offloads password storage, session rotation, and JWT verification entirely | Auth.js (NextAuth), Passport + custom sessions, Lucia |
| **Stream Chat + Stream Video (`stream-chat`, `@stream-io/node-sdk`)** | Server-side token issuance, call/channel lifecycle | Managed WebRTC infra with a first-class React SDK; avoids hand-rolling signaling servers | Twilio Video, Daily.co, Agora, self-hosted mediasoup |
| **Inngest** | Durable, event-triggered background functions | Decouples "a Clerk webhook fired" from "MongoDB and Stream are consistent," with built-in retries | BullMQ + Redis, a raw webhook route with manual retry logic |
| **Judge0-compatible execution service ("CodeBox")** | Sandboxed multi-language code execution & grading | Battle-tested sandboxing for arbitrary user code; the batch-submit + poll API maps cleanly onto "grade N test cases at once" | Piston, self-hosted gVisor/Firecracker sandbox, gVisor-based custom runner |
| **Axios** | Outbound HTTP client (to the execution service) | Simple interceptor-friendly client already used on the frontend too | Native `fetch` |

### Frontend

| Technology | Purpose | Why it was chosen | Alternatives |
|---|---|---|---|
| **React 19 + Vite** | UI runtime + build tooling | Fast HMR, minimal config, no framework-level SSR needed for an authenticated app | Next.js, Remix, CRA |
| **react-router** | Client-side routing | Declarative route protection (`isSignedIn ? … : <Navigate />`) fits the auth-gated route tree | TanStack Router |
| **TanStack Query** | Server-state cache, mutations, invalidation | Automatic caching/retry/invalidation instead of hand-rolled `useEffect` fetch logic; session polling via `refetchInterval` | SWR, Redux + RTK Query |
| **React Hook Form + Zod (`@hookform/resolvers`)** | Admin problem-authoring form state + validation | The problem schema is deeply nested (three languages × starter code / solution / example, plus a dynamic test-case array); RHF's `useFieldArray` handles that without re-rendering the whole form on every keystroke | Formik + Yup |
| **Tailwind CSS v4 + DaisyUI** | Styling + component primitives (`card`, `badge`, `modal`, `stats`) | Utility-first CSS with ready-made, themeable components — no separate design-system build | shadcn/ui, Chakra UI, Mantine |
| **Monaco Editor (`@monaco-editor/react`)** | In-browser code editor | Same editor engine as VS Code; per-language syntax highlighting out of the box | CodeMirror 6, Ace |
| **`react-resizable-panels`** | Resizable split-pane layout | Purpose-built for exactly the IDE-style layout this app needs (problem / editor / output / video) | Custom CSS `resize`, `re-resizable` |
| **Stream Video React SDK + `stream-chat-react`** | Client-side video call UI + chat UI | First-party React bindings for the same Stream account used on the backend | Building a custom WebRTC UI on raw `stream-chat`/`@stream-io/node-sdk` |
| **`canvas-confetti`** | Success celebration on an "Accepted" submission | Small, dependency-free, does exactly one job well | — |
| **`react-hot-toast`** | Toast notifications for mutation success/error | Minimal API, matches the DaisyUI dark/light theme easily | Sonner, native `alert()` |

<br/>

## 📁 Project Structure

```
PairPrep-IQ/
├── package.json                  # Root — orchestrates build (installs + builds frontend, runs backend)
│
├── backend/
│   ├── package.json
│   └── src/
│       ├── server.js              # Express app entry: middleware, routers, static-serve in prod
│       ├── controllers/
│       │   ├── chatController.js       # Issues Stream chat tokens
│       │   ├── problemController.js    # Problem CRUD + validated-on-save grading
│       │   ├── sessionController.js    # Session lifecycle (create/join/end) + Stream provisioning
│       │   ├── submissionController.js # Submits code to the judge, derives pass/fail status
│       │   └── userController.js       # Returns the current user's profile
│       ├── lib/
│       │   ├── codebox.js         # Judge0 batch-submit + poll client
│       │   ├── db.js              # Mongoose connection
│       │   ├── env.js             # Centralized process.env access
│       │   ├── inngest.js         # Inngest client + sync-user / delete-user functions
│       │   └── stream.js          # Stream Chat + Stream Video client factories
│       ├── middleware/
│       │   ├── protectRoute.js    # Verifies Clerk session, attaches req.user from Mongo
│       │   └── requireAdmin.js    # Gates admin-only routes on req.user.role
│       ├── models/
│       │   ├── User.js
│       │   ├── Problem.js
│       │   ├── Session.js
│       │   ├── Submission.js
│       │   └── ProblemSolved.js
│       ├── routes/
│       │   ├── chatRoutes.js
│       │   ├── problemRoutes.js
│       │   ├── sessionRoute.js
│       │   └── userRoutes.js
│       └── scripts/
│           └── seedProblems.js    # One-off script: seeds 5 starter problems, requires an existing admin
│
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    ├── public/                    # Static assets (language icons, hero image)
    └── src/
        ├── main.jsx                # ClerkProvider + QueryClientProvider + BrowserRouter bootstrap
        ├── App.jsx                 # Route table + auth/admin route guards
        ├── api/                    # Thin axios wrappers, one file per resource
        │   ├── problems.js
        │   ├── sessions.js
        │   ├── submissions.js
        │   └── users.js
        ├── hooks/                  # TanStack Query hooks wrapping api/*
        │   ├── useCurrentUser.js
        │   ├── useProblems.js
        │   ├── useSessions.js
        │   ├── useSubmissions.js
        │   └── useStreamClient.js  # Connects Stream video + chat for a session
        ├── lib/
        │   ├── axios.js            # Axios instance; attaches Clerk JWT to every request
        │   ├── stream.js           # Client-side Stream Video client factory
        │   └── utils.js            # e.g. difficulty → badge class mapping
        ├── constant/
        │   └── languageConfig.js   # JS/Python/Java display names, icons, Monaco language ids
        ├── schema/
        │   └── problemSchema.js    # Zod schema for the admin problem-authoring form
        ├── data/
        │   └── problems.js         # Legacy hardcoded problem set — retained only as seedProblems.js's source data
        ├── components/
        │   ├── Navbar.jsx
        │   ├── CodeEditorPanel.jsx
        │   ├── OutputPanel.jsx
        │   ├── ProblemDescription.jsx
        │   ├── VideoCallUI.jsx
        │   ├── CreateSessionModal.jsx
        │   ├── ActiveSessions.jsx
        │   ├── RecentSessions.jsx
        │   ├── StatsCards.jsx
        │   ├── WelcomeSection.jsx
        │   ├── ProtectedAdminRoute.jsx
        │   └── admin/
        │       └── ProblemForm.jsx  # Shared create/edit form (React Hook Form + Zod + useFieldArray)
        └── pages/
            ├── HomePage.jsx
            ├── DashboardPage.jsx
            ├── ProblemsPage.jsx
            ├── ProblemPage.jsx       # Solo practice view
            ├── SessionPage.jsx       # Pair session view (editor + video + chat)
            └── admin/
                ├── CreateProblemPage.jsx
                └── EditProblemPage.jsx
```

<br/>

## 🚀 Getting Started

### Prerequisites

- **Node.js 20+** and npm
- A **MongoDB** connection string (Atlas free tier works fine)
- A free **[Clerk](https://clerk.com)** application (publishable key + secret key)
- A free **[Stream](https://getstream.io)** app with both **Video** and **Chat** enabled (API key + secret)
- An **[Inngest](https://www.inngest.com)** account, or the local Inngest Dev Server for development
- Access to a **Judge0-compatible execution API** (self-hosted Judge0, or a hosted instance) — this is what `CODEBOX_API_URL` / `CODEBOX_AUTH_TOKEN` point at

### 1. Clone the repository

```bash
git clone https://github.com/abhijeethkv17/PairPrep-IQ.git
cd PairPrep-IQ
```

### 2. Install dependencies

```bash
npm install --prefix backend
npm install --prefix frontend
```

### 3. Configure environment variables

Create `backend/.env` and `frontend/.env` — see the full [Environment Variables](#-environment-variables) tables below for every key.

### 4. Run the app locally

Backend and frontend run as two separate dev servers (there's no single root `dev` script):

```bash
# terminal 1 — backend, http://localhost:<PORT>
cd backend
npm run dev

# terminal 2 — frontend, http://localhost:5173
cd frontend
npm run dev
```

If you're using Inngest locally, also run the Inngest Dev Server pointed at `http://localhost:<PORT>/api/inngest` so `user.created` / `user.deleted` events reach your backend.

### 5. (Optional) Seed starter problems

The problem bank starts empty. `seedProblems.js` inserts five starter problems (**Two Sum**, **Reverse String**, **Valid Palindrome**, **Maximum Subarray**, **Container With Most Water**) — but it requires **an admin user to already exist** in your database, since every problem needs a `createdBy`:

```bash
# 1. Sign up once through the running app with an email listed in ADMIN_EMAILS
# 2. Then, from backend/:
node src/scripts/seedProblems.js
```

### 6. Build for production

From the repo root, the single build script installs both workspaces and builds the frontend:

```bash
npm run build   # npm install --prefix backend && npm install --prefix frontend && vite build
npm start        # node backend/src/server.js — also serves frontend/dist when NODE_ENV=production
```

<br/>

## 🔑 Environment Variables

### `backend/.env`

| Variable | Purpose | Required | Example |
|---|---|:---:|---|
| `PORT` | Port the Express server listens on | ✅ | `5001` |
| `NODE_ENV` | Enables static-serving of `frontend/dist` when set to `production` | ✅ | `development` |
| `MONGO_DB_URI` | MongoDB connection string | ✅ | `mongodb+srv://user:pass@cluster.mongodb.net/pairprep` |
| `CLIENT_URL` | Frontend origin, used for the CORS allow-list | ✅ | `http://localhost:5173` |
| `CLERK_PUBLISHABLE_KEY` | Clerk publishable key (also used server-side) | ✅ | `pk_test_...` |
| `CLERK_SECRET_KEY` | Clerk secret key, used by `clerkMiddleware()` | ✅ | `sk_test_...` |
| `STREAM_API_KEY` | Stream app key (chat + video) | ✅ | `abc123...` |
| `STREAM_API_SECRET` | Stream app secret, used to mint tokens server-side | ✅ | `secret...` |
| `CODEBOX_API_URL` | Base URL of the Judge0-compatible execution service | ✅ | `https://your-judge0-instance.example.com` |
| `CODEBOX_AUTH_TOKEN` | Auth token sent as `X-Auth-Token` to the execution service | ✅ | `token...` |
| `ADMIN_EMAILS` | Comma-separated emails granted the `admin` role on first sign-up | ⚠️ recommended | `you@example.com,teammate@example.com` |

### `frontend/.env`

| Variable | Purpose | Required | Example |
|---|---|:---:|---|
| `VITE_API_URL` | Base URL the frontend's axios instance calls | ✅ | `http://localhost:5001/api` |
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk publishable key for `<ClerkProvider>` | ✅ | `pk_test_...` |
| `VITE_STREAM_API_KEY` | Stream app key, used to instantiate the client-side chat client | ✅ | `abc123...` |

> [!TIP]
> Without `ADMIN_EMAILS` set correctly *before* your first sign-up, no account will have the `admin` role — and without an admin, `seedProblems.js` has nothing to attribute problems to, and nobody can create problems from the UI either.

<br/>

## 📖 Usage Guide

1. **Sign up / sign in** — the landing page's "Get Started" button opens Clerk's hosted sign-in modal. A matching MongoDB `User` is created moments later via the Inngest-driven sync flow.
2. **Browse problems** (`/problems`) — see every non-archived problem with its difficulty, tags, and your solved/unsolved status.
3. **Solve solo** (`/problem/:id`) — read the description, examples, and constraints on the left; write and run code in Monaco on the right; "Run Code" grades against every hidden test case.
4. **Start a pair session** — from the dashboard, click **New Session**, pick a problem and difficulty, and PairPrep-IQ provisions a session, a video call, and a chat channel in one step.
5. **Invite a partner** — share the session URL (`/session/:id`); opening it auto-joins them as the participant (a session can only ever have one host and one participant).
6. **Pair-solve** — each person edits code in their own Monaco pane while sharing the same video call and chat channel; either person can run their own code against the problem's test cases independently.
7. **End the session** — only the host can end it; ending it tears down the Stream call and chat channel and marks the session `completed` for both participants.
8. **(Admin) manage the problem bank** — from `/admin/problems/new` or the edit icon on `/problems`, fill out the multi-language `ProblemForm`. On save, every reference solution is run against every test case first — the problem is only persisted if all of them pass.

<br/>

## 🗄 Database Models

```mermaid
erDiagram
    USER ||--o{ PROBLEM : "creates (createdBy)"
    USER ||--o{ SESSION : "hosts"
    USER ||--o{ SESSION : "participates in"
    USER ||--o{ SUBMISSION : "submits"
    USER ||--o{ PROBLEM_SOLVED : "solves"
    PROBLEM ||--o{ SESSION : "used in"
    PROBLEM ||--o{ SUBMISSION : "graded against"
    PROBLEM ||--o{ PROBLEM_SOLVED : "marked solved"

    USER {
        ObjectId _id
        string name
        string email UK
        string profileImage
        string clerkId UK
        string role "user | admin"
    }
    PROBLEM {
        ObjectId _id
        string title
        string description
        string difficulty "EASY | MEDIUM | HARD"
        string_array tags
        string constraints
        string hints
        string editorial
        array testCases "hidden, per-language"
        object examples "per language"
        object codeSnippets "per language starter code"
        object referenceSolutions "per language, never sent to non-admins"
        ObjectId createdBy FK
        boolean isArchived
    }
    SESSION {
        ObjectId _id
        ObjectId problem FK
        string difficulty "easy | medium | hard"
        ObjectId host FK
        ObjectId participant FK "nullable"
        string status "active | completed"
        string callId
    }
    SUBMISSION {
        ObjectId _id
        ObjectId user FK
        ObjectId problem FK
        string sourceCode
        string language
        string status "Accepted | Wrong Answer | Compile Error | Runtime Error | Time Limit Exceeded"
        array testCaseResults
    }
    PROBLEM_SOLVED {
        ObjectId user FK
        ObjectId problem FK
    }
```

**Notable design details:**

- `Problem.testCases` and `Problem.referenceSolutions` are **stripped from every API response to non-admin users** (`getProblems`, `getProblemById`, and the problem embedded in a `Session`) — solvers never see the hidden grading data, only admins do.
- `Problem` has a MongoDB **text index** on `title` + `tags` (`problemSchema.index({ title: "text", tags: "text" })`), ready for search even though the current UI doesn't yet expose a search box (see [Roadmap](#-roadmap)).
- `ProblemSolved` has a **compound unique index** on `(user, problem)` — solving a problem twice upserts the same record instead of duplicating it.
- `Problem` deletion is **soft** (`isArchived: true`), and is refused outright if a `Session` referencing that problem currently has `status: "active"`.

<br/>

## 🌐 API Reference

All routes are mounted under `/api`. Every route below except `GET /health` requires a valid Clerk session (`protectRoute`); routes marked **Admin** additionally require `requireAdmin`.

### Users — `/api/users`

| Method | Route | Auth | Description |
|---|---|---|---|
| `GET` | `/me` | User | Returns the current user's `{ id, name, email, profileImage, role }` |

### Problems — `/api/problems`

| Method | Route | Auth | Description |
|---|---|---|---|
| `GET` | `/` | User | List problems. Non-admins only see non-archived problems, with `testCases`/`referenceSolutions` stripped and an `isSolved` flag added |
| `GET` | `/:id` | User | Fetch one problem by id (same stripping rules for non-admins) |
| `POST` | `/` | **Admin** | Create a problem — every `referenceSolutions[lang]` is executed against every `testCases` entry first; the whole request is rejected if any fail |
| `PUT` | `/:id` | **Admin** | Update a problem — re-validates reference solutions against test cases whenever both are present in the update payload |
| `DELETE` | `/:id` | **Admin** | Archive (soft-delete) a problem; `409` if an active session still uses it |
| `POST` | `/:id/submit` | User | Submit a solution for grading (see [Code Execution Engine](#-code-execution-engine)) |

### Sessions — `/api/sessions`

| Method | Route | Auth | Description |
|---|---|---|---|
| `POST` | `/` | User | Create a session for a problem + difficulty; provisions a Stream call and chat channel |
| `GET` | `/active` | User | Latest 20 sessions with `status: "active"`, host/participant/problem populated |
| `GET` | `/my-recent` | User | Latest 20 of the current user's `completed` sessions (as host or participant) |
| `GET` | `/:id` | User | Fetch one session, fully populated |
| `POST` | `/:id/join` | User | Join as participant — `400` if already completed or you're the host, `409` if already full |
| `POST` | `/:id/end` | User | End the session — **host only**; tears down the Stream call + channel, marks `completed` |

### Chat — `/api/chat`

| Method | Route | Auth | Description |
|---|---|---|---|
| `GET` | `/token` | User | Issues a Stream token for the current user, keyed by their `clerkId` |

### System

| Method | Route | Auth | Description |
|---|---|---|---|
| `GET` | `/health` | — | Liveness check — `{ msg: "api is up and running" }` |
| `*` | `/api/inngest` | Inngest signature | Inngest's serve handler — receives and dispatches `sync-user` / `delete-user-from-db` |

<br/>

## 🔐 Authentication & Authorization

- **Sign-in UI** is entirely Clerk's — `<SignInButton mode="modal">` on the landing page, `<UserButton>` in the navbar. No custom login form exists anywhere in this codebase.
- **Every API request** carries a Clerk session JWT as a `Bearer` token, attached automatically by an axios request interceptor (`window.Clerk.session.getToken()`).
- **`clerkMiddleware()`** runs globally on the Express app, making `req.auth()` available to every route.
- **`protectRoute`** (`requireAuth()` + a lookup step) rejects unauthenticated requests, then loads the matching MongoDB `User` by `clerkId` and attaches it as `req.user` — so controllers never touch Clerk's SDK directly, only `req.user`.
- **`requireAdmin`** is a second, composable middleware that checks `req.user.role === "admin"` — stacked after `protectRoute` on the problem-authoring routes.
- **Admin status is not a Clerk concept at all** — it's a field on the local `User` document, set once at signup time (`sync-user`, based on `ADMIN_EMAILS`) and otherwise immutable from the UI (there's no "promote to admin" endpoint — that's a direct-database operation today).
- **Protected client routes** (`ProtectedAdminRoute`) mirror the server-side check for UX purposes only — the real enforcement is always server-side in `requireAdmin`.

<br/>

## 🎥 Real-Time Layer: Video & Chat

PairPrep-IQ uses **[Stream](https://getstream.io)** for both video and chat, sharing a single `callId` string as the identifier for both:

- **On session creation**, the backend calls `streamClient.video.call("default", callId).getOrCreate(...)` *and* creates a Stream Chat `messaging` channel with that same `callId`, seeded with the host as the only member.
- **On join**, the participant's `clerkId` is added to the chat channel's members; the video call itself has no membership list to update — anyone with a valid token who calls `.join()` on that call id connects.
- **Client-side**, `useStreamClient` — a custom hook — waits for the session and the caller's host/participant status, fetches a Stream token from `/api/chat/token`, and initializes *both* a video client (`@stream-io/video-react-sdk`) and a chat client (`stream-chat`) in one effect, cleaning both up on unmount.
- **`VideoCallUI`** renders Stream's `SpeakerLayout` and `CallControls` for video, and a collapsible `stream-chat-react` panel (`Channel` / `Window` / `MessageList` / `MessageComposer` / `Thread`) for chat.
- **On session end**, the host's action does a **hard delete** of both the Stream call (`call.delete({ hard: true })`) and the chat channel — nothing lingers in Stream once a session is over.

> [!IMPORTANT]
> The code editor itself is **not** synced between host and participant — each person's Monaco buffer is local React state. What's shared live is the video, audio, and chat; the problem statement and starter code are simply the same for both, since they're loaded from the same `Session.problem`.

<br/>

## ⚙️ Background Jobs (Inngest)

Two Inngest functions keep MongoDB and Stream in sync with Clerk, entirely outside the request/response cycle:

| Function | Trigger | What it does |
|---|---|---|
| `sync-user` | `clerk/user.created` | Creates the matching MongoDB `User` (assigning `role: "admin"` if the email is in `ADMIN_EMAILS`), then upserts a matching Stream Chat user |
| `delete-user-from-db` | `clerk/user.deleted` | Deletes the MongoDB `User` by `clerkId`, then deletes the matching Stream Chat user |

Both functions call `connectDB()` themselves, since Inngest invokes them out-of-band from the main Express request lifecycle — they don't rely on a connection the server already opened.

<br/>

## 🧮 Code Execution Engine

Grading is handled by a **Judge0-compatible** execution service, referred to in the code as `codebox.js` on both frontend and backend:

- **Language mapping** — `JAVASCRIPT → 63`, `PYTHON → 71`, `JAVA → 62` (standard Judge0 language IDs).
- **Batch submission** — all of a problem's test cases are submitted in a single `POST /submissions/batch` call, chunked at 20 submissions per request.
- **Polling** — results are polled via `GET /submissions/batch?tokens=...` every second, for up to 30 rounds (~30 seconds), until every submission has resolved past Judge0's "in queue" / "processing" states.
- **Grading happens in two places**, using the same underlying client:
  1. **On problem save** (`createProblem` / `updateProblem`) — every language's *reference solution* is run against every test case; the save is rejected if any fail, so a broken problem can never be published.
  2. **On user submission** (`submitSolution`) — the *submitted* code is run against every test case; results are stored on a `Submission` document, and `ProblemSolved` is upserted only if every case passes.
- **Status mapping** — a Judge0 status id is reduced to one of `Accepted`, `Wrong Answer`, `Compile Error`, `Time Limit Exceeded`, or `Runtime Error` for storage and display.

<br/>

## 🔄 Client-Side State Management

- **Server state** (problems, sessions, submissions, current user) lives entirely in **TanStack Query**, one hook file per resource (`useProblems`, `useSessions`, `useSubmissions`, `useCurrentUser`). Mutations invalidate the relevant query keys on success (e.g. creating a problem invalidates `["problems"]`).
- **`useSessionById` polls every 5 seconds** (`refetchInterval: 5000`) so that both participants see status changes (e.g. the session being ended) without a websocket.
- **`useCurrentUser` has custom retry logic** — up to 8 retries on a `404`, since the Inngest-driven `User` record can take a moment to exist right after Clerk sign-up; other errors fall back to the default 3 retries.
- **Local UI state** (selected language, current code buffer, modal open/closed, run output) is plain `useState` — it's intentionally *not* synced across users or persisted across reloads.

<br/>

## ✅ Validation & Error Handling

- **Client-side forms** use **Zod** schemas (`problemSchema.js`) resolved through React Hook Form (`zodResolver`) — the admin problem form won't submit until every language's starter code, examples, and at least one test case are filled in.
- **Server-side controllers** wrap every handler in `try/catch`, log the error server-side, and return a JSON `{ message }` with an appropriate status code (`400` for missing fields, `403` for a role check failure, `404` for a missing document, `409` for a conflict like "session is full," `500` for anything unexpected).
- **User-facing errors** surface as toasts via `react-hot-toast`, driven by each TanStack Query mutation's `onError`, generally showing the server's `message` when present.
- **Grading failures during problem authoring** return the *specific failing test case* (input, expected output, actual output/stderr) in the `400` response, so an admin can fix a broken reference solution without guessing which case failed.

<br/>

## 🛡 Security Notes

- No password is ever handled by this codebase — Clerk owns credential storage, MFA, and session issuance entirely.
- Every protected route re-derives `req.user` from the database on every request (via `protectRoute`) rather than trusting client-supplied identity — a client cannot claim to be a different user or an admin by editing a request body.
- Hidden test cases and reference solutions are stripped server-side before any non-admin response leaves the API — they are never sent to the client and then hidden only by the UI.
- Secrets (`CLERK_SECRET_KEY`, `STREAM_API_SECRET`, `CODEBOX_AUTH_TOKEN`, `MONGO_DB_URI`) live only in `backend/.env`, never in frontend code or in any client-visible bundle.
- CORS is restricted to a single configured `CLIENT_URL` origin with `credentials: true`, rather than left open to `*`.

<br/>

## 🧑‍💻 Developer Experience

- **ESM everywhere** — both `frontend` and `backend` `package.json`s declare `"type": "module"`; there's no CommonJS/ESM mixing to reason about.
- **Thin, resource-shaped API layer** — `frontend/src/api/*.js` are one-file-per-resource axios wrappers with no business logic, making every hook in `frontend/src/hooks/*` a thin TanStack Query wrapper around a single, obvious function call.
- **Consistent controller shape** — every backend controller follows the same `try { … } catch (error) { console.error(...); res.status(...).json({ message }) }` pattern, making the codebase predictable to extend.
- **Shared admin form component** — `ProblemForm.jsx` is used for both create and edit, parameterized by `defaultValues` / `onSubmit` / `submitLabel`, instead of two near-duplicate forms.
- **DaisyUI + Tailwind** components (`card`, `badge`, `btn`, `modal`, `stats`, `alert`) keep the UI visually consistent without a custom component library to maintain.

<br/>

## ⚠️ Known Limitations & Design Trade-offs

Being upfront about this matters more than pretending it's flawless:

- **No live code sync between host and participant.** Each person's editor is independent local state — this is a video/chat pairing tool with a shared judge, not a collaborative editor like CodePen Collab or VS Code Live Share. Adding operational-transform or CRDT-based code sync is a real architectural addition, not a small tweak (see [Roadmap](#-roadmap)).
- **Judge0/CodeBox is an external dependency you must run or provision yourself.** There's no bundled Docker Compose for it in this repo yet — `CODEBOX_API_URL` must point at a working instance for grading (and even problem creation) to work at all.
- **Session polling, not push.** `useSessionById` refetches every 5 seconds rather than subscribing to a websocket for session-level state (host/participant changes, session end) — video and chat are real-time via Stream, but session metadata has a small lag.
- **No rate limiting** on submission or session-creation endpoints yet — a user could hammer `/submit` and burn through Judge0 quota.
- **Promoting a user to admin is a manual database operation** — there's no in-app "make this user an admin" flow beyond the initial `ADMIN_EMAILS` bootstrap at signup.
- **The problem bank's text index is unused** by the current UI — there's no search box wired up to it yet.

<br/>

## 🗺 Roadmap

**Near-term**
- [ ] Search/filter UI on `/problems` that uses the existing `title`/`tags` text index
- [ ] Rate limiting on `/submit` and session creation
- [ ] In-app admin promotion flow (instead of a manual database edit)
- [ ] Bundled Docker Compose for a self-hosted Judge0/CodeBox instance

**Mid-term**
- [ ] Websocket-driven session updates instead of 5-second polling
- [ ] Session history detail view (past submissions, per-participant results)
- [ ] More languages (C++, Go) in the judge + editor

**Long-term**
- [ ] Optional collaborative code editing within a session (CRDT-based)
- [ ] Company-tagged / topic-tagged problem sets and curated tracks
- [ ] Session recordings / post-session summaries

<br/>

## 🚢 Deployment

There is no Next.js/Vercel-style split here — `server.js` is written to **serve the built frontend from the same Express process** when `NODE_ENV=production`:

```js
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
```

This makes the app deployable as a **single monolithic Node service** — Render, Railway, Fly.io, a VPS with PM2/systemd, or any platform that can run `npm run build && npm start`.

### Production checklist

- [ ] Set `NODE_ENV=production`
- [ ] Set every variable from [Environment Variables](#-environment-variables) in the host's env panel — nothing is committed to the repo
- [ ] Point `CLIENT_URL` at your actual deployed origin (CORS will otherwise block the frontend)
- [ ] Point `CODEBOX_API_URL` at a production-grade Judge0 instance with enough capacity for concurrent submissions
- [ ] Configure the Clerk → Inngest webhook forwarding (or the Inngest Dev Server equivalent) so `user.created`/`user.deleted` reach `/api/inngest` in production
- [ ] Set `ADMIN_EMAILS` *before* your production admin account signs up for the first time

<br/>

## 📸 Screenshots

> Screenshots aren't checked into the repo yet — this is the shot list to capture and drop into `docs/screenshots/`, then link from the hero section at the top of this file.

| Screenshot | What it should show |
|---|---|
| **Dashboard** | Welcome section, stats cards, active sessions list, recent sessions list |
| **Problems list** | Difficulty badges, solved indicators, admin edit/delete controls visible |
| **Solo problem view** | Problem description + Monaco editor + output panel with a passing result |
| **Live session** | Split layout: problem/editor/output on the left, active video call on the right |
| **Session chat** | The collapsible chat panel open mid-call |
| **Admin problem form** | The multi-language tabbed editor with a validation error visible |

**Suggested GIF recordings:** (1) creating a session end-to-end and landing in the call, (2) submitting a solution and watching the per-test-case output panel populate, (3) the confetti moment on an Accepted submission.

**Suggested demo video outline:** 0:00 landing page → 0:15 sign-up → 0:30 solving a problem solo → 1:00 creating a session → 1:20 a second browser/participant joining → 1:45 both editors + shared video/chat → 2:15 submitting and getting Accepted → 2:30 a quick admin-side problem creation.

<br/>

## 🧪 Testing

No automated test suite exists in this repository yet. For a codebase this shape, the recommended starting point is:

- **Backend** — [Vitest](https://vitest.dev) or Jest + [Supertest](https://github.com/ladjs/supertest) for controller/route integration tests, with a `mongodb-memory-server` instance so tests don't touch a real database
- **Frontend** — [Vitest](https://vitest.dev) + [React Testing Library](https://testing-library.com/react) for component/hook tests, mocking `axiosInstance` at the network boundary
- **E2E** — [Playwright](https://playwright.dev), given the app is a single authenticated SPA with a handful of critical flows (sign-up → solve → create session → join → submit)

<br/>

## 🤝 Contributing

1. Fork the repository and create a feature branch: `git checkout -b feature/your-feature`
2. Keep backend and frontend changes in their respective workspaces — there's no shared package between them beyond the root `package.json`
3. Match the existing controller pattern (`try/catch` → `{ message }` JSON errors) and the existing hook pattern (one TanStack Query hook per API call) for consistency
4. Run `npm run lint` in `frontend/` before committing UI changes (ESLint is configured there; the backend has no linter configured yet)
5. Open a pull request describing **what** changed and **why** — screenshots or a short clip are appreciated for UI changes

<br/>

## ❓ FAQ

**Does grading use an LLM?**
No. Code is executed and graded against real test cases by a Judge0-compatible sandbox — no AI is involved in correctness checking.

**Can I use this without a partner?**
Yes — every problem is fully solvable and gradeable from `/problem/:id` with no session involved.

**Can more than two people join one session?**
No — a `Session` has exactly one `host` and one optional `participant`; a third joiner is rejected with `409 Session is full`.

**How does someone become an admin?**
Their email must be listed in `ADMIN_EMAILS` **at the moment they first sign up** — the role is assigned once, in the `sync-user` Inngest function, and isn't re-evaluated afterward.

**What happens to a problem's hidden test cases if I'm not an admin?**
They're never sent to your browser in the first place — `testCases` and `referenceSolutions` are deleted from the response object server-side for any non-admin request.

**Why isn't the code editor shared live between two people in a session?**
It's an intentional, current scope boundary — see [Known Limitations](#-known-limitations--design-trade-offs) and [Roadmap](#-roadmap).

<br/>

## 🙏 Acknowledgements

- [Clerk](https://clerk.com) — authentication
- [Stream](https://getstream.io) — video calling and chat infrastructure
- [Inngest](https://www.inngest.com) — event-driven background functions
- [Codebox](https://github.com/hiteshchoudhary/Codebox) — the execution-engine API shape this project's grading client is built against
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) — the code editor also used by VS Code
- [DaisyUI](https://daisyui.com) — Tailwind CSS component library
- [TanStack Query](https://tanstack.com/query) — async/server state management

<br/>

## 📄 License

No license file is currently included in this repository, which by default means **all rights are reserved** — others may view the source but have no legal right to reuse, modify, or redistribute it. If you intend for this project to be open source, add a `LICENSE` file (e.g. [MIT](https://choosealicense.com/licenses/mit/) is the common default for portfolio projects) so the badge and this section can be updated accordingly.

<br/>

## 👤 Author

**Abhijeeth K V**
Final-year Computer Science Engineering student, RNS Institute of Technology, Bengaluru

[![GitHub](https://img.shields.io/badge/GitHub-abhijeethkv17-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/abhijeethkv17)
<!-- Add your LinkedIn and portfolio links here, e.g.:
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/your-handle)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-000000?style=flat-square&logo=vercel&logoColor=white)](https://your-portfolio.dev)
-->

<div align="center">
<sub>⭐ If PairPrep-IQ was useful as a reference or a study tool, consider starring the repo.</sub>
</div>
