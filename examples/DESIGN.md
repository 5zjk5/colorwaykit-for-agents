---
version: alpha
name: "Brand #4F46E5"
description: "Light and dark color system generated from one brand color (#4F46E5) with WCAG 2.1 and APCA contrast checks."
omitted:
  - typography
  - rounded
  - spacing
colors:
  background: "#fafafa"
  surface: "#ffffff"
  surface-hover: "#f3f3f3"
  on-surface: "#0a0a0a"
  on-surface-variant: "#525252"
  on-surface-subtle: "#717171"
  on-surface-disabled: "#d4d4d4"
  outline: "#e4e4e4"
  outline-strong: "#d4d4d4"
  primary: "#4f46e5"
  primary-hover: "#3023b9"
  primary-active: "#1e0099"
  on-primary: "#ffffff"
  secondary: "#f3f3f3"
  on-secondary: "#0a0a0a"
  success: "#008f5d"
  on-success: "#000f00"
  warning: "#b64f00"
  on-warning: "#ffffff"
  error: "#c72c54"
  on-error: "#ffffff"
  info: "#276ed2"
  on-info: "#ffffff"
  dark-background: "#0a0a0a"
  dark-surface: "#181818"
  dark-surface-hover: "#262626"
  dark-on-surface: "#fafafa"
  dark-on-surface-variant: "#a1a1a1"
  dark-on-surface-subtle: "#717171"
  dark-on-surface-disabled: "#404040"
  dark-outline: "#262626"
  dark-outline-strong: "#404040"
  dark-primary: "#96a3ff"
  dark-primary-hover: "#c2c9ff"
  dark-primary-active: "#dde0ff"
  dark-on-primary: "#0a0045"
  dark-secondary: "#262626"
  dark-on-secondary: "#fafafa"
  dark-success: "#45cca0"
  dark-on-success: "#000f00"
  dark-warning: "#ef9a62"
  dark-on-warning: "#220000"
  dark-error: "#ff8699"
  dark-on-error: "#240003"
  dark-info: "#7bb2ff"
  dark-on-info: "#000031"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
  button-primary-active:
    backgroundColor: "{colors.primary-active}"
    textColor: "{colors.on-primary}"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    borderColor: "{colors.outline}"
  input:
    backgroundColor: "{colors.background}"
    textColor: "{colors.on-surface}"
    borderColor: "{colors.outline}"
  text-body:
    textColor: "{colors.on-surface}"
  text-muted:
    textColor: "{colors.on-surface-variant}"
  text-placeholder:
    textColor: "{colors.on-surface-subtle}"
  link:
    textColor: "{colors.primary}"
  alert-success:
    backgroundColor: "{colors.success}"
    textColor: "{colors.on-success}"
  alert-warning:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.on-warning}"
  alert-error:
    backgroundColor: "{colors.error}"
    textColor: "{colors.on-error}"
---

## Overview

This design system is generated from a single brand color (#4F46E5) and derives both a light and a dark theme from the same source, so the brand hue stays recognisable while text and surfaces keep their contrast.

The front matter is the normative layer: use the tokens below instead of hard-coding hex values. Prose only explains intent and application.

The dark theme's tokens are the light theme's roles with a `dark-` prefix. Ship both and switch on a `.dark` class (or your framework's equivalent).

This file ships color tokens only. Typography, shape (rounded) and spacing are intentionally omitted — the generator has no measured values for them, so they stay with your framework's defaults.

## Colors

Each role below is a real token in the front matter, not a descriptive nickname.

### Light theme

- **`background`** (#FAFAFA): background
- **`surface`** (#FFFFFF): surface
- **`surface-hover`** (#F3F3F3): surface hover
- **`on-surface`** (#0A0A0A): on surface
- **`on-surface-variant`** (#525252): on surface variant
- **`on-surface-subtle`** (#717171): on surface subtle
- **`on-surface-disabled`** (#D4D4D4): on surface disabled
- **`outline`** (#E4E4E4): outline
- **`outline-strong`** (#D4D4D4): outline strong
- **`primary`** (#4F46E5): primary
- **`primary-hover`** (#3023B9): primary hover
- **`primary-active`** (#1E0099): primary active
- **`on-primary`** (#FFFFFF): on primary
- **`secondary`** (#F3F3F3): secondary
- **`on-secondary`** (#0A0A0A): on secondary
- **`success`** (#008F5D): success
- **`on-success`** (#000F00): on success
- **`warning`** (#B64F00): warning
- **`on-warning`** (#FFFFFF): on warning
- **`error`** (#C72C54): error
- **`on-error`** (#FFFFFF): on error
- **`info`** (#276ED2): info
- **`on-info`** (#FFFFFF): on info

### Dark theme (prefix `dark-`)

Same 23 roles, each prefixed with `dark-`.

### Text and background pairs

Every pairing below was measured on this exact theme. WCAG 2.1 references SC 1.4.3 (4.5:1 normal text, 3:1 large text) and SC 1.4.11 (3:1 non-text UI); APCA is reported as Lc against the use-case threshold. Conclusions are measured, not assumed.

- `on-surface` on `background` (light): 18.97:1 ≥ 4.5:1 — WCAG pass; APCA Lc 103 ≥ 75 — pass
- `on-surface` on `surface` (light): 19.80:1 ≥ 4.5:1 — WCAG pass; APCA Lc 106 ≥ 75 — pass
- `on-surface-variant` on `background` (light): 7.49:1 ≥ 4.5:1 — WCAG pass; APCA Lc 84 ≥ 75 — pass
- `on-surface-variant` on `surface` (light): 7.81:1 ≥ 4.5:1 — WCAG pass; APCA Lc 87 ≥ 75 — pass
- `on-surface-subtle` on `background` (light): 4.68:1 ≥ 3:1 — WCAG pass; APCA Lc 71 ≥ 15 — pass
- `primary` on `background` (light): 6.02:1 ≥ 4.5:1 — WCAG pass; APCA Lc 78 ≥ 75 — pass
- `on-primary` on `primary` (light): 6.29:1 ≥ 4.5:1 — WCAG pass; APCA Lc 86 ≥ 60 — pass
- `on-secondary` on `secondary` (light): 17.84:1 ≥ 4.5:1 — WCAG pass; APCA Lc 99 ≥ 60 — pass
- `on-success` on `success` (light): 4.76:1 ≥ 4.5:1 — WCAG pass; APCA Lc 36 ≥ 60 — fail ⚠
- `on-warning` on `warning` (light): 5.11:1 ≥ 4.5:1 — WCAG pass; APCA Lc 80 ≥ 60 — pass
- `on-error` on `error` (light): 5.36:1 ≥ 4.5:1 — WCAG pass; APCA Lc 81 ≥ 60 — pass
- `on-info` on `info` (light): 4.94:1 ≥ 4.5:1 — WCAG pass; APCA Lc 79 ≥ 60 — pass
- `outline-strong` on `background` (light): 1.42:1 ≥ 3:1 — WCAG fail; APCA Lc 20 ≥ 15 — pass ⚠
- `on-surface` on `background` (dark): 18.97:1 ≥ 4.5:1 — WCAG pass; APCA Lc 104 ≥ 75 — pass
- `on-surface` on `surface` (dark): 17.01:1 ≥ 4.5:1 — WCAG pass; APCA Lc 103 ≥ 75 — pass
- `on-surface-variant` on `background` (dark): 7.66:1 ≥ 4.5:1 — WCAG pass; APCA Lc 51 ≥ 75 — fail ⚠
- `on-surface-variant` on `surface` (dark): 6.87:1 ≥ 4.5:1 — WCAG pass; APCA Lc 50 ≥ 75 — fail ⚠
- `on-surface-subtle` on `background` (dark): 4.06:1 ≥ 3:1 — WCAG pass; APCA Lc 28 ≥ 15 — pass
- `primary` on `background` (dark): 8.47:1 ≥ 4.5:1 — WCAG pass; APCA Lc 56 ≥ 75 — fail ⚠
- `on-primary` on `primary` (dark): 8.17:1 ≥ 4.5:1 — WCAG pass; APCA Lc 57 ≥ 60 — fail ⚠
- `on-secondary` on `secondary` (dark): 14.50:1 ≥ 4.5:1 — WCAG pass; APCA Lc 101 ≥ 60 — pass
- `on-success` on `success` (dark): 9.73:1 ≥ 4.5:1 — WCAG pass; APCA Lc 65 ≥ 60 — pass
- `on-warning` on `warning` (dark): 8.87:1 ≥ 4.5:1 — WCAG pass; APCA Lc 60 ≥ 60 — fail ⚠
- `on-error` on `error` (dark): 8.48:1 ≥ 4.5:1 — WCAG pass; APCA Lc 58 ≥ 60 — fail ⚠
- `on-info` on `info` (dark): 9.24:1 ≥ 4.5:1 — WCAG pass; APCA Lc 61 ≥ 60 — pass
- `outline-strong` on `background` (dark): 1.91:1 ≥ 3:1 — WCAG fail; APCA Lc 8 ≥ 15 — fail ⚠

Pairs marked `fail` do not meet their threshold on this theme — fix them before shipping (the generator offers a hue-preserving suggestion).

## Color Vision Deficiency

Each contrast pair and each semantic color pair was re-measured under four CVD simulations (Viénot/Brettel matrices). Contrast risk = simulated WCAG ratio drops below the pair's original threshold. Semantic risk = simulated ΔE (CIEDE2000) < 20 between the semantic colors — those states may be confusable. APCA values are reference only (the APCA spec does not cover CVD).

### protanopia

Under protanopia: 21/26 pairs keep their WCAG threshold.

- ⚠ Contrast risk: `successForeground` on `success` (light): 2.04:1 < 4.5 — avoid this pairing.
- ⚠ Contrast risk: `warningForeground` on `warning` (light): 3.75:1 < 4.5 — avoid this pairing.
- ⚠ Contrast risk: `dangerForeground` on `danger` (light): 3.98:1 < 4.5 — avoid this pairing.
- ⚠ Contrast risk: `borderStrong` on `background` (light): 1.42:1 < 3 — avoid this pairing.
- ⚠ Contrast risk: `borderStrong` on `background` (dark): 1.91:1 < 3 — avoid this pairing.
- ⚠ Semantic risk: `warning` vs `danger` — ΔE 8.8 (< 20) — do not rely on color alone to tell these states apart; add icons or labels.
- ⚠ Semantic risk: `info` vs `primary` — ΔE 3.1 (< 20) — do not rely on color alone to tell these states apart; add icons or labels.

### deuteranopia

Under deuteranopia: 20/26 pairs keep their WCAG threshold.

- ⚠ Contrast risk: `successForeground` on `success` (light): 1.67:1 < 4.5 — avoid this pairing.
- ⚠ Contrast risk: `warningForeground` on `warning` (light): 3.18:1 < 4.5 — avoid this pairing.
- ⚠ Contrast risk: `dangerForeground` on `danger` (light): 3.13:1 < 4.5 — avoid this pairing.
- ⚠ Contrast risk: `borderStrong` on `background` (light): 1.42:1 < 3 — avoid this pairing.
- ⚠ Contrast risk: `successForeground` on `success` (dark): 4.49:1 < 4.5 — avoid this pairing.
- ⚠ Contrast risk: `borderStrong` on `background` (dark): 1.91:1 < 3 — avoid this pairing.
- ⚠ Semantic risk: `warning` vs `danger` — ΔE 6.0 (< 20) — do not rely on color alone to tell these states apart; add icons or labels.
- ⚠ Semantic risk: `info` vs `primary` — ΔE 4.7 (< 20) — do not rely on color alone to tell these states apart; add icons or labels.

### tritanopia

Under tritanopia: 20/26 pairs keep their WCAG threshold.

- ⚠ Contrast risk: `primary` on `background` (light): 2.95:1 < 4.5 — avoid this pairing.
- ⚠ Contrast risk: `primaryForeground` on `primary` (light): 3.08:1 < 4.5 — avoid this pairing.
- ⚠ Contrast risk: `successForeground` on `success` (light): 3.61:1 < 4.5 — avoid this pairing.
- ⚠ Contrast risk: `infoForeground` on `info` (light): 2.93:1 < 4.5 — avoid this pairing.
- ⚠ Contrast risk: `borderStrong` on `background` (light): 1.42:1 < 3 — avoid this pairing.
- ⚠ Contrast risk: `borderStrong` on `background` (dark): 1.91:1 < 3 — avoid this pairing.
- ⚠ Semantic risk: `warning` vs `danger` — ΔE 7.2 (< 20) — do not rely on color alone to tell these states apart; add icons or labels.
- ⚠ Semantic risk: `info` vs `primary` — ΔE 4.3 (< 20) — do not rely on color alone to tell these states apart; add icons or labels.

### achromatopsia

Under achromatopsia: 23/26 pairs keep their WCAG threshold.

- ⚠ Contrast risk: `successForeground` on `success` (light): 3.12:1 < 4.5 — avoid this pairing.
- ⚠ Contrast risk: `borderStrong` on `background` (light): 1.42:1 < 3 — avoid this pairing.
- ⚠ Contrast risk: `borderStrong` on `background` (dark): 1.91:1 < 3 — avoid this pairing.
- ⚠ Semantic risk: `success` vs `danger` — ΔE 3.9 (< 20) — do not rely on color alone to tell these states apart; add icons or labels.
- ⚠ Semantic risk: `warning` vs `danger` — ΔE 2.2 (< 20) — do not rely on color alone to tell these states apart; add icons or labels.
- ⚠ Semantic risk: `warning` vs `success` — ΔE 4.1 (< 20) — do not rely on color alone to tell these states apart; add icons or labels.
- ⚠ Semantic risk: `info` vs `primary` — ΔE 3.3 (< 20) — do not rely on color alone to tell these states apart; add icons or labels.

## Components

Component tokens reference color tokens with `{colors.x}` so a single change propagates. Only color properties are declared — padding and radius are left to your framework.

## Do's and Don'ts

- Do use `primary` for the single most important action per screen, and `on-primary` for its label.
- Do keep body text on `background` or `surface`, never on an arbitrary brand step.
- Do use `on-surface-variant` for secondary copy and `on-surface-subtle` only for 3:1-level hints such as placeholders.
- Don't use `outline` or `surface-hover` as a text color.
- Don't tint status colors (`success`, `warning`, `error`) into decorative fills — they carry meaning.
- Don't mix light and dark tokens in one theme; switch the whole set.
- Do re-run a contrast check after any override: hand-edited hex values bypass these measurements.

---

Generated by ColorwayKit (https://www.colorwaykit.com) from brand color #4F46E5 on 2026-10-08.
