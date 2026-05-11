# Wawa Design Studio

Website profesional untuk jasa desain grafis **Wawa Design Studio**, dibangun dengan Next.js, Tailwind CSS, dan Supabase.

## Tech Stack

- **Frontend**: Next.js 16 (App Router) + Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Auth**: Supabase Auth

## Fitur

- Landing Page (Hero, About, Services, Portfolio, Testimonials, Contact)
- Admin Dashboard dengan CRUD (Services, Portfolio, Testimonials)
- Admin Authentication (Login/Logout)
- Contact Form dengan penyimpanan ke database
- Inbox pesan untuk admin
- Responsive design (Mobile-first)
- Protected admin routes via middleware

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Supabase

1. Buat project baru di [supabase.com](https://supabase.com)
2. Copy **Project URL** dan **anon public key** dari Settings > API
3. Edit file `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Setup Database

1. Buka Supabase Dashboard > SQL Editor
2. Copy dan jalankan isi file `supabase/schema.sql`
3. File ini akan membuat semua tabel, RLS policies, dan seed data demo

### 4. Buat Admin User

Di Supabase Dashboard > Authentication > Users > Add User:

- Email: `admin@wawadesign.com`
- Password: (buat password kuat)

### 5. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) untuk melihat website.

## Struktur Project

```
src/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── login/page.tsx           # Admin login
│   ├── admin/
│   │   ├── page.tsx             # Dashboard
│   │   ├── services/page.tsx    # CRUD layanan
│   │   ├── portfolio/page.tsx   # CRUD portfolio
│   │   ├── testimonials/page.tsx # CRUD testimoni
│   │   └── messages/page.tsx    # Inbox pesan
│   └── api/
│       ├── auth/                # Login & Logout
│       ├── services/            # CRUD services
│       ├── portfolio/           # CRUD portfolio
│       ├── testimonials/        # CRUD testimonials
│       └── contact/             # Contact messages
├── components/
│   ├── landing/                 # Landing page components
│   └── admin/                   # Admin components
├── lib/
│   ├── supabase/                # Supabase client config
│   └── types.ts                 # TypeScript types
└── middleware.ts                # Auth middleware
```

## URL Penting

| URL                   | Keterangan                    |
| --------------------- | ----------------------------- |
| `/`                   | Landing page (publik)         |
| `/login`              | Halaman login admin           |
| `/admin`              | Dashboard admin (protected)   |
| `/admin/services`     | Kelola layanan                |
| `/admin/portfolio`    | Kelola portfolio              |
| `/admin/testimonials` | Kelola testimoni              |
| `/admin/messages`     | Inbox pesan dari contact form |
