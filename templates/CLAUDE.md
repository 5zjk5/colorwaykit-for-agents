# Project memory

## Colors come from DESIGN.md

`DESIGN.md` in this repo root is the single source of truth for color. Read it
before styling anything.

- Front matter = normative tokens. The Markdown body = intent and application
  rules.
- Use semantic roles (`primary`, `on-primary`, `surface`, `on-surface`,
  `on-surface-variant`, `outline`, `error`, …). No raw hex inside components.
- Dark-theme roles are prefixed `dark-`; never mix light and dark roles.
- The `Colors` section holds measured WCAG 2.1 ratios and APCA `Lc` values per
  text/background pair. Don't create unmeasured pairings; don't ship pairs
  recorded as failing.
- `typography`, `rounded`, `spacing` are marked `omitted` — use existing
  framework defaults rather than inventing values.
- Component tokens define color only; padding and radius belong to our component
  library.

## Consistency with other formats

The same theme is exported as CSS custom properties, a Tailwind config, Tokens
Studio JSON and W3C DTCG tokens, with identical role names, so
`{colors.primary}` maps to `--color-primary` / `theme.colors.primary` /
`semantic.light.primary`.

## Updating the palette

Regenerate from https://www.colorwaykit.com/brand instead of editing hex by
hand — manual edits fall outside the recorded contrast measurements.
