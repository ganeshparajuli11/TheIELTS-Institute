#!/usr/bin/env node
/**
 * Lightweight security self-check for The IELTS Institute.
 * Checks for common pre-deployment security issues without requiring external tools.
 * Run: node scripts/security-check.mjs
 */
import { readFileSync, existsSync, readdirSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();
let issues = 0;
let warnings = 0;

function pass(label) {
  console.log(`  ✓ ${label}`);
}
function warn(label) {
  console.warn(`  ⚠ WARN: ${label}`);
  warnings++;
}
function fail(label) {
  console.error(`  ✗ FAIL: ${label}`);
  issues++;
}

function readFile(filePath) {
  try {
    return readFileSync(filePath, "utf-8");
  } catch {
    return null;
  }
}

function walkSrc(dir, extensions, found = []) {
  if (!existsSync(dir)) return found;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (
      entry.isDirectory() &&
      !["node_modules", ".next", "dist", ".git", "generated"].includes(entry.name)
    ) {
      walkSrc(full, extensions, found);
    } else if (extensions.some((ext) => entry.name.endsWith(ext))) {
      found.push(full);
    }
  }
  return found;
}

// ─── 1. Env files not committed to git ────────────────────────────────────────
console.log("\n[1] Checking env files are not committed to git...");
const envCandidates = [".env", ".env.local", ".env.production", ".env.development"];
let anyEnvCommitted = false;
for (const f of envCandidates) {
  try {
    const result = execSync(`git ls-files "${f}"`, { cwd: ROOT, encoding: "utf-8" }).trim();
    if (result) {
      fail(`${f} is tracked by git — remove with: git rm --cached ${f}`);
      anyEnvCommitted = true;
    }
  } catch {
    // git not available or error — skip
  }
}
if (!anyEnvCommitted) pass("No env files committed to git");

// ─── 2. .env* is in .gitignore ────────────────────────────────────────────────
console.log("\n[2] Checking .gitignore covers env files...");
const gitignore = readFile(join(ROOT, ".gitignore")) ?? "";
if (/^\.env[*\s]/m.test(gitignore) || gitignore.includes(".env*")) {
  pass(".gitignore covers .env* files");
} else {
  fail(".gitignore does not cover .env files — add: .env*");
}

// ─── 3. NEXT_PUBLIC_ vars don't expose secrets ────────────────────────────────
console.log("\n[3] Checking NEXT_PUBLIC_ variables don't look like secrets...");
const secretPattern = /(?:SECRET|PRIVATE|PASSWORD|TOKEN|KEY|APIKEY|API_KEY)/i;
const envFiles = [".env", ".env.local", ".env.development", ".env.production"];
let publicSecretFound = false;
for (const envFile of envFiles) {
  const content = readFile(join(ROOT, envFile));
  if (!content) continue;
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const [varName] = trimmed.split("=");
    if (varName.startsWith("NEXT_PUBLIC_") && secretPattern.test(varName)) {
      fail(`${envFile}: ${varName} looks like a secret but is exposed to the browser`);
      publicSecretFound = true;
    }
  }
}
if (!publicSecretFound) pass("No suspicious NEXT_PUBLIC_ secret-like variables found");

// ─── 4. No localStorage token/auth patterns in source ─────────────────────────
console.log("\n[4] Checking for localStorage auth token patterns...");
const srcFiles = walkSrc(join(ROOT, "src"), [".ts", ".tsx", ".js", ".jsx"]);
const localStorageAuthPattern =
  /localStorage\.[gs]etItem\s*\(\s*['"][^'"]*(?:token|auth|session|user)[^'"]*['"]/i;
let lsAuthFound = false;
for (const file of srcFiles) {
  const content = readFile(file);
  if (!content) continue;
  if (localStorageAuthPattern.test(content)) {
    const rel = file.replace(ROOT, "").replace(/\\/g, "/");
    fail(`localStorage auth token pattern found in ${rel} — use HttpOnly cookies instead`);
    lsAuthFound = true;
  }
}
if (!lsAuthFound) pass("No localStorage auth token patterns found");

// ─── 5. API routes use rate limiting ─────────────────────────────────────────
console.log("\n[5] Checking API routes import rate limiting...");
const apiDir = join(ROOT, "src/app/api");
const apiRoutes = walkSrc(apiDir, ["route.ts", "route.js"]);
let unprotectedRoutes = 0;
for (const route of apiRoutes) {
  const content = readFile(route);
  if (!content) continue;
  if (!content.includes("rate-limit") && !content.includes("rateLimit")) {
    const rel = route.replace(ROOT, "").replace(/\\/g, "/");
    warn(`${rel} does not import rate limiting — consider adding checkRateLimit()`);
    unprotectedRoutes++;
  }
}
if (unprotectedRoutes === 0) pass("All API routes import rate limiting");

// ─── 6. API routes don't expose raw error details ─────────────────────────────
console.log("\n[6] Checking API routes don't leak error details to clients...");
const stackLeakPattern = /(?:err|error|e)\.(?:stack|message)\s*[,)]/;
let stackLeakFound = false;
for (const route of apiRoutes) {
  const content = readFile(route);
  if (!content) continue;
  const lines = content.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (stackLeakPattern.test(lines[i]) && /json|send|response/i.test(lines[i])) {
      const rel = route.replace(ROOT, "").replace(/\\/g, "/");
      fail(`${rel}:${i + 1} may leak error details to client — use generic error responses`);
      stackLeakFound = true;
    }
  }
}
if (!stackLeakFound) pass("No raw error detail leaks detected in API routes");

// ─── 7. Security headers configured ───────────────────────────────────────────
console.log("\n[7] Checking security headers are configured...");
const nextConfigCandidates = ["next.config.ts", "next.config.js", "next.config.mjs"];
let headersConfigured = false;
for (const cfg of nextConfigCandidates) {
  const content = readFile(join(ROOT, cfg));
  if (content && content.includes("securityHeaders")) {
    headersConfigured = true;
    break;
  }
}
if (headersConfigured) {
  pass("Security headers configured in next.config");
} else {
  fail("No security headers found in next.config — add CSP, HSTS, X-Frame-Options");
}

// ─── 8. Admin routes have auth guard or TODO marker ───────────────────────────
console.log("\n[8] Checking admin route auth protection...");
const adminLayout = readFile(join(ROOT, "src/app/(admin)/admin/layout.tsx"));
const middleware =
  readFile(join(ROOT, "src/middleware.ts")) ?? readFile(join(ROOT, "src/middleware.js"));

if (middleware && (middleware.includes("admin") || middleware.includes("auth"))) {
  pass("Middleware guards admin routes");
} else if (
  adminLayout &&
  (adminLayout.includes("auth") || adminLayout.includes("session") || adminLayout.includes("TODO"))
) {
  warn("Admin layout has auth TODO — implement authentication before production deployment");
} else {
  fail("Admin routes have no auth guard and no middleware — implement authentication");
}

// ─── Summary ──────────────────────────────────────────────────────────────────
console.log("\n─────────────────────────────────────────────");
if (issues > 0) {
  console.error(`\nSecurity check FAILED: ${issues} issue(s), ${warnings} warning(s)\n`);
  process.exit(1);
} else if (warnings > 0) {
  console.warn(`\nSecurity check passed with ${warnings} warning(s) — review before production\n`);
  process.exit(0);
} else {
  console.log(`\nSecurity check passed.\n`);
  process.exit(0);
}
