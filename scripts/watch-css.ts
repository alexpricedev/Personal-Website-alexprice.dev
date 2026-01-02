import { watch } from "fs";
import { spawn, type Subprocess } from "bun";

const CSS_INPUT = "./src/client/style.css";
const CSS_OUTPUT = "./dist/assets/main.css";
const WATCH_DIRS = ["./src/server", "./src/client"];

let buildProcess: Subprocess | null = null;
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

async function buildCSS() {
  if (buildProcess) {
    buildProcess.kill();
  }

  buildProcess = spawn(
    ["bunx", "@tailwindcss/cli", "-i", CSS_INPUT, "-o", CSS_OUTPUT],
    { stdout: "inherit", stderr: "inherit" }
  );

  await buildProcess.exited;
  buildProcess = null;
}

function debouncedBuild() {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  debounceTimer = setTimeout(() => {
    buildCSS();
  }, 100);
}

// Initial build
await buildCSS();

// Watch directories
for (const dir of WATCH_DIRS) {
  watch(dir, { recursive: true }, (event, filename) => {
    if (filename?.endsWith(".tsx") || filename?.endsWith(".css")) {
      debouncedBuild();
    }
  });
}

// Keep process alive
process.on("SIGINT", () => process.exit(0));
await new Promise(() => {});
