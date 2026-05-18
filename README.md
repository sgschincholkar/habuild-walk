# Habuild Walk — Concept Prototype

> **Note: This is not a production app. This is a concept prototype created to reimagine the Habuild Walk experience.**

---

## What This Is

This repository contains the full design concept and interactive prototype for a reimagined Habuild Walk app — a mobile-first walking habit companion for the Habuild community.

The prototype covers 35 screens across the complete user journey: onboarding, daily intention setting, walk tracking, progress review, and AI coaching.

**Try the prototype:** [habuild-walk-prototype.vercel.app](https://habuild-walk-prototype.vercel.app)

---

## Background

The original Habuild Walk app helped users track their daily walks but had several gaps that limited its ability to genuinely help users build a lasting walking habit:

- **No structured onboarding** — users were dropped into the app without a clear starting point
- **Weak intention setting** — partial information when planning a walk meant users didn't feel committed or take the app seriously
- **No companion feeling** — the app felt transactional rather than supportive
- **No community** — walking is often a social activity; the app had no sense of being part of something bigger
- **No real coaching** — missing a voice that celebrates effort, provides gentle nudges, and helps users understand *why* consistency matters

These gaps meant the app wasn't helping users form an actual habit — it was just a logger.

---

## The Approach

This concept reimagines the Habuild Walk app with the user's emotional needs at the center.

The design is built around one core idea: **the app should feel like a daily companion, not a fitness tracker.**

Key design decisions:

**Intention-first onboarding** — Users set a walking intention (time, duration, place) *before* being asked to sign in. By the time they create an account, they've already made a commitment to themselves.

**Structured habit loop** — Every day follows a calm, repeatable rhythm: Orient → Commit → Remind → Walk → Reflect → Streak. The app guides users through this loop without pressure.

**Gentle AI coaching** — A coach card on the home screen provides weather-aware, personalised guidance every day. It celebrates effort, not just achievement. Fallback messages ensure there is always an encouraging presence even when the AI is unavailable.

**Community presence** — Illustrations and copy reflect a warm, relatable community of women walking together. Users feel part of something, not alone in their effort.

**Calm, supportive tone throughout** — Every screen avoids fitness-app aggression. The language is warm, non-judgmental, and practical. "A short walk still counts" rather than "No excuses."

---

## What's in This Repo

```
prompts/              Screen specs for all 35 screens (organised by feature)
  onboarding/         Welcome, intention setting, login, reminders
  home/               Main dashboard, AI coach, loading and error states
  planning/           Edit plan, choose time/duration/place, log steps
  walking/            Start walk, GPS tracking, complete walk, celebration
  progress/           Weekly rhythm, walk history
  settings/           Reminders, WhatsApp nudges, account management

guidelines/           Design system documentation
  Guidelines.md           Master design guide
  spacing-token-system.md Spacing and layout tokens
  component-guidelines.md Component behaviour rules
  motion-guidelines.md    Animation and transition rules
  illustration-guidelines.md Visual style for illustrations
  ai-copy-tone-rules.md   Voice and tone for AI coaching copy
  navigation-map.md       Full user flow and navigation logic

HabuildWalk App Prototype/
  prototype.html      Single-file interactive prototype (all 35 screens)
  screens/            Flat copy of all screen PNGs used by the prototype

Walk Streak Prototype/  Earlier HTML screen explorations (reference only)

Design.md             Design system summary and screen flow context
Habuild Walk Streak _ AI Prototyping Spec (1).md   Full product spec
```

---

## The Prototype

The interactive prototype is a single HTML file. Open it in any browser — no server or install needed.

- All 35 screens linked with correct navigation flows
- Tap "☰ All screens" to jump to any screen directly
- Works on desktop and mobile Chrome

**Prototype link:** [habuild-walk-prototype.vercel.app](https://habuild-walk-prototype.vercel.app)

---

## Design System

| Property | Value |
|---|---|
| Primary colour | `#2E7D32` (deep green) — CTAs, streaks, active states |
| Background | `#FAF7F2` (warm neutral) |
| Coach / nudge colour | `#F57C00` (soft orange) |
| Weather colour | `#0288D1` (sky blue) |
| Text | `#212121` (dark charcoal) |
| Font | Inter |
| Min touch target | 48px |
| Base layout width | 375px mobile-first |

---

## User Flows Covered

1. **First open (daily plan)** — Welcome → Set intention → Confirm → Login → Home
2. **First open (weekly plan)** — Welcome → Set weekly routine → Confirm → Login → Home
3. **Guest mode** — Skip login, continue with device-only storage
4. **Daily walk with GPS** — Home → Start → Track route → Complete → Celebrate
5. **Daily walk without GPS** — Home → Start → Timer only → Complete
6. **Edit today's plan** — Override weekly plan for today only
7. **Log steps manually** — Enter step count from home
8. **Progress review** — Weekly rhythm view → Walk history
9. **Settings and reminders** — WhatsApp nudge configuration

---

*Concept and design by Sandeep Chincholkar*
