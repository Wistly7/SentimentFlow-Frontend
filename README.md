# SentimentFlow — Frontend

A modern, full-stack intelligence platform to track, analyze, and visualize news sentiment for competing startups. Built with **Next.js**, **TypeScript**, and **React Query**.

> **Backend Repo →** [Wistly7/SentimentFlow-Backend](https://github.com/Wistly7/SentimentFlow-Backend)

---

## 📸 Screenshots

**Login Page**

<img width="1920" height="1080" alt="Login Page" src="https://github.com/user-attachments/assets/7aecf42a-f5fb-4ef5-a841-451212b8f235" />

**Signup Page**

<img width="965" height="861" alt="Signup Page" src="https://github.com/user-attachments/assets/6e5503cc-b6f1-40be-91a2-6f248c68debb" />

**Sentiment Dashboard**

<img width="1836" height="931" alt="Sentiment Dashboard" src="https://github.com/user-attachments/assets/8b4b3346-ef40-44e3-abc8-532c644368b6" />

**Company List — Filters & Search**

<img width="1517" height="912" alt="Company List" src="https://github.com/user-attachments/assets/07fde588-70d7-4ddd-bb4a-5e51bda7aa85" />

**News Feed — Filters & Search**

<img width="1526" height="908" alt="News Feed" src="https://github.com/user-attachments/assets/c5ba50c6-f8ee-44f8-829e-b05ea4dadb2b" />

**Company-Specific Dashboard**

<img width="1777" height="882" alt="Company Page 1" src="https://github.com/user-attachments/assets/bf58a41a-b89d-4973-a5a2-4adfa7611c68" />
<img width="1787" height="916" alt="Company Page 2" src="https://github.com/user-attachments/assets/0a0f37b5-6860-48d0-8ab4-c13b51838e57" />
<img width="1831" height="937" alt="Company Page 3" src="https://github.com/user-attachments/assets/fcda5613-972b-4d1a-b8f1-97386b2bfdc7" />

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| **Trending Dashboards** | Top startups of the week by article volume and biggest sentiment movers by percentage change |
| **Company Dashboard** | Per-company metrics, competitor comparisons, and a paginated news feed |
| **Sentiment Moving Average** | 7-day / 30-day smoothed time-series graphs to reveal long-term trends |
| **Competitor Analysis** | Side-by-side Share of Voice (SoV) and Net Sentiment Score (NSS) charts |
| **Advanced Article Feed** | Centralized feed with server-side pagination, industry/sentiment/startup filters, and debounced search |

---

## 🧠 How It Works

### Secure Proxy Architecture (BFF)

The Next.js server acts as a **Backend-for-Frontend** proxy. The user's browser never communicates directly with the data API — all requests go through Next.js API routes, which attach a secret API key before forwarding to the Express.js backend. This keeps the entire backend infrastructure hidden from the public internet.

### Targeted Sentiment Analysis

A basic sentiment model fails when an article mentions multiple companies. SentimentFlow uses **Zero-Shot Classification** to ask *targeted* questions per company:

| Article | Question | Result |
| :--- | :--- | :--- |
| *"Swiggy's profits soar, beating Zomato."* | Sentiment *for Swiggy*? | ✅ Positive |
| | Sentiment *for Zomato*? | ❌ Negative |

### High-Performance Caching

All data fetching is handled by **React Query (TanStack Query)**:

- **Instant cache hits** — data is served from cache while a background refetch runs silently.
- **Reduced API calls** — drastically fewer requests to the backend.
- **No Redux needed** — server state is managed entirely via React Query.

### Smart Searching & Pagination

- **Debounced search** — API calls fire only after the user stops typing (~300 ms).
- **Server-side pagination** — the backend uses Prisma's `skip`/`take` for efficient page-level queries, even with millions of articles.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | Next.js 16, React 18, TypeScript |
| **Data Fetching** | React Query (TanStack Query) |
| **Styling** | Tailwind CSS 4, Radix UI, Geist Font |
| **Charts** | Recharts |
| **Auth** | JWT (via `jose`), js-cookie |
| **Media** | Cloudinary (next-cloudinary) |
| **Validation** | Zod, React Hook Form |
| **Animations** | GSAP |

---

## 🏗️ System Architecture

```
┌─────────────────────┐     ┌──────────────────────┐     ┌───────────────┐
│   Next.js Frontend  │────▶│  Express.js Backend  │────▶│  PostgreSQL   │
│   (UI & BFF Proxy)  │     │  (Secure API + RBAC) │     │  (via Prisma) │
└─────────────────────┘     └──────────────────────┘     └───────────────┘
                                                                ▲
                                                                │
                                                    ┌───────────┴──────────┐
                                                    │  Python ETL Service  │
                                                    │  (Sentiment Engine)  │
                                                    └──────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- The [SentimentFlow-Backend](https://github.com/Wistly7/SentimentFlow-Backend) running locally or deployed

### Installation

```bash
git clone https://github.com/Wistly7/SentimentFlow-Frontend.git
cd SentimentFlow-Frontend
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
JWT_SECRET_KEY=your-jwt-secret
```

### Run

```bash
npm run dev
```

The app will be live at **http://localhost:3000**.

---

## 📁 Project Structure

```
├── app/
│   ├── (auth)/          # Login & Signup pages
│   ├── actions/         # Server actions
│   ├── dashboard/       # Dashboard pages (trending, company, news feed)
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx         # Landing page
├── components/          # Reusable UI components (Radix-based)
├── context/             # React context providers
├── hooks/               # Custom React hooks
├── lib/                 # Utilities and helpers
├── middleware.ts        # Auth middleware
├── public/              # Static assets
├── styles/              # Additional stylesheets
└── types/               # TypeScript type definitions
```

---

## 🔗 Related Repositories

| Repository | Description |
| :--- | :--- |
| [SentimentFlow-Backend](https://github.com/Wistly7/SentimentFlow-Backend) | Express.js API — handles auth, RBAC, and all database operations |
| [SentimentFlow-ETL](https://github.com/SoumilMalik24/SentimentFlow-ETL) | Python ETL service — news fetching, sentiment analysis, and data loading |

---

## 📜 License

This project is licensed under the ISC License.
