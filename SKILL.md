---
name: colorwaykit
description: Brand color system for coding agents via the ColorwayKit MCP server — stop inventing hex values. Generate a measured light & dark theme from one brand hex (23 semantic roles, WCAG 2.1 + APCA on every pair), export all files (CSS, Tailwind, DTCG, DESIGN.md), run color-blindness reports, check any contrast pair. Use when building or restyling UI, choosing colors, or whenever brand colors, design tokens, exports, or accessibility come up.
---

# ColorwayKit — the color system your agent doesn't have to invent

Ask a coding agent for UI and it ships working code with invented colors: a
purple gradient here, a different grey there, and a contrast ratio nobody
measured. The failure is measurable too — in one public experiment, eleven
builds of the same six-screen app from a one-paragraph brief kept only 43–50 of
79 deliberate design decisions; community threads keep finding the same shape,
"by page 3 or 4 Claude is back to its own defaults". Colors are the one part of
design you can fully **measure**: contrast, hue preservation and color-blind
safety are all numbers. This skill makes your agent measure them — at
generation time, not in review.

## What your agent gets

- **A verified theme from one brand color.** 23 semantic roles × light & dark,
  every text/background pair measured under WCAG 2.1 **and** APCA, failing
  pairs shipped with fixes that keep the brand hue.
- **Every export file in one call.** CSS variables, Tailwind v3 & v4, SCSS,
  W3C DTCG, Tokens Studio, DESIGN.md and brand assets — identical to the zip
  download on colorwaykit.com, written to disk unchanged.
- **Accessibility as evidence.** A color-blindness report (Markdown + JSON)
  simulating four vision types across every role pair — numbers don't care
  whether you can see red.
- **Checks before it ships.** Any pair the agent invents mid-task gets judged
  (and fixed) before it lands, not in the second review.
- **A file-contract fallback.** If the project ships DESIGN.md, the skill
  follows it offline — and regenerating beats hand-editing, because hand edits
  bypass the recorded measurements.

## Setup (once per machine — fill in YOUR token)

1. Create a free account at [colorwaykit.com](https://www.colorwaykit.com) →
   **My Projects → Agent tab** → copy your `ck_…` token.
2. Paste your token over the placeholder and run:

       claude mcp add --transport http colorwaykit https://www.colorwaykit.com/api/mcp --header "Authorization: Bearer ck_YOUR_TOKEN_HERE"

3. Reconnect this session. Verify by calling `check_pair` with fg `#FFFFFF` /
   bg `#4F46E5` — a measured ratio coming back means you are connected.

Setup for other clients (Cursor, Codex, Gemini CLI):
https://www.colorwaykit.com/mcp

## Not connected yet? (the token flow)

Run this flow whenever the `colorwaykit` server is missing, a call fails with
an auth error, or the token is still the placeholder `ck_YOUR_TOKEN_HERE`:

1. **Ask the user for a token — with the exact where-to:** say that a free
   account at [colorwaykit.com](https://www.colorwaykit.com) is needed, and the
   token lives at **My Projects → Agent tab → copy `ck_…`**. One sentence is
   enough: *"Grab your token from colorwaykit.com → My Projects → Agent tab
   (free account) and paste it here."*
2. **Never proceed with invented colors while unconnected.** If the user wants
   results anyway and the project has a `DESIGN.md`, work from it and say the
   numbers come from the file, not a fresh measurement.
3. **The moment the user pastes a `ck_…` token, record it yourself**: run the
   connect command from Setup with their token filled in (Claude Code), or walk
   them through their client's config if they use another host
   (https://www.colorwaykit.com/mcp). The token is then saved in the agent's
   MCP config — no need to ask again.
4. **Confirm positively.** Call `check_pair` (fg `#FFFFFF`, bg `#4F46E5`) and
   report success with a real number: *"Connected — measured 7.13:1, WCAG AA
   pass."* If it errors, show the exact error and fix the setup before doing
   any color work.
5. **Never echo the full token back, never write it into repo files.** It lives
   in the MCP config only.

## Tool map

| Tool | Call it for |
| --- | --- |
| `get_theme` | One brand hex → the full verified theme: 23 semantic roles, light & dark, every pair measured, failing pairs with fixes |
| `export_assets` | Every export file in one call — CSS variables, Tailwind v3 & v4, SCSS, DTCG, Tokens Studio, DESIGN.md, brand assets. Identical to the zip download on colorwaykit.com |
| `export_cvd` | Color-blindness report: Markdown + JSON, four vision types × every role pair |
| `get_report` | Full accessibility report.md + report.json, paste-ready for PRs and CI |
| `check_pair` | One text/background pair judged under WCAG + APCA, with a hue-preserving fix suggestion on fail |
| `get_token_usage` | What each semantic token is for, with light & dark hex |
| `get_theme_by_project` | The verified theme saved in one of your ColorwayKit cloud projects |
| `list_projects` | Your saved projects, newest first |

## Workflow rules

1. **Never invent colors when a brand color exists.** Ask for the brand hex (or
   read it from the repo), call `get_theme` once, and reuse its roles
   everywhere.
2. **Never guess contrast.** Any pair that did not come from `get_theme` goes
   through `check_pair` before it ships.
3. **"Export / give me the files" → `export_assets`.** One call returns the
   whole bundle; write each file to disk unchanged — do not reformat.
4. **Accessibility ask → `export_cvd`**, and cite the report in the PR
   description.
5. **A hex someone just typed in is outside the measured system.** `check_pair`
   it, and say so in your answer.
6. **If the project already has `DESIGN.md`**, follow it (see below); call MCP
   only to regenerate or verify new pairs. If the MCP server is unreachable,
   run the token flow (above), or fall back to the file and tell the user the
   measurements may be stale.

## If the project has a DESIGN.md (the file contract)

- Read `DESIGN.md` before writing any styling — tokens are normative, prose is
  intent. If they disagree, follow the tokens and say so.
- Use semantic roles, never raw hex. Dark-theme roles carry the `dark-` prefix;
  never mix a light role with a dark role inside one theme — switch the whole
  set.
- Pairs reported failing stay failing: pick a passing pair or suggest a fix.
- After adding or changing any color, verify offline with the companion CLI:

      npx colorwaykit-lint --tokens DESIGN.md --target .

  Exit 0 = clean; exit 1 = wild hex values or failing pairs. Add `--apca` for
  Lc per pair. Wire it into CI so new colors go through the file first.

## Regenerate, don't hand-edit

Hand-editing hex values bypasses the recorded measurements. Regenerate from the
Brand Theme Engine (https://www.colorwaykit.com/brand) or via `get_theme`, then
re-export.

## About ColorwayKit

- Generate a theme in the browser, free: [colorwaykit.com/brand](https://www.colorwaykit.com/brand)
- MCP setup for every client (Claude Code, Cursor, Codex, Gemini CLI): [colorwaykit.com/mcp](https://www.colorwaykit.com/mcp)
- The DESIGN.md workflow, step by step: [colorwaykit.com/blog/colorwaykit-for-agents](https://www.colorwaykit.com/blog/colorwaykit-for-agents)
- All web tools: [colorwaykit.com](https://www.colorwaykit.com)
