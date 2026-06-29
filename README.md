# 🐦 Sparrow AI — Customer Support Chat

An AI-powered customer support chat widget built as a hiring assignment for Spur. Simulates a real live chat support experience where an AI agent answers customer questions using an LLM.

**Live Demo:** https://sparrow-ai-spur.vercel.app  
**Backend API:** https://sparrow-ai-spur-backend.onrender.com  
**GitHub:** https://github.com/Rajaryan99/sparrow-AI-Spur

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/19ab5f36-fff6-4a67-b00e-56ca9f6828c7" />


---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React, Vite, Context API |
| Backend | Node.js, TypeScript, Express |
| Database | PostgreSQL |
| LLM | OpenRouter (openai/gpt-oss-120b:free) |
| Deployment | Vercel (frontend), Render (backend) |

---

## Run Locally

### Prerequisites
- Node.js v18+
- PostgreSQL installed and running

---

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/sparrow
OPENROUTER_API_KEY=your_openrouter_api_key_here
PORT=3000
```

**Run DB migrations:**

```bash
psql -h localhost -U postgres -d sparrow -c "
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID REFERENCES threads(id) ON DELETE CASCADE,
  role TEXT CHECK (role = ANY (ARRAY['user', 'assistant'])),
  content TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW()
);"
```

**Start the backend:**

```bash
npm run dev
```

Server runs at `http://localhost:3000`

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## Environment Variables

### Backend `.env`

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `OPENROUTER_API_KEY` | OpenRouter API key — get one at openrouter.ai |
| `PORT` | Server port (default: 3000) |

> Never commit `.env` to git. Use `.env.example` as a reference.

---

## API Endpoints

| Method | Route | Description |
|---|---|---|
| POST | `/api/chat` | Send a message, get AI reply |
| GET | `/api/all/threads` | Fetch all conversation threads |
| GET | `/api/:id/messages` | Fetch messages for a thread |
| DELETE | `/api/thread/:id` | Delete a thread and its messages |

### POST `/api/chat`

**Request:**
```json
{
  "message": "What is your return policy?",
  "threadId": "optional-uuid"
}
```

**Response:**
```json
{
  "reply": "We accept returns within 15 days of delivery...",
  "threadId": "uuid-of-thread"
}
```

---

## Architecture Overview

```
sparrow-AI-Spur/
├── frontend/                  # React + Vite
│   └── src/
│       ├── components/
│       │   ├── ChatWindow/    # Main chat UI, API calls, loading state
│       │   ├── Chat/          # Message list with typing animation
│       │   └── SideBar/       # Thread history, new chat, delete
│       └── Context.jsx        # Global state management
│
└── backend/                   # Node.js + TypeScript + Express
    ├── routes/
    │   ├── chat.ts            # POST /api/chat — core chat endpoint
    │   ├── getAllThreads.ts    # GET /api/all/threads
    │   ├── getThreadById.ts   # GET /api/:id/messages
    │   └── thread.ts          # DELETE /api/thread/:id
    ├── lib/
    │   ├── db.ts              # PostgreSQL pool connection
    │   └── openRoutes.ts      # LLM integration — generateReply()
    └── server.ts              # Express app entry point
```

### Separation of Concerns
- **Routes** — handle HTTP req/res only
- **lib/openRoutes.ts** — all LLM logic isolated here, easy to swap providers
- **lib/db.ts** — single pool instance shared across routes
- **Frontend Context** — global state for threads, messages, prompt, loading

### Interesting Design Decisions
- UUID primary keys for threads and messages — no sequential ID guessing, safer for public APIs
- Thread title auto-generated from first 50 characters of the user's first message
- Full conversation history passed to LLM on every request — ensures contextual, coherent replies
- Typing animation only triggers on fresh AI replies, not when loading history from DB
- `ON DELETE CASCADE` on messages — deleting a thread auto-deletes all its messages

---

## LLM Notes

**Provider:** OpenRouter  
**Model:** `openai/gpt-oss-120b:free`  
**Max tokens:** 200 per response (cost control)  

**System Prompt Design:**

The system prompt includes:
- Role definition: helpful support agent for Sparrow Store
- Full FAQ knowledge base (shipping, returns, support hours, payment methods)
- Full conversation history on every request for contextual replies

**Error Handling:**
- API errors (rate limit, timeout, invalid key) caught and returned as `503` with a friendly message
- Frontend shows error state without crashing
- Backend never crashes on bad input — all routes wrapped in try/catch

**Guardrails:**
- Empty messages rejected with 400
- Messages over 1000 characters rejected with 400
- Null/undefined LLM replies handled gracefully

---

## Trade-offs & If I Had More Time

- **Auth** — proper session management instead of relying on threadId in request body
- **Rate limiting** — prevent API abuse with express-rate-limit
- **Docker** — containerize backend + DB for easier local setup
- **Better mobile UI** — sidebar collapses on mobile, full responsive layout
]
