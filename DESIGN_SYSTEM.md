# Identity Rights Center — Design System

---

## Design Language

A calm, trustworthy, precision-driven visual language. This is a privacy-rights product, not a growth product — every design decision should reduce anxiety and increase clarity, never manufacture urgency.

## Visual Style

Clean, editorial, generous whitespace, soft depth via subtle shadows rather than heavy borders. Feels closer to a premium fintech/health app (e.g., calm blues, soft neutrals) than a typical consumer social app.

## Brand Personality

- Trustworthy
- Precise
- Respectful
- Unhurried
- Quietly confident (never alarmist, never salesy)

---

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#2B5CE0` | Primary actions, links, active states |
| `--color-primary-dark` | `#1E42A8` | Hover/pressed states |
| `--color-primary-light` | `#EAF0FE` | Primary-tinted backgrounds |
| `--color-success` | `#1F9D63` | Verified, resolved states |
| `--color-success-light` | `#E7F7EF` | Success background fills |
| `--color-warning` | `#C57A11` | Pending / under review |
| `--color-warning-light` | `#FCF1E1` | Warning background fills |
| `--color-danger` | `#D33B3B` | Erasure warnings, errors |
| `--color-danger-light` | `#FBEAEA` | Danger background fills |
| `--color-neutral-900` | `#111318` | Primary text |
| `--color-neutral-700` | `#4B5160` | Secondary text |
| `--color-neutral-400` | `#9AA1AE` | Placeholder text, disabled |
| `--color-neutral-200` | `#E4E7EC` | Borders, dividers |
| `--color-neutral-100` | `#F5F6F8` | Surface backgrounds |
| `--color-white` | `#FFFFFF` | Cards, base surface |

### Dark Mode Tokens

| Token | Hex |
|---|---|
| `--color-bg-dark` | `#0E1015` |
| `--color-surface-dark` | `#181B22` |
| `--color-border-dark` | `#2A2E38` |
| `--color-text-dark-primary` | `#F2F3F5` |
| `--color-text-dark-secondary` | `#A6ACB8` |

---

## Typography

- **Font Family:** `Inter` (fallback: system-ui, sans-serif)
- **Scale:**

| Style | Size / Line Height | Weight | Usage |
|---|---|---|---|
| Display | 32px / 40px | 700 | Landing hero headline |
| H1 | 28px / 36px | 700 | Page titles |
| H2 | 22px / 30px | 600 | Section headers |
| H3 | 18px / 26px | 600 | Card titles |
| Body Large | 16px / 24px | 400 | Primary body copy |
| Body | 14px / 20px | 400 | Standard UI text |
| Caption | 12px / 16px | 400 | Meta text, timestamps |
| Label | 12px / 16px | 600 | Form labels, uppercase tracking +0.02em |

---

## Spacing System

Base unit: `4px`. Scale: 4, 8, 12, 16, 24, 32, 48, 64.

Use `space-4` through `space-16` for internal component spacing; `space-24`–`space-64` for section/page-level spacing.

## Grid System

- 12-column grid, max content width `1120px`, gutter `24px`.
- Mobile: single column, 16px side margins.

## Corner Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | 6px | Badges, tags, inputs |
| `--radius-md` | 12px | Buttons, cards |
| `--radius-lg` | 20px | Modals, bottom sheets |
| `--radius-full` | 999px | Pills, avatars |

## Elevation

| Level | Shadow | Usage |
|---|---|---|
| `elevation-1` | `0 1px 2px rgba(16,24,40,0.06)` | Cards at rest |
| `elevation-2` | `0 4px 12px rgba(16,24,40,0.08)` | Hover cards, dropdowns |
| `elevation-3` | `0 12px 32px rgba(16,24,40,0.14)` | Modals, dialogs, bottom sheets |

---

## Components

### Buttons
- **Primary:** filled `--color-primary`, white text, `radius-md`, height 44px, medium weight label.
- **Secondary:** white fill, 1px `--color-neutral-200` border, `--color-neutral-900` text.
- **Destructive:** filled `--color-danger` for "Confirm Erasure" only — never used for primary navigation actions.
- **Ghost/Text:** no fill, `--color-primary` text, used for tertiary actions ("Skip," "Learn more").
- States: default, hover (8% darken), pressed (16% darken), disabled (40% opacity, no pointer).

### Inputs
- Height 48px, `radius-sm`, 1px `--color-neutral-200` border, focus state: 2px `--color-primary` outline + subtle glow.
- Label above input, caption-style helper text below, error state swaps border/helper to `--color-danger`.

### Cards
- White surface, `elevation-1`, `radius-md`, 24px internal padding.
- Identity Profile Card uses a slightly elevated variant (`elevation-2`) to signal primacy.

### Tables
- Used only in Activity Timeline (list-table hybrid). Row height 56px, dividers `--color-neutral-200`, hover row tint `--color-neutral-100`.

### Badges / Tags
- Pill-shaped, `radius-full`, 4px/10px padding, uppercase 11px label.
- Status badges map directly to semantic colors (see Status Mapping below).

### Dialogs
- Centered modal, max-width 480px, `radius-lg`, `elevation-3`, scrim `rgba(17,19,24,0.4)`.
- Used for: Confirm Erasure, Confirm Correction.

### Bottom Sheets
- Mobile-only pattern for OTP entry and action confirmation, slides up from bottom, `radius-lg` top corners only, drag handle indicator at top center.

### Snackbars / Toasts
- Bottom-center on mobile, bottom-right on desktop, `radius-md`, dark surface (`--color-neutral-900` bg, white text), auto-dismiss after 4s, includes icon + single-line message.

### Progress Indicators
- Linear progress bar for OTP countdown/resend timer.
- Circular spinner (Lucide `Loader2`, animated rotate) for async loading states.

### Loading Skeletons
- Gray pulse blocks (`--color-neutral-200` base, shimmer animation) matching the exact shape of the Identity Profile Card and Activity Timeline rows.

### Icons
- **Lucide Icons** exclusively. Stroke width 1.75px. Standard size 20px inline, 24px in cards, 32px for empty-state illustrations.

### Illustrations
- Minimal, line-art style, single-color (`--color-primary` or `--color-neutral-400`), no photographic or stock imagery. Used only in empty states and the landing hero.

---

## Accessibility

- Minimum contrast ratio 4.5:1 for all body text.
- All interactive elements have visible focus states (2px outline, `--color-primary`).
- Form errors communicated via text + icon, never color alone.
- All icons paired with `aria-label` or visually-hidden text where they carry meaning (not purely decorative).

## Dark Mode

- Full parity with light mode; semantic tokens shift to dark equivalents (see Color Palette dark tokens).
- Status colors keep hue but reduce saturation slightly to avoid neon glare on dark surfaces.

## Responsive Behaviour

- Breakpoints: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px.
- Below `md`: single-column layouts, bottom sheets replace modals, sticky bottom action bar for primary CTAs.

---

## Motion Guidelines

### Animation Duration
- Micro-interactions (button press, toggle): 120ms
- Component transitions (card hover, tab switch): 200ms
- Page/screen transitions: 300–350ms
- Modal/bottom-sheet enter/exit: 250ms

### Transition Types
- Page transitions: fade + slight upward slide (12px), ease-out.
- Modal entry: scale from 0.96 → 1 + fade, ease-out.
- Bottom sheet: slide up from 100% translateY, spring easing (Framer Motion `type: spring, stiffness: 300, damping: 30`).

### Interaction Patterns
- Buttons scale to 0.98 on press (Framer Motion `whileTap`).
- Cards lift slightly (`elevation-1` → `elevation-2`) on hover, 150ms ease.

### Micro Interactions
- OTP digit auto-advances focus to next box on entry.
- Success checkmark animates in with a small draw-on effect after verification.
- Status badge color-transitions smoothly (200ms) when status updates (e.g., Pending → Resolved).

---

## Empty States

- **Activity Timeline (no requests yet):** line-art illustration of a document + magnifying glass, headline "No activity yet," caption "Once you submit a correction or erasure request, you'll see its progress here."

## Success States

- Full-screen or card-level checkmark animation (Lucide `CheckCircle2`, `--color-success`), paired with a concise confirmation headline and next-step guidance.

## Permission Dialogs

- Used before erasure: explains consequence in plain language before allowing confirmation (see Deletion Flow copy below).

## Confirmation Dialogs

- Two-button pattern: Secondary ("Cancel") + Primary or Destructive ("Confirm"). Destructive action button never pre-focused by default (prevents accidental confirm via Enter key).

## Deletion Flow (Erasure Request)

1. User taps "Request Erasure" on Identity Profile.
2. Dialog opens: explains what erasure means, including the spam-protection trade-off, in plain language.
3. User confirms → brief loading state (800ms simulated) → success toast → status badge updates to "Under Review" → entry added to Activity Timeline.

## OTP Flow

1. Phone number entered → "Send Code" button triggers loading state (600ms simulated).
2. Transition to OTP screen (bottom sheet on mobile, centered card on desktop).
3. 6-digit input, auto-focus/auto-advance, countdown timer for resend (30s).
4. On correct mock code (`123456`): success animation → auto-navigate to Identity Profile after 800ms.
5. On incorrect code: shake animation on input row + inline error text.

---

## UX Copy

### Landing Page
- **Headline:** "Your number. Your identity. Your control."
- **Subheadline:** "See what Truecaller knows about your phone number — and decide what happens next."
- **Primary CTA:** "Check My Number"
- **Secondary link:** "Learn how this works"

### Phone Entry Screen
- **Title:** "Verify your number"
- **Description:** "We'll send a one-time code to confirm this number belongs to you."
- **Input label:** "Phone number"
- **Placeholder:** "Enter 10-digit mobile number"
- **Button:** "Send Code"
- **Validation message:** "Please enter a valid 10-digit number."

### OTP Screen
- **Title:** "Enter the code"
- **Description:** "We've sent a 6-digit code to {phone number}."
- **Resend label:** "Resend code in 0:30"
- **Resend active label:** "Resend code"
- **Error message:** "That code didn't match. Please try again."
- **Button:** "Verify"

### Identity Profile
- **Section title:** "Your Identity Profile"
- **Field labels:** "Display Name," "Spam Classification," "Times Looked Up," "Last Updated"
- **Helper caption:** "This is based on how your number has been saved and tagged across the Truecaller network."
- **Primary action:** "Edit Name"
- **Secondary action:** "Request Erasure"

### Correction Flow
- **Title:** "Update your display name"
- **Input label:** "Name"
- **Helper text:** "This name will be reviewed before it's updated across the network."
- **Button:** "Submit for Review"
- **Toast on submit:** "Your correction has been submitted for review."

### Erasure Flow (Confirmation Dialog)
- **Title:** "Request to remove your number?"
- **Body:** "This will remove your number from public identification. Note: this may reduce spam-call protection for calls made to your number, since your number will no longer carry a verified identity or spam label."
- **Cancel button:** "Cancel"
- **Confirm button:** "Request Erasure"
- **Toast on submit:** "Your erasure request has been submitted and is under review."

### Activity Timeline
- **Title:** "Your Activity"
- **Empty state headline:** "No activity yet"
- **Empty state caption:** "Once you submit a request, you'll see its progress here."
- **Status labels:** "Pending," "Under Review," "Resolved"

### Toasts (Global)
- Success: "✓ Your request has been submitted."
- Error: "Something went wrong. Please try again."
- Info: "Your code has been resent."

### Tooltips
- On spam classification badge: "This score reflects how often this number has been reported by other users."
- On "Times Looked Up": "An approximate count of how often your number has been searched or identified."

---

## Component Checklist (Reference for Build)

- [ ] Button (Primary, Secondary, Ghost, Destructive)
- [ ] Input (Text, OTP)
- [ ] Card (Standard, Elevated/Identity Profile)
- [ ] Badge/Status Pill
- [ ] Dialog (Confirm Erasure, Confirm Correction)
- [ ] Bottom Sheet (Mobile OTP, Mobile Actions)
- [ ] Toast/Snackbar
- [ ] Progress Spinner
- [ ] Loading Skeleton (Card, List Row)
- [ ] Empty State Illustration Block
- [ ] Activity Timeline Row
- [ ] Countdown Timer (Resend OTP)

Every screen in this product should look and feel like a finished, modern, production application — no lorem ipsum, no placeholder icons, no unstyled default browser elements.
