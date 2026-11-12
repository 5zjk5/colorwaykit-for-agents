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

## The 8 tools your agent gets (every call = 1 asset credit)

| Tool | What it returns |
| --- | --- |
| `get_theme` | Full verified theme from one hex — 23 semantic roles, light & dark, measured pairs, fixes |
| `export_assets` | Every export file in one call — identical to the zip on colorwaykit.com |
| `export_cvd` | Color-blindness report (Markdown + JSON) |
| `get_report` | Full accessibility report.md + report.json for PRs and CI |
| `check_pair` | Any text/background pair judged under WCAG + APCA, with a fix on fail |
| `get_token_usage` | What each semantic token is for, light & dark hex |
| `get_theme_by_project` | Your saved cloud-project theme |
| `list_projects` | Your saved projects, newest first |

## How the monthly pool works

Every MCP call consumes **one asset credit** from your account's monthly pool,
shared with asset downloads on the website:

| Plan | Asset credits | Price |
| --- | --- | --- |
| Free | 10 / month | $0 |
| Plus | 100 / month | $9.9/mo |
| Pro | Unlimited | $19.9/mo |

The skill teaches your agent to economize: fetch a theme once, reuse the roles,
batch questions. Pick a plan at [colorwaykit.com/pricing](https://www.colorwaykit.com/pricing).

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
- Plans & pricing: [colorwaykit.com/pricing](https://www.colorwaykit.com/pricing)

## License

MIT — see [LICENSE](./LICENSE). The DESIGN.md format this skill exports is
specified by Google Labs ([google-labs-code/design.md](https://github.com/google-labs-code/design.md));
ColorwayKit exports to it.
