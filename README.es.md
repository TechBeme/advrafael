<div align="center">

# ⚖️ Dr. Rafael Vieira — Abogado

**Sitio institucional con asistente de IA y programación en Google Calendar**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Vercel AI SDK](https://img.shields.io/badge/Vercel%20AI%20SDK-5.0-000?logo=vercel)](https://sdk.vercel.ai/)
[![Google Calendar](https://img.shields.io/badge/Google%20Calendar-API-4285F4?logo=googlecalendar)](https://developers.google.com/calendar)

**🌐 [advrafael.com.br](https://advrafael.com.br)**

**Idiomas:** 🇧🇷 [Português](README.md) • [🇺🇸 English](README.en.md)

</div>

---

## 📋 Índice

- [Sobre el Proyecto](#-sobre-el-proyecto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologías](#-tecnologías)
- [Arquitectura](#-arquitectura)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Despliegue](#-despliegue)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Licencia](#-licencia)

---

## 🎯 Sobre el Proyecto

Landing page para un despacho de abogados con **Clara**, una asistente de IA que recopila la necesidad jurídica del visitante y programa consultas en el Google Calendar del abogado.

### ✨ Aspectos Destacados

| Característica | Descripción |
|---------|-----------|
| 🤖 **Asistente IA** | Clara usa Gemini 2.5 Flash para conversaciones naturales en portugués |
| 📅 **Programación Automática** | Integración con Google Calendar vía Service Account |
| 🎙️ **Entrada por Voz** | Transcripción de audio en tiempo real con Whisper |
| 📱 **Diseño Responsivo** | Layouts para móvil y escritorio |
| ⚡ **Rendimiento** | SSR con Next.js 16 y optimización de imágenes |
| ♿ **Accesibilidad** | Cumplimiento WCAG AA, skip links y foco visible |
| 🔒 **Conformidad** | LGPD y normas de OAB respetadas |

---

## 🚀 Funcionalidades

### 🤖 Asistente Virtual Clara

Clara es una asistente conversacional que:

- **Recibe** al visitante y comprende su situación jurídica
- **Recopila** información (nombre, WhatsApp, preferencia de atención)
- **Consulta** la agenda del Dr. Rafael en tiempo real
- **Programa** consultas respetando reglas de negocio:
  - ⏰ Horario comercial: 9h-12h y 13h-18h (horario de Brasilia)
  - 📆 Solo días hábiles (sin feriados nacionales)
  - ⏳ Mínimo 24h de anticipación
  - 🕐 Consultas de 1 hora con 15 min de intervalo

```
📱 Usuario: "Necesito ayuda con un contrato"
🤖 Clara: "¡Hola! Puedo ayudarte con eso. Los contratos 
    son una de las especialidades del Dr. Rafael. 
    Cuéntame un poco más: ¿es elaboración de un nuevo 
    contrato o revisión de uno existente?"
```

### 🎙️ Transcripción de Voz

- Grabación de audio directamente en el chat
- Transcripción vía API Whisper (Google)
- Conversión automática a texto
- Experiencia mobile-first

### 📄 Secciones de la Landing Page

| Sección | Contenido |
|---------|----------|
| **Hero** | Presentación con credenciales (UFMG, Defensoría Pública, DAJ) |
| **Áreas de Actuación** | Derecho Civil, Consumidor y Familia con tópicos detallados |
| **Sobre** | Trayectoria profesional y diferencial del servicio |
| **Proceso** | Cómo funciona el servicio en 4 etapas |
| **FAQ** | Preguntas frecuentes en acordeón |
| **Contacto** | Formulario validado + integración WhatsApp |

### 📧 Sistema de Contacto

- Validación de campos con Zod
- Envío vía SMTP (Nodemailer)
- Retroalimentación visual de éxito/error
- Fallback a log en desarrollo

---

## 🛠️ Tecnologías

### Frontend
| Tecnología | Versión | Uso |
|------------|---------|-----|
| Next.js | 16.0.7 | Framework React con App Router |
| React | 19.2.1 | Biblioteca de UI |
| TypeScript | 5.x | Tipado estático |
| Tailwind CSS | 3.4 | Estilización utility-first |
| Motion | 12.x | Animaciones de entrada y transición |
| React Icons | 5.5 | Iconos (Feather + Font Awesome) |

### Backend & IA
| Tecnología | Uso |
|------------|-----|
| Vercel AI SDK | Streaming de IA y tool calling |
| Google Gemini 2.5 Flash | Modelo de lenguaje de Clara |
| Google Calendar API | Lectura y creación de eventos |
| Nodemailer | Envío de emails SMTP |

### Calidad
| Herramienta | Uso |
|-------------|-----|
| ESLint | Linting de código |
| Prettier | Formateo consistente |
| Zod | Validación de esquemas |

---

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Landing   │  │   Chat      │  │   Formulario        │  │
│  │   Page      │  │   Popup     │  │   de Contacto       │  │
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
│  │   │ (lectura)   │          │  (creación)     │       │   │
│  │   └──────┬──────┘          └────────┬────────┘       │   │
│  └──────────┼─────────────────────────┼─────────────────┘   │
│             │                          │                     │
└─────────────┼──────────────────────────┼─────────────────────┘
              │                          │
              ▼                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    SERVICIOS EXTERNOS                        │
│  ┌─────────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │ Google Gemini   │  │   Google    │  │   SMTP          │  │
│  │ 2.5 Flash       │  │  Calendar   │  │  (Fastmail)     │  │
│  └─────────────────┘  └─────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Instalación

### Requisitos Previos

- Node.js 18+ 
- npm o yarn
- Cuenta en Google Cloud (para Calendar API)
- Clave de API de Google Gemini

### Paso a Paso

```bash
# 1. Clonar el repositorio
git clone https://github.com/TechBeme/advrafael.git
cd advrafael

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local

# 4. Iniciar el servidor de desarrollo
npm run dev
```

Acceder a **http://localhost:4000** 🚀

---

## ⚙️ Configuración

### Variables de Entorno

Crear un archivo `.env.local` en la raíz del proyecto:

```env
# ═══════════════════════════════════════════════════════════
# SITIO
# ═══════════════════════════════════════════════════════════
NEXT_PUBLIC_SITE_URL=https://advrafael.com.br

# ═══════════════════════════════════════════════════════════
# INTELIGENCIA ARTIFICIAL (Gemini)
# ═══════════════════════════════════════════════════════════
GOOGLE_GENERATIVE_AI_API_KEY=tu_clave_gemini

# ═══════════════════════════════════════════════════════════
# GOOGLE CALENDAR (Service Account)
# ═══════════════════════════════════════════════════════════
GOOGLE_CALENDAR_ID=tu_calendario@group.calendar.google.com
GOOGLE_SERVICE_ACCOUNT_EMAIL=service@proyecto.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"

# ═══════════════════════════════════════════════════════════
# EMAIL (SMTP)
# ═══════════════════════════════════════════════════════════
SMTP_HOST=smtp.fastmail.com
SMTP_PORT=465
SMTP_USER=contacto@advrafael.com.br
SMTP_PASS=tu_contraseña_de_app
SMTP_SECURE=true
MAIL_FROM="Dr. Rafael Vieira <contacto@advrafael.com.br>"
MAIL_TO=contacto@advrafael.com.br
```

### Configurando Google Calendar

1. **Crear un proyecto** en [Google Cloud Console](https://console.cloud.google.com/)
2. **Activar la API** de Google Calendar
3. **Crear una Service Account**:
   - Ir a "IAM & Admin" → "Service Accounts"
   - Hacer clic en "Create Service Account"
   - Descargar la clave JSON
4. **Compartir el calendario**:
   - En Google Calendar, ir a Configuración del calendario
   - En "Compartir con personas específicas", agregar el email de la Service Account
   - Dar permiso de "Hacer cambios en los eventos"
5. **Configurar las variables**:
   - `GOOGLE_CALENDAR_ID`: ID del calendario (encontrar en Configuración)
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`: Campo `client_email` del JSON
   - `GOOGLE_SERVICE_ACCOUNT_KEY`: Campo `private_key` del JSON

---

## 🚀 Despliegue

### Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/TechBeme/advrafael)

1. Hacer clic en el botón arriba o importar manualmente
2. Configurar las variables de entorno en el panel de Vercel
3. El build ocurre automáticamente en cada push

### Scripts Disponibles

```bash
npm run dev      # Desarrollo (localhost:4000)
npm run build    # Build de producción
npm run start    # Servir el build
npm run lint     # Verificar errores de lint
npm run format   # Formatear el código
```

---

## 📁 Estructura del Proyecto

```
advrafael/
├── app/                          # App Router (Next.js 16)
│   ├── (site)/                   # Grupo de rutas públicas
│   │   ├── page.tsx              # Landing page principal
│   │   └── politica-de-privacidade/
│   ├── api/                      # API Routes
│   │   ├── assistente/           # Chat IA + Transcripción
│   │   │   ├── route.ts          # Streaming de mensajes
│   │   │   └── transcribe/       # Whisper API
│   │   └── contato/              # Envío de email
│   ├── layout.tsx                # Layout raíz
│   ├── robots.ts                 # robots.txt dinámico
│   └── sitemap.ts                # sitemap.xml dinámico
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
│   ├── mailer.ts                 # Configuración Nodemailer
│   ├── seo.ts                    # Helpers de metadata
│   ├── utils.ts                  # cn(), helpers
│   └── validations.ts            # Esquemas Zod
│
├── public/
│   ├── fonts/                    # Playfair Display, Source Sans
│   └── images/                   # Logos, fotos
│
└── styles/
    └── globals.css               # Tailwind + Custom properties
```

---

## 🎨 Sistema de Diseño

### Paleta de Colores

| Token | Color | Uso |
|-------|-------|-----|
| `--color-accent` | `#0ea5e9` | CTAs, enlaces, destacados |
| `--color-surface` | `#fafaf9` | Fondos de tarjetas |
| `--color-background` | `#f5f5f4` | Fondo general |
| `--color-stone-900` | `#1c1917` | Textos principales |

### Tipografía

- **Display**: Playfair Display (encabezados)
- **Body**: Source Sans 3 (párrafos)

### Componentes Principales

- **Button**: 4 variantes (primary, secondary, ghost, link)
- **Card**: Superficie con hover elevado
- **Badge**: Etiquetas categorizadas
- **Section**: Contenedor con padding responsivo

---

## 📝 Licencia

Este proyecto es **código propietario** y está protegido por derechos de autor.

**Restricciones:**
- ❌ Modificación no autorizada
- ❌ Uso comercial sin permiso
- ❌ Redistribución
- ❌ Sublicencia

Para uso autorizado, contactar: [contact@techbe.me](mailto:contact@techbe.me)

Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 🛡️ Aviso Legal

Este software se proporciona "tal cual", sin garantías de ningún tipo. El desarrollador no se responsabiliza por daños directos o indirectos resultantes del uso de este código.

⚖️ Este proyecto fue desarrollado respetando las normas de la OAB y la LGPD (Ley General de Protección de Datos de Brasil).

---

<div align="center">

**Desarrollado por [Rafael Vieira (TechBeme)](https://github.com/TechBeme)**

[![GitHub](https://img.shields.io/badge/GitHub-TechBeme-181717?logo=github)](https://github.com/TechBeme)
[![Fiverr](https://img.shields.io/badge/Fiverr-Tech__Be-1DBF73?logo=fiverr)](https://www.fiverr.com/tech_be)
[![Upwork](https://img.shields.io/badge/Upwork-Profile-14a800?logo=upwork)](https://www.upwork.com/freelancers/~01f0abcf70bbd95376)
[![Email](https://img.shields.io/badge/Email-contact@techbe.me-EA4335?logo=gmail)](mailto:contact@techbe.me)

</div>
