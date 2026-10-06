#!/usr/bin/env node
/**
 * colorwaykit-lint — CI-ready drift checker for ColorwayKit design tokens.
 *
 *   npx colorwaykit-lint --tokens DESIGN.md --target .
 *
 * Check 1 (wild colors): every hex / rgb() value in your target files that is
 *   NOT one of the token values is reported (file:line + value + nearest token).
 * Check 2 (pair validation): every text/on-* token pair from the token file is
 *   measured with WCAG 2.1 (4.5:1 threshold). Add --apca to also report APCA Lc.
 *
 * Exit code: 0 = clean, 1 = violations found, 2 = usage/IO error.
 * No dependencies. APCA implementation is the W3-licensed port of apca-w3
 * v0.1.9 (see APCA notice inside) — free web-content contrast use only.
 */

"use strict";

const fs = require("fs");
const path = require("path");

/* ---------------- WCAG (same algorithm as the ColorwayKit engine) ---------------- */

function hexToRgb01(hex) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return [
    parseInt(full.slice(0, 2), 16) / 255,
    parseInt(full.slice(2, 4), 16) / 255,
    parseInt(full.slice(4, 6), 16) / 255,
  ];
}

function relativeLuminance(hex) {
  const [r, g, b] = hexToRgb01(hex).map((v) =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(fg, bg) {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/* ---------------- APCA 0.0.98G-4g (W3 license port of apca-w3 v0.1.9) ----------------
 * ⚠️ License notice (do not remove): ported from the official apca-w3 v0.1.9
 * (algorithm 0.0.98G-4g), © 2019-2022 Andrew Somers / Myndex Research,
 * W3 License for Compliant Code Only. Permitted use: FREE web-content contrast
 * prediction only — must not be placed behind any paywall; constants must not
 * be altered; not for medical/aviation/military/safety use. Source:
 * https://github.com/Myndex/apca-w3
 */

const SA98G = {
  mainTRC: 2.4, sRco: 0.2126729, sGco: 0.7151522, sBco: 0.0721750,
  normBG: 0.56, normTXT: 0.57, revTXT: 0.62, revBG: 0.65,
  blkThrs: 0.022, blkClmp: 1.414, scaleBoW: 1.14, scaleWoB: 1.14,
  loBoWoffset: 0.027, loWoBoffset: 0.027, deltaYmin: 0.0005, loClip: 0.1,
};

function sRGBtoY(hex) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const ch = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255);
  return (
    Math.pow(ch[0], SA98G.mainTRC) * SA98G.sRco +
    Math.pow(ch[1], SA98G.mainTRC) * SA98G.sGco +
    Math.pow(ch[2], SA98G.mainTRC) * SA98G.sBco
  );
}

function apcaLc(txtHex, bgHex) {
  let txtY = sRGBtoY(txtHex);
  let bgY = sRGBtoY(bgHex);
  if (Number.isNaN(txtY) || Number.isNaN(bgY) || Math.min(txtY, bgY) < 0 || Math.max(txtY, bgY) > 1.1) return 0;
  txtY = txtY > SA98G.blkThrs ? txtY : txtY + Math.pow(SA98G.blkThrs - txtY, SA98G.blkClmp);
  bgY = bgY > SA98G.blkThrs ? bgY : bgY + Math.pow(SA98G.blkThrs - bgY, SA98G.blkClmp);
  if (Math.abs(bgY - txtY) < SA98G.deltaYmin) return 0;
  let sapc = 0;
  let out = 0;
  if (bgY > txtY) {
    sapc = (Math.pow(bgY, SA98G.normBG) - Math.pow(txtY, SA98G.normTXT)) * SA98G.scaleBoW;
    out = sapc < SA98G.loClip ? 0 : sapc - SA98G.loBoWoffset;
  } else {
    sapc = (Math.pow(bgY, SA98G.revBG) - Math.pow(txtY, SA98G.revTXT)) * SA98G.scaleWoB;
    out = sapc > -SA98G.loClip ? 0 : sapc + SA98G.loWoBoffset;
  }
  return out * 100.0;
}

/* ---------------- token loading ---------------- */

/** DESIGN.md front matter → { role: "#hex" } (colors block, loose line parse) */
function tokensFromDesignMd(text) {
  const fm = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  if (!fm) return {};
  const tokens = {};
  let inColors = false;
  for (const raw of fm[1].split(/\r?\n/)) {
    const line = raw.replace(/\t/g, "  ");
    if (/^\S/.test(line)) {
      inColors = /^colors\s*:/.test(line);
      continue;
    }
    if (!inColors) continue;
    const m = /^\s{2,}([a-z0-9-]+)\s*:\s*["']?(#[0-9a-fA-F]{3,6})["']?\s*$/.exec(line);
    if (m) tokens[m[1]] = m[2].toLowerCase();
  }
  return tokens;
}

/** tokens JSON → { role: "#hex" }（递归收集值形如 #hex 的叶子，取路径末段为 role） */
function tokensFromJson(text) {
  const tokens = {};
  const walk = (node, lastKey) => {
    if (typeof node === "string") {
      const v = node.toLowerCase();
      if (/^#[0-9a-f]{6}$/.test(v) && lastKey) tokens[lastKey] = v;
      return;
    }
    if (Array.isArray(node)) return node.forEach((n) => walk(n, lastKey));
    if (node && typeof node === "object") {
      for (const [k, v] of Object.entries(node)) walk(v, k);
    }
  };
  try {
    walk(JSON.parse(text), null);
  } catch {
    return {};
  }
  return tokens;
}

function loadTokens(file) {
  const text = fs.readFileSync(file, "utf8");
  if (/\.json$/i.test(file)) return tokensFromJson(text);
  return tokensFromDesignMd(text);
}

/* ---------------- semantic pairs ---------------- */

/** 从扁平 role 集合取 text-on-x 校验对（与站内导出口径一致） */
function semanticPairs(tokens) {
  const pairs = [];
  const push = (fg, bg) => {
    if (tokens[fg] && tokens[bg]) pairs.push({ fg, bg, fgHex: tokens[fg], bgHex: tokens[bg] });
  };
  push("on-surface", "background");
  push("on-surface", "surface");
  push("text", "background");
  push("text", "surface");
  for (const base of ["primary", "secondary", "success", "warning", "error", "info"]) {
    push("on-" + base, base);
  }
  return pairs.filter((p, i, a) => a.findIndex((x) => x.fg === p.fg && x.bg === p.bg) === i);
}

/* ---------------- wild color scan ---------------- */

const SCAN_EXT = new Set([".css", ".scss", ".less", ".tsx", ".jsx", ".ts", ".js", ".mjs", ".html", ".htm", ".vue"]);
const SKIP_DIRS = new Set(["node_modules", ".git", "dist", "build", ".next", ".svn", "coverage"]);
const WILD_RE = /#[0-9a-fA-F]{3,8}\b|\brgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}/g;

function walkFiles(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walkFiles(path.join(dir, entry.name), out);
    } else if (SCAN_EXT.has(path.extname(entry.name).toLowerCase())) {
      out.push(path.join(dir, entry.name));
    }
  }
}

function nearestToken(hex, tokens) {
  const rgbOf = (h) => hexToRgb01(h).map((v) => Math.round(v * 255));
  const [r1, g1, b1] = rgbOf(hex);
  let best = null;
  let bestD = Infinity;
  for (const [role, val] of Object.entries(tokens)) {
    const [r2, g2, b2] = rgbOf(val);
    const d = (r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2;
    if (d < bestD) {
      bestD = d;
      best = role;
    }
  }
  return best;
}

function scanWildColors(scanFiles, tokens) {
  const violations = [];
  const values = new Set(Object.values(tokens).map((v) => v.toLowerCase()));
  const shortToFull = (h) => (h.length === 4 ? "#" + [...h.slice(1)].map((c) => c + c).join("") : h);
  for (const file of scanFiles) {
    let text;
    try {
      text = fs.readFileSync(file, "utf8");
    } catch {
      continue;
    }
    const lines = text.split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      for (const m of lines[i].matchAll(WILD_RE)) {
        let value = m[0].toLowerCase();
        if (value.startsWith("rgb")) {
          const nums = value.match(/\d{1,3}/g);
          if (!nums || nums.length < 3) continue;
          value =
            "#" +
            nums
              .slice(0, 3)
              .map((n) => Number(n).toString(16).padStart(2, "0"))
              .join("");
        }
        const full = shortToFull(value);
        if (values.has(full)) continue;
        violations.push({
          file: path.relative(process.cwd(), file),
          line: i + 1,
          value: m[0],
          suggestion: nearestToken(full, tokens) || "n/a",
        });
      }
    }
  }
  return violations;
}

/* ---------------- main ---------------- */

function usage() {
  console.log(`Usage: npx colorwaykit-lint --tokens <DESIGN.md | tokens.json> --target <file-or-dir> [--apca]

Checks:
  1. Wild colors  — hex/rgb() values in target files that are not token values.
  2. Pair validation — measured WCAG 2.1 ratio per text/on-* token pair (4.5:1);
     --apca additionally reports the APCA Lc value per pair.

Exit codes: 0 = clean, 1 = violations found, 2 = usage/IO error.`);
}

function main() {
  const argv = process.argv.slice(2);
  if (argv.includes("-h") || argv.includes("--help") || argv.length === 0) {
    usage();
    process.exit(argv.length === 0 ? 2 : 0);
  }
  const get = (flag) => {
    const i = argv.indexOf(flag);
    return i >= 0 ? argv[i + 1] : undefined;
  };
  const tokensFile = get("--tokens");
  const target = get("--target");
  const withApca = argv.includes("--apca");
  if (!tokensFile || !target || !fs.existsSync(tokensFile)) {
    usage();
    process.exit(2);
  }

  const tokens = loadTokens(tokensFile);
  if (Object.keys(tokens).length === 0) {
    console.error(`colorwaykit-lint: no hex tokens found in ${tokensFile}`);
    process.exit(2);
  }
  console.log(`colorwaykit-lint: ${Object.keys(tokens).length} tokens from ${tokensFile}`);

  const scanFiles = [];
  const stat = fs.statSync(target);
  if (stat.isDirectory()) {
    walkFiles(target, scanFiles);
  } else {
    scanFiles.push(target);
  }

  let failed = false;

  // Check 1: wild colors
  const wild = scanWildColors(scanFiles, tokens);
  if (wild.length) {
    failed = true;
    console.log(`\n✖ Wild colors (${wild.length}):`);
    for (const v of wild.slice(0, 100)) {
      console.log(`  ${v.file}:${v.line}  ${v.value}  → nearest token: ${v.suggestion}`);
    }
    if (wild.length > 100) console.log(`  … and ${wild.length - 100} more`);
  } else {
    console.log("\n✔ Wild colors: none found");
  }

  // Check 2: pair validation
  const pairs = semanticPairs(tokens);
  const pairFails = [];
  console.log(`\nPair validation (WCAG 2.1, 4.5:1${withApca ? " + APCA Lc" : ""}):`);
  for (const p of pairs) {
    const ratio = Math.round(contrastRatio(p.fgHex, p.bgHex) * 100) / 100;
    const pass = ratio >= 4.5;
    let lc = null;
    if (withApca) lc = Math.round(apcaLc(p.fgHex, p.bgHex) * 10) / 10;
    const mark = pass ? "✔" : "✖";
    console.log(
      `  ${mark} ${p.fg} on ${p.bg}: ${ratio.toFixed(2)}:1` +
        (withApca ? `  (APCA Lc ${lc})` : "") +
        (pass ? "" : "  ✖ below 4.5:1")
    );
    if (!pass) {
      failed = true;
      pairFails.push(`${p.fg} on ${p.bg} (${ratio.toFixed(2)}:1)`);
    }
  }
  if (pairFails.length === 0) console.log("  ✔ All measured pairs pass 4.5:1");

  console.log(
    failed
      ? `\n✖ colorwaykit-lint: violations found (wild colors: ${wild.length}, failing pairs: ${pairFails.length})`
      : "\n✔ colorwaykit-lint: clean"
  );
  process.exit(failed ? 1 : 0);
}

main();
