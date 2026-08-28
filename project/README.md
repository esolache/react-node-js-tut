# Project Name

Full-stack scaffold: React (Vite) frontend + Node/Express backend.

## Structure

```
.
├── frontend/                  # React app (Vite)
│   ├── public/                 # Static files served as-is (favicon, etc.)
│   └── src/
│       ├── assets/             # Images, logos, icons — TODO: add real logo
│       ├── components/
│       │   ├── Header/         # Top utility bar + main nav
│       │   ├── common/         # Shared UI (Button, etc.)
│       │   └── Footer.jsx
│       ├── pages/               # One file per route (Home, Contact, ...)
│       ├── hooks/               # Custom React hooks
│       ├── utils/               # Shared helper functions
│       ├── styles/              # Global CSS (Tailwind entrypoint)
│       ├── App.jsx              # Route definitions
│       └── main.jsx             # React root / providers
│
└── backend/                   # Node/Express API
    ├── src/
    │   ├── routes/             # Route definitions, grouped by resource
    │   ├── controllers/        # Route handler logic
    │   ├── middleware/         # Express middleware (error handler, etc.)
    │   ├── config/             # DB connection, env-driven config
    │   └── models/             # Data models/schemas
    └── server.js               # App entry point
```

## Getting started

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Runs at `http://localhost:3001`. Health check: `GET /api/health`.

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Runs at `http://localhost:5173`. API calls to `/api/*` are proxied to the
backend in dev (see `vite.config.js`).

## Pages / Routes

| Route          | Page              |
|----------------|-------------------|
| `/`            | Home              |
| `/book-online` | Book Online       |
| `/contact`     | Contact (live form → `POST /api/contact`) |
| `/about`       | About             |

## Header

`src/components/Header/Header.jsx` renders:
- A top utility bar (black) with **Book Online** and **Contact** buttons.
- A main nav bar (red) with **Home / Book Online / Contact / About** links.

Colors and placeholder copy are marked `TODO` throughout — swap in real
branding, logo, phone number, and copy before shipping.

## Next steps

- [ ] Replace placeholder logo/copy/colors (`tailwind.config.js` brand colors)
- [ ] Wire up a real database in `backend/src/config/db.js`
- [ ] Implement `POST /api/bookings`
- [ ] Add persistence + email notification to `POST /api/contact`
- [ ] Add a mobile nav drawer (currently a placeholder "Menu" button)
