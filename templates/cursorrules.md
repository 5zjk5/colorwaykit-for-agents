# Cursor rules — brand colors via DESIGN.md

> Install: copy this file to your project root and rename it `.cursorrules`
> (or paste the body into `.cursor/rules/` in newer Cursor versions).

Color source of truth: `DESIGN.md` at the project root. Read it before writing
any styling.

- Follow the YAML tokens; they are normative. The Markdown body explains intent.
- Use semantic roles only: primary, on-primary, surface, on-surface,
  on-surface-variant, on-surface-subtle, outline, outline-strong, error,
  on-error, success, warning, info. Never paste raw hex into a component.
- Dark-theme roles are prefixed `dark-`. Use one theme per surface; never mix
  light and dark roles in the same view.
- Component tokens reference colors with `{colors.x}`. Keep that indirection —
  resolve through the token, not the literal value.
- The `Colors` section lists measured WCAG 2.1 ratios and APCA `Lc` per
  text/background pair. Do not introduce pairings that are not measured there,
  and do not ship pairs recorded as failing.
- `typography`, `rounded` and `spacing` are declared `omitted` in the front
  matter. Use the framework's existing defaults; do not invent values.
- Map roles consistently across formats: `{colors.primary}` should equal
  `--color-primary`, Tailwind `theme.colors.primary`, DTCG
  `semantic.light.primary`.
- Regenerate `DESIGN.md` from https://www.colorwaykit.com/brand rather than
  hand-editing hex.
