# Startup Sentiment Analysis Platform

A full-stack, microservice-based intelligence platform to track, analyze, and visualize news sentiment for competing startups.

This project is not just a simple sentiment-tracker. It's a complete data pipeline designed to solve complex, real-world challenges in competitive analysis, including:

  * **Contextual Ambiguity:** Differentiates between a company ("BoAt") and a common noun ("boat").
  * **Targeted Sentiment:** Correctly identifies that positive news for a competitor (like Zomato) is negative news for the company being tracked (like Swiggy).
  * **High-Level Metrics:** Aggregates data into actionable insights like **Share of Voice (SoV)** and **Net Sentiment Score (NSS)**.

**Frontend Repo:** [Bhoumik09/sentiment-analysis-frontend](https://www.google.com/search?q=https://github.com/Bhoumik09/sentiment-analysis-frontend)
**Backend Repo:** [Bhoumik09/sentiment-analysis-backend](https://www.google.com/search?q=https://github.com/Bhoumik09/sentiment-analysis-backend)

**1)Login Page**
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/7aecf42a-f5fb-4ef5-a841-451212b8f235" />

**2)Signup Page**
<img width="965" height="861" alt="image" src="https://github.com/user-attachments/assets/6e5503cc-b6f1-40be-91a2-6f248c68debb" />

**3)Sentiment Dashboard**
<img width="1836" height="931" alt="image" src="https://github.com/user-attachments/assets/8b4b3346-ef40-44e3-abc8-532c644368b6" />

**4)Company List enabled with robust filters and search bar**
<img width="1517" height="912" alt="image" src="https://github.com/user-attachments/assets/07fde588-70d7-4ddd-bb4a-5e51bda7aa85" />

**5)News List enabled with robust filters and search bar**
<img width="1526" height="908" alt="image" src="https://github.com/user-attachments/assets/c5ba50c6-f8ee-44f8-829e-b05ea4dadb2b" />

**6)Company Specific Pages**
<img width="1777" height="882" alt="image" src="https://github.com/user-attachments/assets/bf58a41a-b89d-4973-a5a2-4adfa7611c68" />
<img width="1787" height="916" alt="image" src="https://github.com/user-attachments/assets/0a0f37b5-6860-48d0-8ab4-c13b51838e57" />
<img width="1831" height="937" alt="image" src="https://github.com/user-attachments/assets/fcda5613-972b-4d1a-b8f1-97386b2bfdc7" />
## 📊 Core Features

  * **Trending Dashboards:** See the top 4 startups of the week based on **article volume** and the top 4 "Sentiment Movers" based on **percentage sentiment change**.
  * **Company-Specific Dashboard:** A detailed page for each startup showing its key metrics, competitor comparisons, and a fully paginated feed of its news.
  * **Sentiment Moving Average:** The company page features a time-series graph plotting a 7-day or 30-day moving average of sentiment scores to smooth out daily noise and reveal long-term trends.
  * **Competitor Analysis:** Visual dashboards for comparing competitors' Share of Voice (SoV) and Net Sentiment Score (NSS) over time.
  * **Advanced Article Feed:** A central feed to browse all articles in the database, complete with server-side pagination and filters for industry, sentiment, and startup.

## ✨ In-Depth Technical Features

This project was built with performance, security, and user experience in mind.

### 1\. High-Performance Caching with React Query

The frontend uses **React Query (TanStack Query)** for all data fetching.

  * **Caching:** API calls (e.g., for the trending startups, the main article feed) are cached. If the user navigates away and comes back, the data is served instantly from cache while a fresh fetch runs silently in the background.
  * **Reduced API Calls:** This drastically reduces the number of requests to the backend, making the app feel faster and reducing server load.
  * **State Management:** It eliminates the need for complex global state (like Redux) for server state, simplifying the codebase.'

### 2\. Efficient Searching & Pagination

  * **Debounced Searching:** The search bar in the article feed is debounced. This means an API call is only sent *after* the user stops typing (e.g., for 300ms), preventing the app from spamming the backend API on every keystroke.
  * **Server-Side Pagination:** We display *all* news in the database. To handle this, all pagination is done on the **server** (in the Express.js backend). The frontend simply passes `page` and `limit` parameters. The backend uses Prisma's `skip` and `take` arguments to fetch *only* the 10-20 articles needed for that specific page, ensuring fast loads even with millions of articles.

### 3\. Targeted Sentiment Analysis

This is the "secret sauce" of the project. A basic model fails when an article mentions multiple companies.

  * **Problem:** `"Swiggy's profits soar, beating Zomato."`
  * **Basic Model:** `Sentiment: Positive` (Wrong for Zomato)
  * **Our Solution:** We use a **Zero-Shot Classification** model. This allows us to ask *targeted* questions:
      * **Q1:** What is the sentiment *for Swiggy*? (Labels: `['positive for Swiggy', 'negative for Swiggy']`) -\> **Result:** `positive for Swiggy`
      * **Q2:** What is the sentiment *for Zomato*? (Labels: `['positive for Zomato', 'negative for Zomato']`) -\> **Result:** `negative for Zomato`

## 🏗️ System Architecture

This project is built on a 3-tier microservice architecture to ensure security, scalability, and separation of concerns.

### 1\. Next.js Frontend (The "Face" & Proxy)

The user-facing dashboard. Its server acts as a **secure proxy** (a "Backend-for-Frontend").

  * **How it works:** The user's browser *never* talks to the data API. It only talks to the Next.js server's API routes (e.g., `/api/trending`). The Next.js server then secretly calls the *real* Express backend, adding a secret API key.
  * **Why:** This hides our entire backend infrastructure and protects our database from the public internet.

### 2\. Express.js API (The "Secure Guardian")

This is the *only* service that is allowed to talk to the database.

  * **Role-Based Access Control (RBAC):** This backend has middleware that checks for user roles (e.g., `User` vs. `Admin`). `Admin` roles might have permission to delete articles or manage startups, while `User` roles are read-only. The frontend also checks this role to hide or show UI elements (like a "Delete" button).
  * **Advanced Queries:** This service runs the complex, raw SQL queries (using `prisma.$queryRaw`) needed to calculate statistics like weekly article counts and sentiment percentage changes.

### 3\. Python ETL Service (The "Brains")

A separate, background worker service that performs all the heavy lifting. It runs on a schedule to fetch, analyze, and load data into the database.

  * **Smart Fetching:** Runs 3-5 *broad, consolidated queries* for entire sectors (e.g., "Fintech", "EdTech") to reduce API calls.
  * **Smart Filtering:** Uses the **Aho-Corasick algorithm** (`pyahocorasick`) to find all 30+ startup names in a batch of articles in a single, ultra-fast pass.
  * **Smart Saving:** Saves data to our **Many-to-Many** schema, correctly linking one article to multiple startups with different sentiments.

## 🛠️ Technology Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** (UI & Proxy) | Next.js (React), TypeScript, **React Query**, Tailwind CSS, Recharts |
| **Backend** (Secure API) | Node.js, Express.js, TypeScript, **Prisma**, PostgreSQL |
| **ETL** (Data Pipeline) | Python, Hugging Face `transformers`, `pyahocorasick`, `psycopg2` |
| **Database** | PostgreSQL |
| **News API** | [NewsAPI.org](https://newsapi.org/) (or similar) |

## 🚀 Getting Started (Local Setup)

To run the full system, you must run all three components (Database, Backend, Frontend) plus the Python script.

### 1\. Database

1.  Install and run [PostgreSQL](https://www.postgresql.org/).
2.  Create a new database (e.g., `sentiment_db`).

### 2\. Backend (Express.js)

1.  Clone the backend repo:
    ```sh
    git clone https://github.com/Bhoumik09/sentiment-analysis-backend.git
    cd sentiment-analysis-backend
    ```
2.  Install dependencies: `npm install`
3.  Create a `.env` file:
    ```.env
    
    DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/sentiment_db"
    PORT=8000
    SECRET_KEY="your-secret-key"
    NODE_ENV="development"
    ```
4.  Run migrations to create the database schema:
    ```sh
    npx prisma migrate dev --name "init"
    ```
5.  Seed the `Sector` table (run the `createSectors.ts` script you made).
6.  Run the backend server:
    ```sh
    npm run dev
    ```
    Your API will be live at `http://localhost:8000`.

### 3\. Frontend (Next.js)

1.  In a **new terminal**, clone the frontend repo:
    ```sh
    git clone https://github.com/Bhoumik09/sentiment-analysis-frontend.git
    cd sentiment-analysis-frontend
    ```
2.  Install dependencies: `npm install`
3.  Create a `.env.local` file:
    ```.env.local
      BACKEND_URL=http://localhost:5000
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME='your cloud name'
    CLOUDINARY_API_KEY=your-cloudinary-api
    CLOUDINARY_API_SECRET=your-cloudinary-api-secret
     JWT_SECRET_KEY="your jwt secret:
    ```
4.  Run the frontend server:
    ```sh
    npm run dev
    ```
    Your app will be live at `http://localhost:3000`.

### 4\. ETL Service (Python)

Refer Repo **https://github.com/SoumilMalik24/SentimentFlow-V2** by **github.com/SoumilMalik24**

