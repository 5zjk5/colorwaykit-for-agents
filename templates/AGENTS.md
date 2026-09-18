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
