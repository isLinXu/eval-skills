import { Command } from "commander";
import { registerFindCommand } from "./commands/find.js";
import { registerCreateCommand } from "./commands/create.js";
import { registerSelectCommand } from "./commands/select.js";
import { registerEvalCommand } from "./commands/eval.js";
import { registerRunCommand } from "./commands/run.js";
import { registerReportCommand } from "./commands/report.js";
import { registerInitCommand } from "./commands/init.js";
import { registerConfigCommand } from "./commands/config.js";
import { registerTaskCommand } from "./commands/task.js";
import { log } from "./utils/output.js";

// ── Environment Check ────────────────────────────────────────────────────────
const MIN_NODE_VERSION = 18;
const currentVersion = process.versions.node;
const majorVersion = parseInt(currentVersion.split(".")[0] || "0", 10);

if (majorVersion < MIN_NODE_VERSION) {
  console.error(`\x1b[31mError: eval-skills requires Node.js version >=${MIN_NODE_VERSION}.0.0\x1b[0m`);
  console.error(`You are running version ${currentVersion}`);
  process.exit(1);
}

// ── Global Error Handling ────────────────────────────────────────────────────
process.on("uncaughtException", (error) => {
  if (error instanceof Error) {
    log.error(`Uncaught Exception: ${error.message}`);
    if (log.level === "debug") {
      console.error(error.stack);
    }
  } else {
    log.error(`Uncaught Exception: ${String(error)}`);
  }
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  log.error(`Unhandled Rejection: ${String(reason)}`);
  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("\n"); // New line for cleaner exit
  log.warn("Process interrupted by user.");
  process.exit(0);
});

const program = new Command();

program
  .name("eval-skills")
  .description("AI Agent Skill 单元测试框架 — 框架无关的 Skill 发现、生成、筛选与评测工具")
  .version("0.1.0")
  .option("-c, --config <path>", "Config file path")
  .option("--json", "JSON output format (CI friendly)")
  .option("--no-color", "Disable colored output")
  .option("-v, --verbose", "Verbose logging")
  .hook("preAction", (thisCommand) => {
    const opts = thisCommand.opts();
    if (opts.verbose) {
      log.level = "debug";
      log.debug("Verbose logging enabled");
    }
    if (opts.json) {
      log.json = true;
    }
    // no-color is handled automatically by commander/chalk usually, but we can enforce if needed
  });

// 注册所有命令
registerFindCommand(program);
registerCreateCommand(program);
registerSelectCommand(program);
registerEvalCommand(program);
registerRunCommand(program);
registerReportCommand(program);
registerInitCommand(program);
registerConfigCommand(program);
registerTaskCommand(program);

program.parse(process.argv);
