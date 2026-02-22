# MediConnect 🏥

**Connecting Hospitals. Saving Lives.**

A real-time collaborative hospital interoperability platform built for the Indian healthcare ecosystem. MediConnect connects hospitals into a unified network for instant bed visibility, secure patient record exchange, and coordinated emergency response.

---

## 🌟 Features

### Public Website

- **Landing Page** — Animated hero, stats, problem statement, solution pillars, pricing preview, roadmap
- **Product Page** — Deep-dive into 3 core pillars with feature comparison table
- **Pricing Page** — 3-tier pricing with monthly/annual toggle & interactive savings calculator
- **About Page** — Mission/vision, team profiles, company timeline
- **Contact Page** — Contact form, live status indicator, 4-hour response SLA
- **Demo Experience** — Three-stage flow: Request Page → Personalised Confirmation → Interactive Sandbox Dashboard
- **Simulated Sandbox** — Fully interactive `/demo/sandbox` with mock data for training and sales demos

### Authenticated Dashboard

- **Overview** — Role-based views (Super Admin / Hospital Admin / Doctor)
- **Patients** — Searchable database, slide-out detail panel, consent management
- **Bed Management** — Real-time bed tracking across ICU, General, Ventilator wards
- **Inventory** — Medicine, equipment & blood bank tracking with predictive alerts
- **Emergency Network** — Hospital network map, active emergencies, quick transfers
- **Reports** — Admission trends, occupancy charts, inventory analytics
- **Settings** — Profile, security (2FA), API keys, notification preferences

### Backend Infrastructure

- **14 Data Models** — Hospital, User, Patient, Admission, Bed, InventoryItem, Transfer, MedicalRecord, Consent, EmergencyAlert, AuditLog, and more
- **RESTful API** — Complete CRUD endpoints for all entities
- **Auth** — NextAuth v5 with Google OAuth + Credentials + 2FA support
- **Route Protection** — Middleware guards on all dashboard & API routes

---

## 🛠 Tech Stack

| Layer             | Technology                         |
| ----------------- | ---------------------------------- |
| **Framework**     | Next.js 16 (App Router, Turbopack) |
| **Language**      | TypeScript                         |
| **Styling**       | Tailwind CSS v4                    |
| **UI Components** | Radix UI primitives                |
| **Animations**    | Framer Motion                      |
| **Charts**        | Recharts                           |
| **Icons**         | Lucide React                       |
| **Auth**          | NextAuth v5 (Google + Credentials) |
| **Database**      | PostgreSQL (via Prisma ORM)        |
| **Real-time**     | Socket.io (planned)                |

---

## 📁 Project Structure

```
mediconnect/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── login/page.tsx              # Authentication
│   ├── demo/page.tsx               # Demo request form
│   ├── product/page.tsx            # Product features deep-dive
│   ├── pricing/page.tsx            # Pricing with calculator
│   ├── about/page.tsx              # Company info & team
│   ├── contact/page.tsx            # Contact form
│   ├── globals.css                 # Design system & utilities
│   ├── api/
│   │   ├── auth/[...nextauth]/     # NextAuth handler
│   │   ├── hospitals/              # Hospital CRUD
│   │   ├── patients/               # Patient CRUD
│   │   ├── beds/                   # Bed management
│   │   ├── inventory/              # Inventory tracking
│   │   ├── transfers/              # Patient transfers
│   │   └── emergency/              # Emergency alerts
│   └── dashboard/
│       ├── layout.tsx              # Sidebar + top bar shell
│       ├── page.tsx                # Role-based overview
│       ├── patients/page.tsx       # Patient management
│       ├── beds/page.tsx           # Bed tracking
│       ├── inventory/page.tsx      # Stock management
│       ├── emergency/page.tsx      # Emergency coordination
│       ├── reports/page.tsx        # Analytics & reports
│       └── settings/page.tsx       # System settings
├── lib/
│   ├── auth.ts                     # NextAuth configuration
│   ├── prisma.ts                   # Prisma client singleton
│   └── utils.ts                    # Helper utilities (cn, etc.)
├── prisma/
│   └── schema.prisma               # Database schema (14 models)
├── middleware.ts                    # Auth route protection
├── tailwind.config.ts              # Theme & color system
├── .env.example                    # Environment variables template
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **PostgreSQL** 14+ (or use Docker)
- **npm** or **pnpm**

### 1. Clone & Install

```bash
git clone https://github.com/your-username/mediconnect.git
cd mediconnect
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your values:

- `DATABASE_URL` — Your PostgreSQL connection string
- `AUTH_SECRET` — Generate with `npx auth secret`
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — From [Google Cloud Console](https://console.cloud.google.com/apis/credentials)

### 3. Set Up Database

```bash
npx prisma generate
npx prisma db push
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

### 5. (Optional) Seed Sample Data

```bash
npx prisma db seed
```

---

## 🔐 Authentication

MediConnect uses **NextAuth v5** with two providers:

1. **Google OAuth** — Sign in with Google (requires Google Cloud project)
2. **Credentials** — Email/password with bcrypt hashing

### 2FA Support

- TOTP-based two-factor authentication using `otplib`
- QR code generation for authenticator app setup
- Enforced on login when enabled

### Role-Based Access

| Role             | Access Level                                  |
| ---------------- | --------------------------------------------- |
| `SUPER_ADMIN`    | Full network — all hospitals, all data        |
| `HOSPITAL_ADMIN` | Single hospital — operations, staff, settings |
| `DOCTOR`         | Patients, records, transfers within hospital  |
| `NURSE`          | Patient vitals, bed status updates            |
| `COORDINATOR`    | Emergency transfers, inventory requests       |

---

## 🗄 Database Models

The Prisma schema defines 14 interconnected models:

- **Hospital** — Core entity with location, capacity, and accreditation
- **User** — Auth users with role-based permissions
- **Patient** — Demographics, ABHA ID, emergency contacts
- **Admission** — Active/discharged/transferred states per patient
- **Bed** — Type (ICU/General/Ventilator), status, ward grouping
- **InventoryItem** — Stock levels with expiry tracking
- **InventoryRequest** — Cross-hospital item requests
- **Transfer** — Patient transfer lifecycle (pending → accepted → completed)
- **MedicalRecord** — Encrypted prescriptions, lab reports, imaging
- **Consent** — Granular patient data sharing permissions
- **EmergencyAlert** — Network-wide severity-based alerts
- **AuditLog** — Complete access logging for compliance

---

## 📡 API Endpoints

| Method | Endpoint         | Description                              |
| ------ | ---------------- | ---------------------------------------- |
| GET    | `/api/hospitals` | List hospitals (filter by city, status)  |
| POST   | `/api/hospitals` | Create hospital                          |
| GET    | `/api/patients`  | Search/paginate patients                 |
| POST   | `/api/patients`  | Register patient                         |
| GET    | `/api/beds`      | List beds (filter by type, status, ward) |
| PATCH  | `/api/beds`      | Update bed status                        |
| GET    | `/api/inventory` | List inventory (filter by category)      |
| POST   | `/api/inventory` | Add inventory item                       |
| GET    | `/api/transfers` | List transfers (directional filter)      |
| POST   | `/api/transfers` | Create transfer request                  |
| PATCH  | `/api/transfers` | Update transfer status                   |
| GET    | `/api/emergency` | List emergency alerts                    |
| POST   | `/api/emergency` | Broadcast emergency alert                |

All API endpoints are protected by authentication middleware.

---

## 🎨 Design System

### Color Palette (Healthcare Standard)

- **Primary Blue**: `#0A5C9E` (Trust, Authority, Enterprise)
- **Secondary Teal**: `#2AA9A1` (Clinical Innovation, Safety)
- **Neutral Surface**: `#F9FAFB` (Cleanliness, Whitespace)
- **Semantic**: Red (Critical), Amber (Warning), Emerald (Operational)

### Spacing & Hierarchy

- **Section Spacing**: 80px (Desktop) / 48px (Mobile)
- **Card Padding**: 24px - 40px
- **Heading Hierarchy**: 56px / 48px / 40px / 24px / 20px / 16px / 14px
- **Line Height**: 1.2 (Headings) / 1.6 (Body)

### Typography

- **Headings**: Plus Jakarta Sans (bold, 800 weight)
- **Body**: Inter (400–600 weight)

### Components

- Glassmorphism cards with `backdrop-filter: blur(20px)`
- Gradient CTAs with hover scale effects
- Color-coded status badges
- Animated counters and transitions

---

## 🗺 Roadmap

### Phase 1 — Current (Q2 2026)

- ✅ Bed & Inventory Sync
- ✅ Patient Record Exchange
- ✅ Emergency Transfers
- ✅ Role-Based Access Control

### Phase 2 — Q3–Q4 2026

- 🔜 AI Patient Load Forecasting
- 🔜 Demand Prediction for Inventory
- 🔜 Mobile App for Emergency Crew
- 🔜 Automated Transfer Recommendations

### Phase 3 — 2027

- 📋 Insurance API Integration
- 📋 Government Health Grid
- 📋 National Blood Bank Network
- 📋 Telemedicine Integration

---

## 📦 Deployment

### Vercel (Recommended)

```bash
npm run build
# Deploy via Vercel CLI or git push
```

### Docker

```bash
docker build -t mediconnect .
docker run -p 3000:3000 mediconnect
```

### Environment Variables for Production

All variables from `.env.example` must be set in your deployment platform.

---

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

<p align="center">
  Built with ❤️ in India 🇮🇳<br>
  <strong>MediConnect Technologies Pvt. Ltd.</strong> • © 2026
</p>
