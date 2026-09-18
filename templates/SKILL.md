---
name: brand-color-system
description: Apply the project's DESIGN.md color tokens to any generated UI. Use when creating or restyling components, pages, buttons, forms, cards, or when choosing text/background colors, so output matches the brand instead of inventing colors.
---

# Apply the project's DESIGN.md

This project keeps its visual identity in `DESIGN.md` at the repository root:
YAML design tokens (normative values) plus a Markdown body (when and why to use
them).

## Rules

1. **Read `DESIGN.md` before writing any styling.** The tokens are normative;
   the prose explains intent. If the two disagree, follow the tokens and say so.
2. **Use semantic roles, never raw hex.** Reference tokens by role — `primary`,
   `on-primary`, `surface`, `on-surface`, `on-surface-variant`, `outline`,
   `error` — rather than copying a hex value into a component.
3. **Both themes exist.** Dark-theme roles carry a `dark-` prefix in the front
   matter. Never mix a light role with a dark role inside one theme; switch the
   whole set.
4. **Respect the measured contrast results.** The `Colors` section reports a
   measured WCAG 2.1 ratio and APCA `Lc` for each text/background pair. Do not
   invent new text-on-background combinations that are absent from that list; if
   you need one, compute it and flag it for review.
5. **Pairs marked as failing stay failing.** Don't ship a new component that
   relies on them. Suggest a fix or pick a passing pair.
6. **Typography, spacing and radii are omitted** from this DESIGN.md (listed
   under `omitted:`). Use the framework's existing defaults; do not invent
   values.
7. **Component tokens are color-only** here (`backgroundColor`, `textColor`,
   `borderColor`). Padding and radius come from your component library.

## Where values land in code

The same theme is exported alongside `DESIGN.md` as CSS custom properties
(`--color-<role>`), a Tailwind config, Tokens Studio JSON and W3C DTCG tokens.
When wiring colors up, keep the role names identical across formats so
`{colors.primary}` in this file maps to `--color-primary` /
`theme.colors.primary` / `semantic.light.primary` in yours.

## When the brand changes

Regenerate `DESIGN.md` from the ColorwayKit Brand Theme Engine
(https://www.colorwaykit.com/brand) rather than hand-editing hex values. Hand
edits bypass the recorded contrast measurements.
