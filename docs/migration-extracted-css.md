# From extracted CSS to verified role tokens

> You ran a DevTools inspection or an extraction tool and now have a pile of
> hex values. They are real colors — but they have no roles, no text/background
> pairings, and no contrast measurements. This guide walks them the last mile:
> **raw hex → semantic roles → measured pairs → a formal DESIGN.md your agent
> can trust.**

Every number in this guide was computed, not invented. The worked example at
the end includes a pair that genuinely fails — because real migrations do.

## Why extracted colors are not enough

Extraction tools give you a snapshot: here are the hex values the page used.
What they don't give you is what ColorwayKit's output is built around:

1. **Roles.** `#0F172A` is not a color; it is your `on-surface` (or is it
   `on-surface-variant`?). Agents need the role to know where a value applies.
2. **Pairings.** A theme is measured as *text on background* pairs, not as a
   bag of swatches. An unmeasured pairing is a contrast bug waiting to ship.
3. **A verification trail.** When a pair fails, you want it recorded — with a
   fix — before it reaches production.

## Step 1 — inventory the extracted hexes

Collect every value from your extraction pass and dedupe. For this example we
start with six (a typical dark-text-on-light-site palette):

```
#0F172A  #F8FAFC  #FFFFFF  #475569  #2563EB  #16A34A
```

## Step 2 — map them to semantic roles

Assign each hex the role it plays, using the DESIGN.md role names
(`background`, `surface`, `on-surface`, `primary`, `on-primary`, …). With the
example set:

| Role | Hex |
| --- | --- |
| `background` | `#F8FAFC` |
| `surface` | `#FFFFFF` |
| `on-surface` | `#0F172A` |
| `on-surface-muted` (secondary text) | `#475569` |
| `primary` | `#2563EB` |
| `on-primary` | `#FFFFFF` |
| `success` | `#16A34A` |
| `on-success` | `#FFFFFF` |

If two hexes play the same role in different places, pick one and note the
difference — a role should resolve to one value per theme.

## Step 3 — measure every text/background pair

Run the pairs through measurement (the ColorwayKit engine does WCAG 2.1 and
APCA in one pass; the CLI does the same offline). Real measured results for
the mapping above, WCAG 2.1 at the 4.5:1 normal-text threshold:

| Pair | Measured | Result |
| --- | --- | --- |
| `on-surface` on `background` | **17.06:1** | PASS |
| `on-surface` on `surface` | **17.85:1** | PASS |
| `on-surface-muted` on `background` | **7.24:1** | PASS |
| `primary` on `background` | **4.94:1** | PASS |
| `on-primary` on `primary` | **5.17:1** | PASS |
| `on-success` on `success` | **3.30:1** | **FAIL** |

The last row is the point of the whole exercise: white on `#16A34A` looks fine
and measures 3.30:1 — below the 4.5:1 requirement for normal text. An
unverified migration would have shipped it. The engine flags it and offers a
hue-preserving suggestion (darken the `success` step until the pair holds).

## Step 4 — generate the formal DESIGN.md

Paste the mapped `primary` into the
[Brand Theme Engine](https://www.colorwaykit.com/brand), apply the rest of the
mapping as token overrides, then export DESIGN.md from the **Take it to dev**
tab. The output is the same format the
[examples](../examples/DESIGN.md) in this repository show: YAML tokens as the
normative layer, per-pair measured results in the `Colors` section, and honest
`omitted` declarations for anything the color engine doesn't cover.

From there the agent wiring is identical to any other DESIGN.md — see the
templates in [`templates/`](../templates), or connect the agent to the live
ColorwayKit MCP server (setup at https://www.colorwaykit.com/agents) so it can
pull the theme and `check_pair` any new combination on demand.

## Checklist

- [ ] Every extracted hex has exactly one role per theme
- [ ] Every text/background pair you plan to use is measured
- [ ] Failing pairs are fixed or replaced — never shipped as-is
- [ ] DESIGN.md is regenerated from the engine (hand-edited hex bypasses measurement)
- [ ] The agent reads the file (templates) or the MCP server — not a prompt

## Related

- Brand Theme Engine: https://www.colorwaykit.com/brand
- MCP setup for agents: https://www.colorwaykit.com/agents
- Why unverified AI UI fails contrast: https://www.colorwaykit.com/blog/why-ai-websites-fail-contrast
