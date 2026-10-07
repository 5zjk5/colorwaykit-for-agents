# colorwaykit-lint

CI-ready drift checker for ColorwayKit design tokens: wild-color scan plus
WCAG 2.1 pair validation (optional APCA reporting). Ships with this repository
- run it with Node 18+, no install required.

## Usage

From the repository root:

```bash
node cli/index.js --tokens DESIGN.md --target .
```

- Exit 0 = clean
- Exit 1 = wild hex values or failing pairs
- Add `--apca` to also report APCA Lc per pair

## Links

- Website: https://www.colorwaykit.com
- Repository: https://github.com/5zjk5/colorwaykit-for-agents