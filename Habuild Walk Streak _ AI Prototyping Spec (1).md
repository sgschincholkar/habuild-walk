# Habuild Walk Streak — AI Prototyping Spec

## Product Overview

Habuild Walk Streak is a mobile-first web app that helps existing Habuild community members build and maintain a daily walking habit through intention-setting, streak tracking, and gentle AI coaching. The primary users are women aged 35-60+, mostly on Android, who are WhatsApp-first and do not want a complex fitness app. The core action loop is: Orient, Commit, Remind, Walk, Reflect, Streak.

The product answers five daily questions for the user:

* What should I do today?
* When should I walk?
* Did I keep my promise?
* Am I improving?
* Will someone encourage me to continue?

The design philosophy is intention-first, login-second, and progress-always-visible. The user sets a walking intention before being asked to log in. The prototype scope includes the full onboarding flow (daily and weekly intention modes), home screen with AI coach and weather, walk tracking (GPS and manual), streak dashboard, manual step logging, and WhatsApp nudge integration hooks. Deferred to later phases: native step sensor integration, social/community features, multi-language support, and payment/subscription flows.

## Design & Visual Style

* Component library: shadcn/ui
* Styling framework: Tailwind CSS
* Color scheme: Warm neutral background (#FAF7F2), primary green (#2E7D32) for CTAs and streak indicators, secondary soft orange (#F57C00) for nudges and coach cards, accent sky blue (#0288D1) for weather elements, text dark charcoal (#212121)
* Theme: Light mode only for V1. The audience prefers clarity and simplicity over dark-mode aesthetics.
* Layout style: Single-page scroll with bottom tab navigation (Home, Walk, Progress, Settings). No sidebar. Cards stacked vertically. Large touch targets throughout.
* Typography and spacing: Spacious layout with generous padding. Use Inter or system sans-serif. Body text at 16px minimum. Buttons at 48px minimum height. Card padding at 16px. Vertical spacing between sections at 24px. Prioritize readability for users who may not have strong eyesight.
* Reference sites: Google Fit daily summary screen for layout simplicity; Duolingo for streak celebration and motivational tone.

## Tech Stack

* Framework: Next.js (App Router) with server components where possible
* Language: TypeScript
* Database: Supabase (Postgres + Row Level Security)
* ORM: Prisma
* Auth: Supabase Auth (phone OTP via WhatsApp or SMS, deferred until after intention is set)
* Hosting target: Vercel
* Key libraries:
  * date-fns for date handling
  * Leaflet or Mapbox GL JS for route map display
  * Geolocation API (browser native) for GPS tracking
  * Framer Motion for subtle card and streak animations
  * Recharts for weekly/monthly progress charts
  * next/font for optimized font loading

AI and Weather backend:

* Weather data: OpenWeatherMap API or similar, called server-side
* AI coach: Server-side API route that builds context and calls the configured LLM (Claude Sonnet 4.6 as the default configurable backend model via shared/config.ts). API key stays server-side only. The browser never calls the LLM directly.

## Pages & Navigation

* Welcome (/): Habuild Walk Streak branding, trust cue, social proof, and Get Started CTA. Public, no auth required.
* Choose Intention Style (/onboarding/style): User picks daily or weekly intention mode. Public, no auth required.
* Set Daily Intention (/onboarding/daily): Time, duration, and place selection for today's walk. Public, no auth required.
* Set Weekly Intention (/onboarding/weekly): Day selection, default time, duration, and place for a repeating weekly plan. Public, no auth required.
* Confirm Intention (/onboarding/confirm): Summary of the chosen intention with edit option and Set my intention CTA. Auth prompt appears only after the user taps the CTA. Public until CTA tap.
* Home (/home): Greeting, weather, AI coach card, today's intention, walk status, streak summary, and Start Walk CTA. Requires auth.
* Edit Today's Plan (/home/edit): Editable fields for today's time, duration, place, and reminder. If source is a weekly plan, shows helper text that only today changes. Requires auth.
* Walk In Progress (/walk): Timer, distance (if GPS), live map (if GPS), intention summary, and Stop Walk button. Requires auth.
* Complete Walk (/walk/complete): Duration, distance, manual step entry, optional note, and Save Walk CTA. Requires auth.
* Log Steps (/log): Manual step entry with today's current count, daily goal, and remaining. Requires auth.
* Weekly Progress (/progress): Streak counts, 7-day calendar strip, daily/weekly/monthly step and time summaries. Requires auth.
* Settings (/settings): Intention mode switch, reminder preferences, notification opt-in, account info. Requires auth.

Bottom navigation (visible on all authenticated pages):

* Home (house icon)
* Walk (footsteps icon)
* Progress (chart icon)
* Settings (gear icon)

Logged-out users always start at the Welcome page and flow through onboarding. Logged-in users land on Home.

## Core User Flows

Flow 1: First Open — Set Walking Intention

1. User opens the app and lands on the Welcome screen. They see Habuild branding, the trust cue "Made with love by Habuild," social proof "Join lakhs of people building a daily walking habit," and a Get Started button.
2. User taps Get Started and reaches the Choose Intention Style screen. Two options appear: Plan daily (for changing schedules) and Plan my week (for fixed routines).
3. If the user selects Plan daily, they go to Set Daily Intention. They pick a time slot (Morning, Afternoon, Evening, or Choose time), a duration (10, 20, or 30 minutes or custom), and a place (Home, Terrace, Park, Street, Office).
4. If the user selects Plan my week, they go to Set Weekly Intention. They pick walking days (Every day, Weekdays, Alternate days, or Choose days), a default time, a default duration, and a default place.
5. User reaches the Confirm Intention screen showing a summary like "Your walk intention: 7:00 AM, 20 minutes, nearby park" with editable fields and a reminder time picker.
6. User taps Set my intention (or Set my weekly plan). Only at this point does the app ask for name and phone number for login. The user has already committed to a plan, so auth friction is minimized.
7. System stores the intention (daily or weekly), reminder time, and date. The user lands on the Home screen with their first intention visible and an AI coach card ready.

First win moment: Seeing "Your walk intention is set" with a concrete time, place, and duration — the user feels organized before taking a single step.

Flow 2: Daily Walk Execution

1. User opens the app. The system checks intention mode, whether today's intention exists, walk status, location permission, weather data, and cached AI coach suggestion.
2. Home screen shows a greeting, today's weather, an AI coach card with a weather-aware tip, today's intention (with source label: "Daily plan" or "From weekly plan"), and a Start Walk button.
3. User taps Start Walk. If location permission is not yet granted, the browser prompts for it. If granted, GPS tracking and a live map begin. If denied, the map is hidden and the user proceeds with timer-only tracking.
4. Walk In Progress screen shows a timer, distance (if GPS), a map (if GPS), and a Stop Walk button. GPS samples at most once every 5 seconds. Partial route data is backed up to local storage in case the page closes mid-walk.
5. User taps Stop Walk. The Complete Walk screen shows duration, distance, a manual step entry field, and an optional "How did the walk feel?" note.
6. User enters steps (manual in V1), optionally writes a note, and taps Save Walk. The system stores end time, duration, steps, route GeoJSON (if GPS), date, and completion status. The streak updates on the Home screen.

Loading and error states: While GPS acquires a fix, show "Acquiring location..." with a spinner. If GPS fails after 10 seconds, silently fall back to timer-only mode. On Save Walk, show a brief "Saving..." state, then transition to a success confirmation with the updated streak count.

Flow 3: Weekly Plan with Daily Override

1. User who selected weekly mode opens the app on a scheduled walking day. Home screen shows today's intention pulled from the weekly plan with source label "From weekly plan."
2. User taps Edit. The Edit Today's Plan screen shows editable time, duration, place, and reminder fields with helper text: "This changes only today's walk. Your weekly plan stays the same."
3. User changes today's walk from 7:00 AM / 20 minutes / Park to 6:30 PM / 10 minutes / Terrace and taps Save for today.
4. System stores a date-specific override. Tomorrow reverts to the weekly plan.
5. On a non-scheduled day, the Home screen shows a rest-day state: "Today is not in your weekly plan. Want to take a short 10-minute walk?" with an optional Start Walk CTA.

Flow 4: Streak Review and Motivation

1. User taps the Progress tab in the bottom navigation.
2. Weekly Progress screen shows current walk streak, longest walk streak, a 7-day calendar strip with completion indicators, daily/weekly/monthly step totals, time spent per walk, and consistency proof messages.
3. Consistency proof examples: "Walk completed today." / "You walked 5 of 7 days this week." / "You completed 21 walking days this month."
4. Streaks are computed from walk logs (date, steps, goal, completion status) and are never stored as a separate database field.

## Data Model & Backend

Entity: User

* id: UUID (primary key)
* phone: string (unique)
* name: string
* intentionMode: enum (daily, weekly)
* createdAt: timestamp
* updatedAt: timestamp

Entity: WeeklyPlan

* id: UUID (primary key)
* userId: UUID (foreign key to User)
* days: integer array (0=Sunday through 6=Saturday)
* defaultTime: time
* defaultDuration: integer (minutes)
* defaultPlace: string
* reminderOffset: integer (minutes before walk)
* createdAt: timestamp
* updatedAt: timestamp

Entity: DailyIntention

* id: UUID (primary key)
* userId: UUID (foreign key to User)
* date: date (ISO YYYY-MM-DD)
* time: time
* duration: integer (minutes)
* place: string
* reminderTime: time
* source: enum (daily, weekly, override)
* parentPlanId: UUID (nullable, foreign key to WeeklyPlan)
* createdAt: timestamp

Entity: WalkLog

* id: UUID (primary key)
* userId: UUID (foreign key to User)
* date: date
* startTime: timestamp
* endTime: timestamp
* durationSeconds: integer
* steps: integer (nullable)
* routeGeoJSON: JSON (nullable)
* note: string (nullable)
* completionStatus: enum (completed, partial, missed)
* createdAt: timestamp

Entity: CoachCache

* id: UUID (primary key)
* userId: UUID (foreign key to User)
* date: date
* cardTitle: string
* cardBody: string
* cardCTA: string
* weatherSnapshot: JSON
* createdAt: timestamp

Relationships:

* User has one optional WeeklyPlan
* User has many DailyIntentions (one per date)
* User has many WalkLogs (one per date)
* User has many CoachCache entries (one per date)
* DailyIntention optionally references a WeeklyPlan via parentPlanId

API Endpoints (Next.js API routes):

* POST /api/onboarding: Create user, set intention mode, store first intention
* GET /api/intention/today: Return today's intention (resolved from daily or weekly plan with override logic)
* PUT /api/intention/today: Create or update a date-specific override
* POST /api/walk/start: Record walk start time
* POST /api/walk/stop: Record walk end, duration, steps, route
* PUT /api/steps: Replace today's step count (not additive)
* GET /api/progress: Return computed streaks, weekly/monthly aggregates
* GET /api/coach: Fetch or return cached AI coach card for today
* POST /api/coach/generate (server-only): Build context, call LLM, return structured card

Step save rule: PUT /api/steps replaces today's previous step value. It does not add to existing steps. This prevents duplicate entries from repeated taps.

Streak computation rule: Streaks are computed on read from WalkLog entries, never stored as a column. The API computes current streak, longest streak, and per-period consistency from walk logs filtered by date range and completion status.

Seed data for prototype: Include 3 sample users with 14 days of walk log history each, showing varied streak patterns (one perfect streak, one with gaps, one just starting).

## Key Components

Today's Intention Card: A prominent card on the Home screen showing time, duration, place, and source label (Daily plan or From weekly plan). Includes an Edit button in the top-right corner. Background color shifts subtly based on status: neutral for planned, green for completed, amber for in-progress. Uses shadcn/ui Card component.

AI Coach Card: A compact card below the greeting showing a title (e.g., "Today's walking tip," "Weather check," "Keep the streak," "Recovery walk"), 1-2 lines of specific guidance, and a contextual CTA button. Card has a subtle gradient or icon to distinguish it from other content. Never shows generic wellness advice. Falls back to a static message if the LLM is unavailable: "Keep it simple today. A 10-20 minute walk is enough to maintain your rhythm."

7-Day Calendar Strip: A horizontal row of 7 day indicators (Mon-Sun or rolling 7 days). Each day shows a circle: green filled for completed, outlined for planned, gray for rest day, red dot for missed. Current day is highlighted with a ring. Tapping a day shows that day's walk summary in a tooltip or bottom sheet.

Walk Timer with Optional Map: Full-screen walk tracking view. Timer is always visible at the top in large numerals. If GPS is active, a Leaflet/Mapbox map fills the lower portion showing the live route as a polyline. Distance counter appears below the timer. Stop Walk button is fixed at the bottom, large and easy to tap. If GPS is denied, the map area is hidden and the timer expands.

Streak Counter: A circular or badge-style element showing the current streak number with a label like "day streak." Animates briefly (scale pulse via Framer Motion) when the streak increments. Appears on the Home screen and the Progress screen.

Manual Step Entry: A simple numeric input field with today's current step count displayed above it, the daily step goal displayed beside it, and a remaining-to-goal indicator. Save button replaces the stored value (does not add). Uses a large numeric keyboard-optimized input on mobile.

Weekly Progress Dashboard: A scrollable section with Recharts bar charts showing daily steps for the current week and monthly steps. Below the chart, text-based consistency proof messages are shown. Current streak and longest streak appear as headline numbers at the top.

Bottom Tab Navigation: Fixed bottom bar with four tabs: Home, Walk, Progress, Settings. Uses icons with labels. Active tab highlighted in primary green. Walk tab shows a subtle pulse indicator if a walk is in progress.

## AI Generation Notes

Features to skip or stub for V1:

* WhatsApp nudge sending: Stub the API endpoint and log messages to console instead of actually sending via WhatsApp Business API. Include the nudge content generation logic so it can be wired up later.
* Push notifications: Skip entirely. WhatsApp nudges are the primary reminder channel.
* Email notifications: Skip entirely.
* Native step sensor integration: V1 is manual step entry only. Do not attempt to access Health APIs or step counters.
* Social features, leaderboards, or community feed: Out of scope.
* Payment or subscription: Out of scope.
* Multi-language: Build in English only. Do not add i18n infrastructure yet.

Performance considerations:

* Use Next.js server components for the Home page data fetching (intention, coach card, weather).
* Cache the AI coach card per user per day in the database and in local storage. Do not call the LLM on every page load.
* Cache weather data for 30 minutes per user location.
* GPS sampling should not exceed once per 5 seconds to conserve battery.
* Store partial walk route data in localStorage as a backup in case the browser tab closes mid-walk.

Patterns to follow:

* Intention-first flow: Never show a login screen before the user has set at least one walking intention. Auth gates apply only to pages after onboarding confirmation.
* Graceful degradation: Every feature (GPS, weather, AI coach, location) must have a working fallback. The app must never show a blank section or a technical error message to the user.
* Replace, not accumulate: Manual step entries replace the day's count, never add on top of previous entries.
* Computed streaks: Never store streak counts in the database. Always derive from walk logs.
* Date-specific overrides: Editing a weekly plan for today creates an override record. The underlying weekly plan is never mutated by a daily edit.

Seed data and placeholder content:

* 3 sample users with Indian women's names
* 14 days of walk log history per user with realistic variation
* Sample AI coach cards for clear weather, hot weather, rainy weather, missed-walk, and streak-celebration scenarios
* Sample weekly plan and daily intention records
* Placeholder weather data for Mumbai (warm, humid, occasional rain)

Mobile responsiveness:

* Design mobile-first at 375px width as the base
* Support up to 428px (large phones) comfortably
* Tablet and desktop views are not required for V1 but should not break (simple centered max-width container at 480px)
* All touch targets minimum 48px
* Bottom navigation fixed and always visible on authenticated pages
* No horizontal scrolling anywhere

Edge state handling:

* No intention set: Show "Set your first walk intention" with a Plan today's walk CTA
* Weekly plan, but today is a rest day: Show "Today is a rest day in your weekly plan" with an optional "Take a short walk anyway" CTA
* Weather unavailable: Show "Weather is not available right now. You can still set your walk intention." Do not block any workflow.
* Location denied: Show "Route tracking is off. You can still log steps manually." Do not show technical error.
* LLM unavailable: Show fallback card "Keep it simple today. A 10-20 minute walk is enough to maintain your rhythm." Never show a blank AI coach section.
* Missed planned walk: Show "You missed the planned walk. Want to take a 10-minute recovery walk now?" with a Start 10-minute walk CTA.