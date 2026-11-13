# ColorwayKit — Skill for AI Coding Agents

One brand color in — a measured, exportable, color-blind-safe design system
out. Install this skill, paste your token, and your AI coding agent runs the
whole ColorwayKit engine through MCP: verified light & dark themes, every
export file, contrast checks, color-blindness reports.

**Get your free token:** [colorwaykit.com](https://www.colorwaykit.com) →
My Projects → Agent tab

## Install (60 seconds)

1. Copy this repo's [`SKILL.md`](./SKILL.md) into your agent's skills folder —
   `~/.claude/skills/colorwaykit/SKILL.md` for Claude Code.
2. Replace `ck_YOUR_TOKEN_HERE` with your token.
3. Run the one-line connect command inside the skill.

Done. Ask your agent:

- *"Get a theme for #4F46E5"* → measured 23-role light & dark tokens
- *"Export the files"* → CSS, Tailwind v3 & v4, SCSS, DTCG, Tokens Studio,
  DESIGN.md — in one call
- *"Give me a color-blindness report"* → Markdown + JSON, four vision types
- *"Check #FFFFFF on #4F46E5"* → WCAG + APCA verdict with a fix on fail

## What your agent gets — 8 tools

| Tool | What it does for you |
| --- | --- |
| `get_theme` | Turns one brand hex into the full verified theme: 23 semantic roles, light & dark, every text/background pair measured (WCAG 2.1 + APCA), failing pairs come with hue-preserving fixes |
| `export_assets` | Hands over every export file in one call — CSS variables, Tailwind v3 & v4 config, SCSS, W3C DTCG, Tokens Studio, DESIGN.md, brand assets. Identical to the zip on colorwaykit.com |
| `export_cvd` | Produces a color-blindness report (Markdown + JSON): every role pair simulated across four vision types, so accessibility reviews cite numbers instead of opinions |
| `get_report` | Full accessibility report.md + report.json — paste straight into PRs, issues and CI |
| `check_pair` | Judges any text/background pair under WCAG + APCA before it ships, and suggests a fix that keeps your brand hue when it fails |
| `get_token_usage` | Explains what each semantic token is for, with light & dark hex — no more "which grey is this?" |
| `get_theme_by_project` | Brings back the verified theme saved in your ColorwayKit cloud projects |
| `list_projects` | Lists your saved projects, newest first |

## What changes for you

- **No more invented colors.** The agent stops guessing greys and pulls roles
  from one measured system, so page 1 and page 10 look like the same product.
- **No more eyeballing contrast.** Every pairing ships with measured WCAG and
  APCA verdicts — and a fix that never repaints your brand.
- **No more re-describing your palette.** The token file, the exports and the
  live checks all speak the same role names, across every format your stack
  consumes.
- **Accessibility becomes evidence.** Four-vision-type simulation and measured
  ratios turn "looks fine to me" into a report your team and clients can read.

## Prefer files over live calls?

Generate `DESIGN.md` once on the website, commit it to your repo, and the skill
falls back to it whenever MCP is unreachable — zero runtime, works offline,
versioned with your code:

- **Brand Theme Engine** (free, no account): [colorwaykit.com/brand](https://www.colorwaykit.com/brand)
- **Color Contrast Checker** (free): [colorwaykit.com/contrast-checker](https://www.colorwaykit.com/contrast-checker)
- **Tailwind Color Generator** (free): [colorwaykit.com/tailwind](https://www.colorwaykit.com/tailwind)

## Links

- Website: [colorwaykit.com](https://www.colorwaykit.com)
- MCP setup for Claude Code / Cursor / Codex / Gemini CLI: [colorwaykit.com/mcp](https://www.colorwaykit.com/mcp)
- Skills overview: [colorwaykit.com/skills](https://www.colorwaykit.com/skills)

## License

MIT — see [LICENSE](./LICENSE). The DESIGN.md format this skill exports is
specified by Google Labs ([google-labs-code/design.md](https://github.com/google-labs-code/design.md));
ColorwayKit exports to it.
