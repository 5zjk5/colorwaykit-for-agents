# ColorwayKit for Agents

Give your AI coding agent a brand's color system it can actually follow.

**ColorwayKit** turns one brand color into a complete, accessible light & dark
web theme — 20 semantic tokens, WCAG 2.1 + APCA contrast checks, and exports you
can paste straight into a project.

- Website: https://www.colorwaykit.com
- Build a theme and export it: https://www.colorwaykit.com/brand

## The problem this solves

Coding agents write working UI but invent colors: a blue button here, a
different grey there, and a contrast ratio nobody checked. Re-describing your
palette in every prompt doesn't scale.

[DESIGN.md](https://github.com/google-labs-code/design.md) is an open format,
adopted by AI coding tools, that puts a design system in one plain-text file:
YAML design tokens (machine-readable values) plus a Markdown body (when and why
to use them). Drop it in your project root and the agent reads it instead of
guessing.

This repository collects the templates and an example we generate with
ColorwayKit, so you can wire that file into the agents you already use.

## Quick start

1. Open the [Brand Theme Engine](https://www.colorwaykit.com/brand) and paste
   your brand hex (from your logo or guidelines).
2. Go to the **Take it to dev** tab and copy or download `DESIGN.md`. It is a
   free export format, alongside CSS variables, Tailwind config, Tokens Studio
   JSON and W3C DTCG tokens.
3. Save it as `DESIGN.md` in your project root.
4. Point your agent at it — see [`templates/`](./templates).

## What the exported file contains

- `colors` in YAML front matter: semantic roles for both themes
  (`primary`, `on-primary`, `surface`, `on-surface`, `outline`, `error`, …),
  with dark-theme roles prefixed `dark-`.
- `components` that reference those colors with `{colors.x}` syntax, so one
  change propagates.
- A Markdown `Colors` section listing a **measured** result for every
  text/background pair: WCAG 2.1 ratio against its threshold, plus APCA `Lc`
  against the use-case threshold. Pairs that fail are marked as failing — the
  file reports what the tool computed, nothing more.
- `typography`, `rounded` and `spacing` are declared `omitted`: the color engine
  has no measured values for them, so they stay with your framework's defaults
  rather than being invented.

See [`examples/DESIGN.md`](./examples/DESIGN.md) — generated from the brand color
`#4F46E5` by ColorwayKit, not hand-written.

## Templates

| File | For |
| --- | --- |
| [`templates/SKILL.md`](./templates/SKILL.md) | Agent skills / tool instructions |
| [`templates/AGENTS.md`](./templates/AGENTS.md) | Repo-level agent instructions (many tools read this) |
| [`templates/CLAUDE.md`](./templates/CLAUDE.md) | Claude Code project memory |
| [`templates/cursorrules.md`](./templates/cursorrules.md) | Cursor rules (rename to `.cursorrules` on install) |

Each template only describes how to consume `DESIGN.md`. Copy one into your
project and adapt the paths.

## Notes and limits

- DESIGN.md is specified by Google Labs and licensed Apache-2.0 at
  [google-labs-code/design.md](https://github.com/google-labs-code/design.md).
  ColorwayKit is not the spec's author — we export to it.
- The specification is at an early version and describes parts of itself as
  evolving; component token structures may change.
- Contrast values are computed automatically and are a design reference, not a
  formal accessibility certification.
- The ColorwayKit engine covers color. Fonts, spacing and radii in the generated
  file are yours to define.

## License

The templates and example in this repository are provided for practical use in
your own projects. The DESIGN.md format itself is governed by its own
specification and license (see the link above).
