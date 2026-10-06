# Agent instructions

## Design system

This project's colors live in [`DESIGN.md`](./DESIGN.md) at the repository root.

Before generating or modifying any UI:

1. Read `DESIGN.md`. Its YAML front matter is the normative token set; the
   Markdown body explains when to apply each role.
2. Use semantic roles (`primary`, `on-primary`, `surface`, `on-surface`,
   `on-surface-variant`, `outline`, `error`, …). Never hard-code hex literals
   into components.
3. Dark-theme roles are prefixed `dark-`. Keep one theme per surface — don't mix
   light and dark roles.
4. The `Colors` section records measured WCAG 2.1 ratios and APCA `Lc` values for
   every text/background pair. Do not introduce new pairings that aren't measured
   there; if the design needs one, compute it and raise it for review.
5. Any pair marked failing must not be used in shipped UI.
6. `typography`, `rounded` and `spacing` are declared `omitted`. Use your
   framework's existing defaults; do not invent scale values.
7. Component tokens in the front matter define color only. Sizing, padding and
   radius come from your component library.

## Regenerating

Don't hand-edit `DESIGN.md`. Regenerate it from
[the Brand Theme Engine](https://www.colorwaykit.com/brand), which also exports
the same theme as CSS variables, Tailwind config, Tokens Studio JSON and W3C DTCG
tokens with matching role names.

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
