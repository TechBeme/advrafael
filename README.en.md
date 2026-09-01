<div align="center">

# ⚖️ Dr. Rafael Vieira — Attorney at Law

**Institutional website with intelligent virtual assistant and automated scheduling**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Vercel AI SDK](https://img.shields.io/badge/Vercel%20AI%20SDK-5.0-000?logo=vercel)](https://sdk.vercel.ai/)
[![Google Calendar](https://img.shields.io/badge/Google%20Calendar-API-4285F4?logo=googlecalendar)](https://developers.google.com/calendar)

**🌐 [advrafael.com.br](https://advrafael.com.br)**

**Languages:** 🇧🇷 [Português](README.md) • [🇪🇸 Español](README.es.md)

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Technologies](#-technologies)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Deployment](#-deployment)
- [Project Structure](#-project-structure)
- [License](#-license)

---

## 🎯 About the Project

Modern institutional landing page for a law firm, developed with a focus on **conversion** and **user experience**. The highlight is **Clara**, an AI virtual assistant that naturally converses with visitors, understands their legal needs, and schedules consultations directly in the attorney's Google Calendar.

### ✨ Highlights

| Feature | Description |
|---------|-----------|
| 🤖 **AI Assistant** | Clara uses Gemini 2.5 Flash for natural conversations in Portuguese |
| 📅 **Automated Scheduling** | Integration with Google Calendar via Service Account |
| 🎙️ **Voice Input** | Real-time audio transcription with Whisper |
| 📱 **Responsive Design** | Fluid interface from mobile to desktop |
| ⚡ **Performance** | SSR with Next.js 16 and image optimization |
| ♿ **Accessibility** | WCAG AA compliance, skip links and visible focus |
| 🔒 **Compliance** | LGPD and OAB standards respected |

---

## 🚀 Features

### 🤖 Clara Virtual Assistant

Clara is a conversational assistant that:

- **Welcomes** the visitor and understands their legal situation
- **Collects** information (name, WhatsApp, service preference)
- **Queries** Dr. Rafael's calendar in real-time
- **Schedules** consultations following business rules:
  - ⏰ Business hours: 9am-12pm and 1pm-6pm (Brasília time)
  - 📆 Weekdays only (no national holidays)
  - ⏳ Minimum 24 hours in advance
  - 🕐 1-hour consultations with 15-minute intervals

```
📱 User: "I need help with a contract"
🤖 Clara: "Hello! I can help you with that. Contracts 
    are one of Dr. Rafael's specialties. Tell me a 
    bit more: is it drafting a new contract or 
    reviewing an existing one?"
```

### 🎙️ Voice Transcription

- Direct audio recording in chat
- Transcription via Whisper API (Google)
- Automatic text conversion
- Mobile-first experience

### 📄 Landing Page Sections

| Section | Content |
|---------|----------|
| **Hero** | Presentation with credentials (UFMG, Public Defender's Office, DAJ) |
| **Practice Areas** | Civil, Consumer, and Family Law with detailed topics |
| **About** | Professional background and service differentials |
| **Process** | How the service works in 4 steps |
| **FAQ** | Frequently asked questions in accordion |
| **Contact** | Validated form + WhatsApp integration |

### 📧 Contact System

- Field validation with Zod
- Sending via SMTP (Nodemailer)
- Visual feedback for success/error
- Fallback to log in development

---

## 🛠️ Technologies

### Frontend
| Technology | Version | Use |
|------------|---------|-----|
| Next.js | 16.0.7 | React framework with App Router |
| React | 19.2.1 | UI library |
| TypeScript | 5.x | Static typing |
| Tailwind CSS | 3.4 | Utility-first styling |
| Motion | 12.x | Fluid animations |
| React Icons | 5.5 | Icons (Feather + Font Awesome) |

### Backend & AI
| Technology | Use |
|------------|-----|
| Vercel AI SDK | AI streaming and tool calling |
| Google Gemini 2.5 Flash | Clara's language model |
| Google Calendar API | Event reading and creation |
| Nodemailer | SMTP email sending |

### Quality
| Tool | Use |
|------|-----|
| ESLint | Code linting |
| Prettier | Consistent formatting |
| Zod | Schema validation |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Landing   │  │   Chat      │  │   Contact           │  │
│  │   Page      │  │   Popup     │  │   Form              │  │
│  └─────────────┘  └──────┬──────┘  └──────────┬──────────┘  │
│                          │                     │             │
└──────────────────────────┼─────────────────────┼─────────────┘
                           │                     │
                           ▼                     ▼
┌─────────────────────────────────────────────────────────────┐
│                      API ROUTES                              │
│  ┌──────────────────────┐      ┌───────────────────────┐    │
│  │  /api/assistente     │      │  /api/contato         │    │
│  │  ├── POST (chat)     │      │  └── POST (email)     │    │
│  │  └── /transcribe     │      └───────────────────────┘    │
│  └──────────┬───────────┘                                   │
│             │                                                │
│             ▼                                                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              TOOL CALLING (AI SDK)                    │   │
│  │   ┌─────────────┐          ┌─────────────────┐       │   │
│  │   │ ver_agenda  │          │    agendar      │       │   │
│  │   │ (read)      │          │  (create)       │       │   │
│  │   └──────┬──────┘          └────────┬────────┘       │   │
│  └──────────┼─────────────────────────┼─────────────────┘   │
│             │                          │                     │
└─────────────┼──────────────────────────┼─────────────────────┘
              │                          │
              ▼                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                         │
│  ┌─────────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │ Google Gemini   │  │   Google    │  │   SMTP          │  │
│  │ 2.5 Flash       │  │  Calendar   │  │  (Fastmail)     │  │
│  └─────────────────┘  └─────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Cloud account (for Calendar API)
- Google Gemini API key

### Step by Step

```bash
# 1. Clone the repository
git clone https://github.com/TechBeme/advrafael.git
cd advrafael

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local

# 4. Start the development server
npm run dev
```

Access **http://localhost:4000** 🚀

---

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the project root:

```env
# ═══════════════════════════════════════════════════════════
# SITE
# ═══════════════════════════════════════════════════════════
NEXT_PUBLIC_SITE_URL=https://advrafael.com.br

# ═══════════════════════════════════════════════════════════
# ARTIFICIAL INTELLIGENCE (Gemini)
# ═══════════════════════════════════════════════════════════
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_key

# ═══════════════════════════════════════════════════════════
# GOOGLE CALENDAR (Service Account)
# ═══════════════════════════════════════════════════════════
GOOGLE_CALENDAR_ID=your_calendar@group.calendar.google.com
GOOGLE_SERVICE_ACCOUNT_EMAIL=service@project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"

# ═══════════════════════════════════════════════════════════
# EMAIL (SMTP)
# ═══════════════════════════════════════════════════════════
SMTP_HOST=smtp.fastmail.com
SMTP_PORT=465
SMTP_USER=contact@advrafael.com.br
SMTP_PASS=your_app_password
SMTP_SECURE=true
MAIL_FROM="Dr. Rafael Vieira <contact@advrafael.com.br>"
MAIL_TO=contact@advrafael.com.br
```

### Configuring Google Calendar

1. **Create a project** in the [Google Cloud Console](https://console.cloud.google.com/)
2. **Enable the API** for Google Calendar
3. **Create a Service Account**:
   - Go to "IAM & Admin" → "Service Accounts"
   - Click "Create Service Account"
   - Download the JSON key
4. **Share the calendar**:
   - In Google Calendar, go to Calendar Settings
   - Under "Share with specific people", add the Service Account email
   - Grant "Make changes to events" permission
5. **Configure the variables**:
   - `GOOGLE_CALENDAR_ID`: Calendar ID (find in Settings)
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`: `client_email` field from JSON
   - `GOOGLE_SERVICE_ACCOUNT_KEY`: `private_key` field from JSON

---

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/TechBeme/advrafael)

1. Click the button above or import manually
2. Configure environment variables in the Vercel panel
3. Build happens automatically on every push

### Available Scripts

```bash
npm run dev      # Development (localhost:4000)
npm run build    # Production build
npm run start    # Serve the build
npm run lint     # Check for lint errors
npm run format   # Format the code
```

---

## 📁 Project Structure

```
advrafael/
├── app/                          # App Router (Next.js 16)
│   ├── (site)/                   # Public route group
│   │   ├── page.tsx              # Main landing page
│   │   └── politica-de-privacidade/
│   ├── api/                      # API Routes
│   │   ├── assistente/           # AI Chat + Transcription
│   │   │   ├── route.ts          # Message streaming
│   │   │   └── transcribe/       # Whisper API
│   │   └── contato/              # Email sending
│   ├── layout.tsx                # Root layout
│   ├── robots.ts                 # Dynamic robots.txt
│   └── sitemap.ts                # Dynamic sitemap.xml
│
├── components/
│   ├── chat/                     # ChatPopup (Clara)
│   ├── layout/                   # LandingNavbar, PageHeader
│   ├── motion/                   # FadeIn, Parallax, CountUp
│   ├── sections/                 # Hero, Areas, About, FAQ...
│   └── ui/                       # Button, Card, Badge, Section
│
├── lib/
│   ├── assistant/                # Google Calendar + Scheduling
│   ├── mailer.ts                 # Nodemailer config
│   ├── seo.ts                    # Metadata helpers
│   ├── utils.ts                  # cn(), helpers
│   └── validations.ts            # Zod schemas
│
├── public/
│   ├── fonts/                    # Playfair Display, Source Sans
│   └── images/                   # Logos, photos
│
└── styles/
    └── globals.css               # Tailwind + Custom properties
```

---

## 🎨 Design System

### Color Palette

| Token | Color | Use |
|-------|-------|-----|
| `--color-accent` | `#0ea5e9` | CTAs, links, highlights |
| `--color-surface` | `#fafaf9` | Card backgrounds |
| `--color-background` | `#f5f5f4` | General background |
| `--color-stone-900` | `#1c1917` | Main texts |

### Typography

- **Display**: Playfair Display (headings)
- **Body**: Source Sans 3 (paragraphs)

### Main Components

- **Button**: 4 variants (primary, secondary, ghost, link)
- **Card**: Surface with elevated hover
- **Badge**: Categorized labels
- **Section**: Container with responsive padding

---

## 📝 License

This project is **proprietary code** and is protected by copyright.

**Restrictions:**
- ❌ Unauthorized modification
- ❌ Commercial use without permission
- ❌ Redistribution
- ❌ Sublicensing

For authorized use, contact: [contact@techbe.me](mailto:contact@techbe.me)

See the [LICENSE](LICENSE) file for more details.

---

## 🛡️ Disclaimer

This software is provided "as is", without warranties of any kind. The developer is not responsible for direct or indirect damages resulting from the use of this code.

⚖️ This project was developed in compliance with OAB standards and LGPD (Brazilian Data Protection Law).

---

<div align="center">

**Developed by [Rafael Vieira (TechBeme)](https://github.com/TechBeme)**

[![GitHub](https://img.shields.io/badge/GitHub-TechBeme-181717?logo=github)](https://github.com/TechBeme)
[![Fiverr](https://img.shields.io/badge/Fiverr-Tech__Be-1DBF73?logo=fiverr)](https://www.fiverr.com/tech_be)
[![Upwork](https://img.shields.io/badge/Upwork-Profile-14a800?logo=upwork)](https://www.upwork.com/freelancers/~01f0abcf70bbd95376)
[![Email](https://img.shields.io/badge/Email-contact@techbe.me-EA4335?logo=gmail)](mailto:contact@techbe.me)

</div>
