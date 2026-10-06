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

## Verification (run it, don't eyeball it)

After adding or changing any color, verify with one of these — do not rely on
how the output looks:

1. **CLI (offline, CI-ready):**

       npx colorwaykit-lint --tokens DESIGN.md --target .

   Exit 0 = clean; exit 1 = wild hex values or failing pairs. Add `--apca` to
   also report APCA Lc per pair. Wire it into CI so new colors go through the
   file first.

2. **MCP tool (live):** with the ColorwayKit MCP server connected, call
   `check_pair` with any fg/bg hex before using the pairing.

## Option: MCP server (live)

Prefer a live interface over the file? Connect the ColorwayKit MCP server:

    claude mcp add --transport http colorwaykit https://www.colorwaykit.com/api/mcp --header "Authorization: Bearer ck_YOUR_TOKEN"

Get the token from colorwaykit.com → My Projects → Agent tab (free account).
Tools: `get_theme` (one hex → full verified theme), `check_pair` (validate any
pair on the fly), `get_theme_by_project`. Quota: Free 5 calls/day · Plus
1,000/month · Pro unlimited. Details: https://www.colorwaykit.com/agents
