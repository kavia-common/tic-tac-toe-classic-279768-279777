/* Simple TS test runner that loads files under src/__tests__ and executes them using node+tsx.
   Uses Node's built-in test runner when available, else loads and runs. */
import { readdirSync } from "node:fs";
import { join } from "node:path";

function log(msg: string) {
  // eslint-disable-next-line no-console
  console.log(msg);
}

const testsDir = join(process.cwd(), "src", "__tests__");
let failed = 0;

function requireTest(file: string) {
  // Dynamic import to execute the test file which uses simple expect-like assertions
  return import(file);
}

async function main() {
  try {
    const entries = readdirSync(testsDir).filter((f) => f.endsWith(".test.ts"));
    if (entries.length === 0) {
      log("No tests found.");
      process.exit(0);
    }
    for (const f of entries) {
      const full = join(testsDir, f);
      try {
        await requireTest("file://" + full);
        log(`✓ ${f}`);
      } catch (e) {
        failed++;
        log(`✗ ${f}\n${(e as Error).message}`);
      }
    }
  } catch (e) {
    failed++;
    log(`Test runner error: ${(e as Error).message}`);
  } finally {
    process.exit(failed > 0 ? 1 : 0);
  }
}

main();
