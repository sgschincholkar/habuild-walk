# design.md — Habuild Walk Streak Design System + Flow Context

## Product Overview

Habuild Walk Streak is a mobile-first wellness walking app for existing Habuild community members. The app helps users build and maintain a daily walking habit through:
- intention-setting
- streak tracking
- gentle reminders
- supportive AI coaching

Primary audience:
- Women aged 35–60+
- Android-first users
- WhatsApp-first behavior
- Users who dislike complicated fitness apps

Core habit loop:
- Orient
- Commit
- Remind
- Walk
- Reflect
- Streak

The app should feel:
- Calm
- Warm
- Encouraging
- Human
- Emotionally safe
- Easy to use

Avoid:
- Athlete dashboard aesthetics
- Dense analytics
- Productivity-app styling
- Aggressive fitness energy
- Hustle culture
- Competitive gamification

---

# Design System

## Component Library
- shadcn/ui

## Styling
- Tailwind CSS

## Theme
- Light mode only

## Layout
- Mobile-first single-column scroll
- Fixed bottom tab navigation
- Cards stacked vertically
- Spacious layouts
- Large touch targets
- No sidebar
- No desktop dashboard layouts

---

# Color System

## Background
- Warm neutral background: #FAF7F2

## Primary
- Deep calming green: #2E7D32
- Used for:
  - Primary CTAs
  - Active navigation
  - Streak highlights
  - Positive states

## Secondary
- Soft orange: #F57C00
- Used for:
  - AI coach cards
  - Reminder accents
  - Recovery states

## Accent
- Sky blue: #0288D1
- Used for:
  - Weather elements
  - GPS/map accents
  - Supporting highlights

## Text
- Dark charcoal: #212121

## Surface
- White cards with subtle warm shadows

---

# Typography

## Font
- Inter
- system-ui fallback

## Sizes
- Body minimum: 16px
- Important labels: 20px+
- Large readable CTA text

## Spacing
- Spacious vertical rhythm
- Generous breathing room
- Optimized for older users and readability

---

# Layout & Spacing

## Base Layout
- 375px mobile-first design
- Support up to 428px comfortably
- Maximum width 480px centered container

## Gutters
- Minimum horizontal padding: 20px

## Vertical Rhythm
- 24px between major sections
- Large card spacing
- Comfortable touch spacing

## Buttons
- Minimum height: 48px
- Rounded pill style
- Large touch-friendly interactions

## Cards
- Rounded corners
- Warm soft shadows
- Spacious padding
- Stack vertically

---

# Navigation

## Bottom Navigation
Visible on authenticated screens only:
- Home
- Walk
- Progress
- Settings

Active tab uses primary green.

Navigation should feel:
- lightweight
- calm
- thumb-friendly

---

# Core UX Philosophy

## Intention First
Users must set a walking intention before login appears.

## Emotionally Supportive
The app should encourage consistency without pressure.

## Graceful Degradation
Every feature should have a fallback:
- GPS denied → timer-only walk
- Weather unavailable → continue normally
- AI unavailable → fallback encouragement card

Never show technical errors to users.

## Lightweight Wellness
Walking should feel:
- approachable
- calm
- flexible
- easy to restart after missing days

---

# AI Coach Card

The AI coach card should:
- feel practical
- feel supportive
- avoid generic wellness advice
- use weather-aware guidance
- provide short actionable suggestions

Fallback example:
“Keep it simple today. A 10–20 minute walk is enough to maintain your rhythm.”

---

# Emotional Tone

Use:
- gentle encouragement
- calm recovery messaging
- practical guidance
- soft celebration moments

Good examples:
- “A short walk still counts.”
- “You showed up today.”
- “Keep your rhythm simple.”

Avoid:
- “No excuses.”
- “Push harder.”
- “Crush your goals.”

---

# Motion

Use:
- soft fades
- gentle slide transitions
- subtle streak pulse animations
- calm bottom-sheet motion

Avoid:
- bouncy animations
- flashy transitions
- overstimulating interactions
- gamified energy

---

# Screen Flow Context

## Welcome
Purpose:
- Introduce Habuild Walk Streak
- Build trust
- Encourage first action

Primary CTA:
- Get Started

Next:
- Choose Intention Style

---

## Choose Intention Style
User selects:
- Plan daily
- Plan my week

Next:
- Set Daily Intention
- Set Weekly Intention

---

## Set Daily Intention
User selects:
- walk time
- duration
- place

Primary CTA:
- Continue

Next:
- Confirm Daily Intention

---

## Confirm Daily Intention
Shows:
- selected time
- duration
- place
- reminder time

Primary CTA:
- Set my intention

Next:
- Login After Commitment
- Home

---

## Set Weekly Plan
User selects:
- walking days
- default time
- duration
- place

Primary CTA:
- Continue

Next:
- Confirm Weekly Plan

---

## Confirm Weekly Plan
Shows:
- selected days
- time
- duration
- place

Primary CTA:
- Set my weekly plan

Next:
- Login After Commitment
- Home

---

## Login After Commitment
Purpose:
- Reduce onboarding friction
- Ask for auth only after commitment

Primary CTA:
- Continue with phone

Alternative:
- Continue as guest

Next:
- Reminder Permission
- Home

---

## Reminder Permission
Purpose:
- Ask for reminder opt-in gently

Primary CTA:
- Enable reminders

Alternative:
- Skip for now

Next:
- Home

---

## Home
Shows:
- greeting
- weather
- AI coach card
- today's intention
- streak summary
- Start Walk CTA

Primary Actions:
- Start Walk → Start Walk Transition
- Edit → Edit Today's Plan
- Log Steps → Log Steps
- Progress tab → Weekly Progress
- Settings tab → Settings

---

## Start Walk Transition
Purpose:
- Explain optional route tracking

Primary CTA:
- Start with route tracking

Alternative:
- Start without route

Next:
- Location Permission
- Walk In Progress

---

## Location Permission
If granted:
- Enable GPS route tracking

If denied:
- Continue timer-only mode

Next:
- Walk In Progress

---

## Walk In Progress
Shows:
- timer
- distance if GPS enabled
- optional live map
- Stop Walk CTA

Primary Action:
- Stop Walk

Next:
- Complete Walk

---

## Complete Walk
Shows:
- duration
- distance
- manual steps
- optional reflection note

Primary CTA:
- Save Walk

Next:
- First Walk Success
- Updated Home

---

## First Walk Success
Purpose:
- Celebrate first completed walk gently

Primary CTA:
- Back to Home

Alternative:
- View Progress

Next:
- Home
- Weekly Progress

---

## Log Steps
Purpose:
- Manual step entry

Save behavior:
- replaces today's step count
- never accumulates

Next:
- Home

---

## Edit Today's Plan
Purpose:
- Edit today's walk only

If source is weekly plan:
- show helper text explaining override behavior

Primary CTA:
- Save for today

Next:
- Home

---

## Weekly Override Confirmation
Purpose:
- Confirm that today's edits do not change weekly plan

Primary CTA:
- Save for today

Next:
- Home

---

## Weekly Progress
Shows:
- current streak
- longest streak
- 7-day calendar strip
- daily summaries
- consistency proof messages

Interactions:
- tapping a day shows walk summary

---

## Walk History
Shows:
- previous walks
- walk summaries
- dates
- optional route summaries

---

## Settings
Shows:
- reminder preferences
- notification settings
- account info
- intention mode

Actions:
- WhatsApp reminders
- Sign out
- Delete account

---

## WhatsApp Nudges
Purpose:
- Configure reminder nudges

Primary CTA:
- Save reminder settings

Next:
- Settings

---

## Notification Success
Purpose:
- Confirm reminder activation

Primary CTA:
- Go to Home

Next:
- Home

---

## Rest Day State
Purpose:
- Encourage optional lightweight walk

Primary CTA:
- Take a short walk

Alternative:
- Back to Home

---

## Empty Home State
Purpose:
- Encourage first walk completion

Primary CTA:
- Start Walk

Alternative:
- Edit today's plan

---

## Error States
Includes:
- weather unavailable
- AI unavailable
- missed walk recovery
- fallback coach state

Always:
- preserve calm tone
- provide recovery CTA
- avoid technical errors

---

## Sign Out Confirmation
Purpose:
- Confirm sign out safely

Primary CTA:
- Stay signed in

Secondary:
- Sign out

---

## Delete Account Confirmation
Purpose:
- Confirm destructive action carefully

Primary CTA:
- Keep my account

Secondary:
- Delete account