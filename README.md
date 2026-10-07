# ColorwayKit for Agents

Give your AI coding agent a brand's color system it can actually follow.

[![License: MIT](https://img.shields.io/badge/License-MIT-d9480f)](./LICENSE) [![Website](https://img.shields.io/badge/website-colorwaykit.com-1e1a16)](https://www.colorwaykit.com) [![MCP endpoint](https://img.shields.io/badge/MCP-live_endpoint-d9480f)](https://www.colorwaykit.com/mcp)

**ColorwayKit** turns one brand color into a complete, accessible light & dark
web theme — 23 semantic roles, WCAG 2.1 + APCA contrast checks, and exports you
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

## Two ways to feed your agent

| | **MCP server (live)** | **Files (this repo)** |
| --- | --- | --- |
| What the agent gets | Measured tokens on demand, per-pair contrast results | A versioned DESIGN.md committed to the repo |
| Setup | One command + a token | Copy two files into the project root |
| Best for | Daily development, cross-project use | Baking the brand into the codebase, CI, offline |
| Quota | Account-metered (Free 5/day · Plus 1,000/mo · Pro unlimited) | None — it's a file |

Both are free with a ColorwayKit account. Pick one, or use files as the
versioned source and MCP as the live interface.

## Option A: MCP server (live)

1. Create a free account at [colorwaykit.com](https://www.colorwaykit.com),
   then **My Projects → Agent tab → Generate token**.
2. Connect (Claude Code example):

   ```bash
   claude mcp add --transport http colorwaykit https://www.colorwaykit.com/api/mcp --header "Authorization: Bearer ck_YOUR_TOKEN"
   ```

3. Ask your agent: *"list the color tokens for #4F46E5"* — if it replies with
   named roles and measured contrast numbers, you are connected. Full setup
   for Cursor / Codex / Gemini CLI: https://www.colorwaykit.com/mcp

Tools: `get_theme` (one hex → full verified light & dark theme),
`check_pair` (validate any text/background pair on the fly),
`get_theme_by_project` (your saved cloud project),
`list_projects` (enumerate your saved projects, newest first).

## Option B: the file way (quick start)

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
project and adapt the paths. Every template now ships with an executable
verification step — see below.

## Verify with the linter (CLI)

Keep new colors honest with the companion checker — wild-color scan plus
WCAG 2.1 pair validation, exit codes for CI. It ships in this repo — runs with Node 18+, no install:

```bash
node cli/index.js --tokens DESIGN.md --target .
```

Exit 0 = clean; exit 1 = wild hex values or failing pairs. Add `--apca` to also
report APCA Lc per pair. Source lives in [`cli/`](./cli) — wire it into a CI
step so new colors go through the file first.


## Already have extracted colors?

If you came from a DevTools inspection or an extraction tool, your hex list has
no roles and no measurements yet. The migration guide walks it the last mile:
[`docs/migration-extracted-css.md`](./docs/migration-extracted-css.md) — raw hex
→ semantic roles → measured pairs → a formal DESIGN.md, with a real worked
example (including a pair that genuinely fails).

## FAQ

**Where do the templates live?** In this repository — free to copy. The
DESIGN.md format itself is specified by Google Labs (Apache-2.0).

**Do they work outside Claude Code?** Yes. Templates are plain Markdown:
`.cursorrules` for Cursor, `AGENTS.md` for Codex and most agents, `SKILL.md`
for skill-aware clients.

**Do I need both a skill and the MCP server?** They compose. The file is the
versioned contract your team ships; MCP is the live measurement tool that
validates pairs and pulls freshly tuned themes on demand.

**Is everything free?** The templates, the Brand Theme Engine and the contrast
checker are free. The MCP server is metered per account: Free 5 calls/day,
Plus 1,000/month, Pro unlimited.
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
