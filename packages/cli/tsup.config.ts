import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  shims: true, // Add shims for __dirname, require, etc.
  banner: {
    js: "#!/usr/bin/env node",
  },
  // Bundle core and CLI dependencies
  noExternal: [
    "@eval-skills/core",
    "commander",
    "chalk",
    "ora",
    "js-yaml",
  ],
  // Native modules and heavy dependencies should be external
  external: [
    "better-sqlite3",
    "dockerode",
    "ssh2",
    "cpu-features",
    "pino",
    "pino-pretty",
  ],
});
