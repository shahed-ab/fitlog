# 💪 FitLog — Workout Library & Daily Plan Builder

> **Train with intent. Log every set.**  
> FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.

---

## 📖 Description

**FitLog** is a production-grade, dark-themed workout library and daily training plan builder designed for lifters who prioritize precision and intent. Built with Next.js App Router, TypeScript, and a custom DaisyUI theme matching an exact dark-mode aesthetic with high-visibility lime accents (`#ccff00`), FitLog provides a seamless experience for discovering compound and isolation movements, inspecting in-depth exercise specifications and 4-step execution guides, curating a strict 5-lift daily workout plan, bookmarking lifts for later sessions, and tracking real-time metrics for exercises, training minutes, and calories burned.

---

## 🛠️ Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **Next.js 16+ (App Router)** | Framework for performant server components, static generation (SSG), and client transitions |
| **TypeScript** | Type-safe architecture across components, API contracts, and state models |
| **Tailwind CSS** | Utility-first design system implementing custom design tokens (charcoal surface `#161922`, hairline borders `#232732`, and lime accent `#ccff00`) |
| **DaisyUI** | Customized dark theme plugin for accessible UI controls, styled directly via `tailwind.config.ts` |
| **Lucide React** | Clean, minimalist iconography for stats, navigation, search, and action triggers |
| **React Hot Toast** | Active-voice, dark-mode notifications for all user actions |
| **Next Font (Google)** | Modern typography pairing **Oswald** for bold display headings and **Inter** for crisp, legible body text |

---

## ✨ Key Features

1. **Comprehensive Workout Library with Instant Live Search & Multi-Criteria Sorting**
   - Browse 12 foundation lifts covering all major muscle groups (chest, back, legs, arms, shoulders, and core).
   - Real-time client-side search filtering simultaneously across workout names, muscle group tags, and equipment.
   - Dynamic sort dropdown supporting **Duration** (quickest to longest), **Calories** (highest burned), and **Rating** (highest community score).
   - Responsive 3-column desktop, 2-column tablet, and 1-column mobile grid with loading skeleton states.

2. **In-Depth Workout Details & Execution Guides (`/workout/[id]`)**
   - High-resolution exercise media with floating category pills.
   - Standardized **Key Specs** table detailing Equipment, Difficulty, Sets, Reps, Duration, Calories, and Rating.
   - Step-by-step 4-stage instruction manual for proper form and injury prevention.
   - Dynamic CTA actions: "Add to today's plan" (with strict 5-lift cap enforcement) and "Save for later".

3. **Daily Plan Builder with 5-Lift Cap & Real-Time Metrics (`/my-plan`)**
   - **Metrics Row**: Live auto-calculating summary counters displaying total exercises scheduled (in lime), cumulative workout minutes, and estimated calories burned.
   - **Enforced Daily Cap**: Restricts today's routine to a focused 5 exercises, preventing workout bloat and encouraging consistent training intensity.
   - Tabbed view to seamlessly toggle between **Today's Plan** and **Saved** lifts.

4. **Interactive Completion Tracking & Plan Management**
   - **Mark as Done**: Mark individual lifts in today's routine as finished with interactive feedback, visual badge highlights, and instant toast confirmation.
   - **Quick Actions**: One-click "View Details" to revisit movement cues, or effortless removal ("X") with undoable toasts.
   - Context-aware empty states guiding the lifter back to the library when a list is cleared.

5. **Persistent Storage & Zero Hydration Flashing**
   - Seamless local storage synchronization (`localStorage`) keeping Today's Plan, Saved lifts, and completion status intact across browser reloads.
   - Implemented with two-phase safe hydration so server-rendered markup and initial client renders match flawlessly without hydration warnings.

6. **Fully Responsive Dark Aesthetic & Custom 404 Routing**
   - Pixel-accurate implementation of the dark charcoal (`#0f1115`) and panel surface (`#161922`) theme with hairline borders.
   - Responsive navigation bar with active route pill indicator and live counter badges.
   - Custom-crafted 404 Page Not Found experience handling invalid route requests and non-existent workout IDs with an immediate return CTA.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18.18+ or 20+
- npm, yarn, or pnpm

### Installation

1. Clone or extract the repository:
   ```bash
   cd B14-A6-Fit-Log
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Production Build
To create an optimized production build:
```bash
npm run build
npm run start
```

---

## 📡 API Reference

- **Workout List**: `GET https://api.abcz.workers.dev/api/fitlog`
- **Single Workout**: `GET https://api.abcz.workers.dev/api/fitlog/:id`
- *Includes embedded zero-downtime offline fallback data in `lib/fallbackData.ts`.*

---

## 📄 License

© 2026 FitLog — Workout Library. Train hard, log honest.
