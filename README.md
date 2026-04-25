# Next.js Premium CRUD with Prisma & PostgreSQL

Ye ek simple lekin premium Task Management App hai jo Next.js, Prisma, aur PostgreSQL use karke banayi gayi hai.

## Features ✨

- **Full CRUD**: Tasks add, read, update, aur delete kar sakte hain.
- **Server Actions**: Saara backend logic Next.js Server Actions se handled hai.
- **Prisma 7**: Latest Prisma architecture (Driver Adapters ke saath) use hui hai.
- **Premium UI**: Ek sleek "Obsidian" dark theme vanilla CSS se design kiya gaya hai.
- **Inline Editing**: Tasks ka naam directly UI se change kiya ja sakta hai.

## Tech Stack 🛠️

- **Frontend**: Next.js (App Router)
- **Database**: PostgreSQL (Neon.tech recommended)
- **ORM**: Prisma 7
- **Styling**: Vanilla CSS

## Setup Kaise Karein (Step-by-Step) 🚀

1.  **Dependencies Install Karein**:
    ```bash
    npm install
    ```

2.  **Environment Variables Set Karein**:
    `.env` file mein apni PostgreSQL connection string daalein:
    ```env
    DATABASE_URL="postgresql://user:password@host:port/dbname?sslmode=verify-full"
    ```

3.  **Database Migration**:
    Tables create karne ke liye ye command run karein:
    ```bash
    npx prisma migrate dev --name init
    ```

4.  **App Start Karein**:
    ```bash
    npm run dev
    ```

## Code Ki Samjh (Project Structure) 📂

- `prisma/schema.prisma`: Database ka naksha (Table structure).
- `src/lib/prisma.ts`: Database connection ka logic (Singleton pattern).
- `src/app/actions.ts`: Backend ke saare kaam (Add, Delete, Edit).
- `src/app/page.tsx`: Main dashboard screen.
- `src/app/components/TodoItem.tsx`: Ek single task aur uske actions ka component.
- `src/app/globals.css`: Premium dark mode styles.

---
Banaaya gaya hai **Antigravity AI** ke dwara. Seekhte rahiye! 🚀
