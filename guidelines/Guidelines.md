# Guidelines.md

## Product Philosophy
- Build a habit coach, not a fitness tracker.
- Prioritize emotional safety over performance motivation.
- Intention comes before analytics.
- Consistency matters more than optimization.
- Keep the experience calm, warm, and encouraging.
- Every screen should answer:
  - What should I do today?
  - When should I walk?
  - Did I keep my promise?
  - Am I improving gently?

## Tech & Framework
- Use shadcn/ui components
- Use Tailwind CSS
- Mobile-first only
- Light mode only
- Use Auto Layout everywhere
- Build screens as reusable prototype-friendly components

## Color Tokens
- --color-primary: #2D6A4F
- --color-secondary: #F4F1EE
- --color-accent: #F9A825
- --color-error: #E53E3E
- --color-surface: #FFFFFF

## Typography
- Font family: Inter, system-ui
- Body text minimum: 16px
- Important labels minimum: 20px
- Line height: 1.6
- Use large readable typography for older users
- Avoid dense text blocks

## Layout Rules
- Single-column mobile layout only
- Minimum horizontal gutters: 20px
- Large vertical spacing rhythm
- Bottom navigation fixed
- No sidebars
- No desktop layouts
- No multi-column layouts

## Buttons
- Minimum height: 48px
- Large CTAs preferred
- Fully rounded pill buttons
- Primary CTA uses --color-primary
- Use accent color sparingly

## Cards
- Rounded corners only
- Soft warm shadows
- Spacious padding
- No harsh borders
- Stack vertically with breathing room

## Emotional Tone
- Calm
- Warm
- Supportive
- Non-judgmental
- Encouraging
- Human

## Avoid
- Hustle culture
- Gym aesthetics
- Competitive language
- Performance pressure
- Toxic positivity
- Dense analytics
- Dashboard-heavy layouts
- Neon gradients
- Dark mode

## Navigation
- Fixed bottom navigation:
  - Home
  - Walk
  - Progress
  - Settings
- Onboarding screens hide bottom navigation

## Motion
- Gentle transitions only
- No bouncing animations
- Soft fades and slide-ups preferred

## Illustration Style
- Soft wellness illustrations
- Rounded forms
- Calm walking poses
- Inclusive Indian audience representation
- Avoid athletic bodybuilder imagery

## AI Coach Behavior
- Keep suggestions practical
- Weather guidance should be useful, not decorative
- Never sound robotic
- Avoid long wellness lectures

## Empty & Error States
- Never shame the user
- Always offer a next step
- Keep language calm and supportive
- No technical errors exposed to users