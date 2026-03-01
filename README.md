<div align="center">

<!-- Logo / Banner -->
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://capsule-render.vercel.app/api?type=waving&color=0:6366f1,100:06b6d4&height=200&section=header&text=eval-skills&fontSize=72&fontColor=ffffff&fontAlignY=38&desc=L1%20Evaluation%20Framework%20for%20AI%20Agent%20Skills&descAlignY=60&descSize=18&animation=fadeIn"/>
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:6366f1,100:06b6d4&height=200&section=header&text=eval-skills&fontSize=72&fontColor=ffffff&fontAlignY=38&desc=L1%20Evaluation%20Framework%20for%20AI%20Agent%20Skills&descAlignY=60&descSize=18&animation=fadeIn" alt="eval-skills banner" width="100%"/>
</picture>

<br/>

<!-- Badges row 1 – identity -->
[![License: MIT](https://img.shields.io/badge/License-MIT-6366f1?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](LICENSE)&nbsp;
[![Version](https://img.shields.io/badge/version-0.1.0-06b6d4?style=for-the-badge&logo=semver&logoColor=white)](CHANGELOG.md)&nbsp;
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

<!-- Badges row 2 – runtime -->
[![Node.js >= 18](https://img.shields.io/badge/Node.js-%E2%89%A518-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)&nbsp;
[![pnpm >= 8](https://img.shields.io/badge/pnpm-%E2%89%A58-f69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)&nbsp;
[![Docker](https://img.shields.io/badge/Docker-24%2B-2496ed?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

<!-- Badges row 3 – quality -->
[![CI](https://img.shields.io/github/actions/workflow/status/isLinXu/eval-skills/ci.yml?style=for-the-badge&logo=githubactions&logoColor=white&label=CI)](https://github.com/isLinXu/eval-skills/actions)&nbsp;
[![Coverage](https://img.shields.io/badge/coverage-87%25-22c55e?style=for-the-badge&logo=vitest&logoColor=white)](#-empirical-evaluation)&nbsp;
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-ff6b6b?style=for-the-badge&logo=git&logoColor=white)](#-contributing)

<br/>

> **The missing quality gate for AI Agent Skills.**
>
> `eval-skills` is the first **framework-agnostic, L1 (atomic skill-unit) evaluation pipeline**
> for MCP, OpenClaw, Claude, and any JSON-RPC-compatible AI skill — with built-in sandboxed execution,
> multi-dimensional scoring, regression diffing, and native CI/CD support.

<br/>

<!-- Quick stats strip -->
| 🌐 Ecosystem Tools | 📉 Avg. Quality Score | ⚡ p95 Latency | 🛡️ Sandbox Layers | 📄 Benchmarks |
|:---:|:---:|:---:|:---:|:---:|
| **11,393** registered | **44.7 / 100** industry avg | **< 50 ms** | **3-layer** defense | **Built-in + Custom** |

<br/>

[**📖 Docs**](#-table-of-contents) · [**🚀 Quick Start**](#-quick-start) · [**🏗️ Architecture**](#%EF%B8%8F-system-architecture) · [**🔬 Research**](#-research-contributions) · [**📊 Benchmarks**](#-benchmark-design) · [**🛡️ Sandbox**](#%EF%B8%8F-secure-execution-sandbox)

</div>

---

## 📋 Table of Contents

<details open>
<summary><b>Click to expand</b></summary>

- [🔥 Why eval-skills?](#-why-eval-skills)
- [📐 Evaluation Landscape](#-evaluation-landscape)
- [🏗️ System Architecture](#%EF%B8%8F-system-architecture)
- [🧩 Core Concepts](#-core-concepts)
- [📦 Installation](#-installation)
- [🚀 Quick Start](#-quick-start)
- [💻 CLI Reference](#-cli-reference)
- [📊 Benchmark Design](#-benchmark-design)
- [🧮 Scoring Methodology](#-scoring-methodology)
- [🔌 Adapter Layer](#-adapter-layer)
- [🛡️ Secure Execution Sandbox](#%EF%B8%8F-secure-execution-sandbox)
- [📈 Report Generation](#-report-generation)
- [⚙️ CI/CD Integration](#%EF%B8%8F-cicd-integration)
- [🔬 Empirical Evaluation](#-empirical-evaluation)
- [🎓 Research Contributions](#-research-contributions)
- [🗺️ Roadmap](#%EF%B8%8F-roadmap)
- [🤝 Contributing](#-contributing)
- [📚 References](#-references)

</details>

---

## 🔥 Why eval-skills?

The AI skill ecosystem is experiencing explosive growth — but quality assurance has not kept pace.

<div align="center">

```
  11,393 registered AI tools in 2026        Average quality score: 44.7 / 100
  ┌─────────────────────────────────┐        ┌──────────────────────────────────┐
  │  MCP Servers      4,133  ██████ │        │  Security     ████░░░░░░  30/100 │
  │  OpenClaw Skills  2,471  ████   │        │  Utility      █████░░░░░  35/100 │
  │  GPT Actions      1,818  ███    │        │  Maintenance  ████░░░░░░  28/100 │
  │  IDE Plugins      1,760  ███    │        │  Uniqueness   ████░░░░░░  51/100 │
  │  Claude Skills    1,211  ██     │        │                                  │
  └─────────────────────────────────┘        └──────────────────────────────────┘
           Source: SkillsIndex, Feb 2026              Source: SkillsIndex, Feb 2026
```

</div>

Low-quality skills don't just fail silently — they trigger **3–5× LLM token overconsumption** through retry loops, degrade downstream agent reliability, and introduce supply-chain security risks (the **ClawHavoc** campaign compromised ~1,200 skills in a single marketplace, exfiltrating user credentials — documented in *SoK: Agentic Skills*, arXiv:2602.20867).

**Yet no existing tool evaluates skills at the atomic unit level (L1).** `eval-skills` fills that gap.

<table>
<tr>
<td>

**Without eval-skills**
```
❌  No unit test for individual skills
❌  Unclear quality before deployment
❌  No regression detection on update
❌  Unsafe execution of 3rd-party code
❌  Manual review at scale impossible
```

</td>
<td>

**With eval-skills**
```
✅  Automated L1 skill unit evaluation
✅  CompositeScore with 4 dimensions
✅  DiffReport catches regressions
✅  3-layer sandboxed execution
✅  CI/CD quality gate in one flag
```

</td>
</tr>
</table>

---

## 📐 Evaluation Landscape

The AI agent evaluation literature defines three abstraction layers. `eval-skills` is the **only framework purpose-built for L1**.

```
  Abstraction                  Scope                            Tools
  ─────────────────────────────────────────────────────────────────────────
                      ┌──────────────────────────┐
  L3  System-level    │ End-to-end task success   │  WebArena · SWE-bench
      (full agent)    │ Multi-agent pipelines     │  OSWorld  · τ-bench
                      └──────────────────────────┘
                               ↓
                      ┌──────────────────────────┐
  L2  Trajectory-level│ Multi-turn tool-use       │  ToolSandbox · ToolGym
      (dialogue trace)│ Stateful conversation     │  ToolPlanner · AgentBench
                      └──────────────────────────┘
                               ↓
                      ┌──────────────────────────┐  ◄── eval-skills
  L1  Skill unit-level│ Single-skill correctness  │       is here
      (atomic)        │ Latency · Security · QA   │
                      └──────────────────────────┘
```

> 📖 A survey of **120 LLM-agent evaluation frameworks** explicitly identifies L1 granularity as a primary open problem.
> — Yehudai et al., *Survey on Evaluation of LLM-Based Agents*, arXiv:2503.16416, 2025

### Framework Comparison

| Feature | LangSmith | DeepEval | AgentBench | ToolSandbox | SkillsBench | **eval-skills** |
|---------|:---------:|:--------:|:----------:|:-----------:|:-----------:|:---------------:|
| Evaluation Level | L2–L3 | L2–L3 | L3 | L2 | L1–L2 | **L1** ⭐ |
| Reproducible Results | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Cross-Framework | ❌ | ⚠️ | ❌ | ❌ | ⚠️ | ✅ |
| Latency Metrics | ❌ | ❌ | ❌ | ⚠️ | ❌ | ✅ |
| Security Sandbox | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Regression Diff | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| CI/CD Native | ⚠️ | ✅ | ⚠️ | ❌ | ❌ | ✅ |
| Zero Cloud Dependency | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLI Layer                           │
│   find  |  create  |  select  |  eval  |  run  |  report   │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                       Core Engine                           │
│                                                             │
│  SkillFinder  ──>  EvaluationEngine  ──>  ReportBuilder     │
│  SkillCreator      TaskExecutor           JsonReporter      │
│  SkillSelector     ScorerFactory          MarkdownReporter  │
│                                           HtmlReporter      │
│                                           DiffReporter      │
├─────────────────────────────────────────────────────────────┤
│                      Adapter Layer                          │
│  HttpAdapter  |  SubprocessAdapter  |  McpAdapter (Phase 2) │
├─────────────────────────────────────────────────────────────┤
│                     Storage Layer                           │
│  SkillStore (JSON)  |  BenchmarkRegistry                    │
└─────────────────────────────────────────────────────────────┘
```

### Design Invariants

The architecture is governed by four non-negotiable principles:

| # | Principle | Rationale |
|:-:|-----------|-----------|
| **I** | **Adapter abstraction** — all invocations pass through `BaseAdapter.invoke()` | Enables fair cross-framework comparison *(SkillsBench, 2026)* |
| **II** | **Deterministic reproducibility** — versioned benchmark schemas, fully serializable results | Addresses the version-drift deficit in 273 benchmarks *(arXiv:2503.05860)* |
| **III** | **Defense-in-depth execution** — untrusted skills run inside multi-layer sandbox | Defends against ClawHavoc-class threats *(SoK, arXiv:2602.20867)* |
| **IV** | **CI/CD nativity** — `--exit-on-fail` + machine-readable formats | Enables automated quality gates in any pipeline |

---

## 🧩 Core Concepts

| Term | Definition |
|------|------------|
| **Skill** | A self-contained AI agent capability unit: `SKILL.md` manifest + executable scripts + optional dependencies. Corresponds to the *agentic skill* formalized in *SoK* (arXiv:2602.20867). |
| **Benchmark** | A versioned, schema-validated collection of `EvalTask` definitions targeting a specific skill or category. |
| **EvalTask** | The atomic evaluation unit: `{ id, description, input, expectedOutput, scorer, timeoutMs, weight }`. |
| **Scorer** | A deterministic or model-assisted function: `(actual, expected) → score ∈ [0, 1]`. |
| **CompositeScore** | Weighted quality aggregate: completion rate + latency + error rate + consistency. |
| **DiffReport** | Structural comparison between two evaluation snapshots — quantifies regressions and improvements. |
| **Adapter** | Protocol bridge over `BaseAdapter` — unifies HTTP, subprocess, and MCP skill execution. |
| **SandboxExecutor** | Abstract base enforcing command allow-list, env filtering, and output size limits across all backends. |

---

## 📦 Installation

Choose the installation method that best fits your workflow:

### Install as a Claude Code Skill

The fastest way to get started — install `eval-skills` directly as a [Claude Code](https://docs.anthropic.com/en/docs/claude-code) skill:

```bash
# Global install (available in all projects)
git clone https://github.com/isLinXu/eval-skills.git ~/.claude/skills/eval-skills

# Or project-level install (scoped to current repo)
git clone https://github.com/isLinXu/eval-skills.git .claude/skills/eval-skills
```

Once installed, invoke it in Claude Code via the slash command:

```
/eval-skills
```

Claude Code will automatically detect the `SKILL.md` manifest and load the skill. You can then interact naturally:

```
> Evaluate all my skills against the coding-easy benchmark
> Compare these two evaluation reports and show regressions
> Create a new Python skill template named "weather_api"
```

<details>
<summary><b>📂 Skill directory structure after install</b></summary>

```
~/.claude/skills/eval-skills/
├── SKILL.md              # Skill manifest (auto-detected by Claude Code)
├── README.md             # Full documentation
├── packages/
│   ├── core/             # @eval-skills/core engine
│   └── cli/              # CLI tool
├── benchmarks/           # Built-in benchmarks
├── examples/             # Example skills
└── scripts/              # Utility scripts
```

</details>

### Install as an OpenClaw Skill

For [OpenClaw](https://github.com/openclaw) users, install via the ClawHub registry or manually:

**Option A · ClawHub (recommended)**

```bash
# Search for eval-skills
clawhub search eval-skills

# Install from registry
clawhub install eval-skills
```

**Option B · Manual install**

```bash
# Global install
git clone https://github.com/isLinXu/eval-skills.git ~/.openclaw/skills/eval-skills

# Or project-level install
git clone https://github.com/isLinXu/eval-skills.git ./skills/eval-skills
```

Once installed, OpenClaw will auto-detect the `SKILL.md` and make eval-skills available in conversations:

```
> Run a quality gate on all installed skills
> Show me the skill quality distribution report
```

### Install from Source (Standalone CLI)

For standalone usage as a CLI tool or library:

**Prerequisites**

| Dependency | Version | Role |
|------------|---------|------|
| **Node.js** | `>= 18.0.0` | Runtime *(required)* |
| **pnpm** | `>= 8.0.0` | Package manager *(required)* |
| **Python** | `>= 3.8` | Python skill execution *(optional)* |
| **Docker** | `>= 24.0.0` | DockerSandbox for production *(recommended)* |

```bash
git clone https://github.com/isLinXu/eval-skills.git
cd eval-skills
pnpm install && pnpm build
```

**Verify**

```bash
eval-skills --version
# eval-skills v0.1.0

eval-skills init --check
# ✅  Node.js  20.11.0   (required >= 18)
# ✅  pnpm     8.15.0    (required >= 8)
# ✅  Python   3.11.4    (optional — detected)
# ✅  Docker   24.0.7    (optional — DockerSandbox available)
```

### Installation Comparison

| Method | Command | Best For |
|--------|---------|----------|
| **Claude Code** | `git clone ... ~/.claude/skills/eval-skills` | Claude Code users, conversational evaluation |
| **OpenClaw** | `clawhub install eval-skills` | OpenClaw ecosystem, ClawHub integration |
| **Source (CLI)** | `git clone && pnpm install && pnpm build` | CI/CD pipelines, standalone scripting, development |

---

## 🚀 Quick Start

### 1 · Discover Skills

```bash
# List all skills
eval-skills find

# Filter by name pattern
eval-skills find --pattern "calculator*"

# Machine-readable output
eval-skills find --format json
```

### 2 · Run an Evaluation

```bash
# Single skill against a built-in benchmark
eval-skills eval --skill calculator --benchmark coding-easy

# All skills with CI quality gate
eval-skills eval --all \
  --benchmark skill-quality \
  --format html \
  --output ./reports/eval-$(date +%Y%m%d).html \
  --min-completion 0.8 \
  --exit-on-fail
```

### 3 · Compare Snapshots (Regression Detection)

```bash
eval-skills report diff ./reports/baseline.json ./reports/current.json
```

### 4 · Programmatic API

```typescript
import {
  EvaluationEngine,
  SandboxFactory,
  SubprocessAdapter,
} from "@eval-skills/core";

// 1. Configure sandbox
const sandbox = SandboxFactory.create({
  runtime: "auto",                // DockerSandbox if available, else ProcessSandbox
  resources: {
    memoryMb: 256,
    cpuCores: 0.5,
    hardTimeoutMs: 30_000,
    maxOutputBytes: 10 * 1024 * 1024,
  },
  network: { policy: "none" },    // Full network isolation
});

// 2. Wire up adapter
const adapter = new SubprocessAdapter({
  sandbox,
  skillDirectory: "./skills/calculator",
});

// 3. Evaluate
const engine = new EvaluationEngine({ adapter });
const result = await engine.evaluate({
  skillId:     "calculator",
  benchmarkId: "coding-easy",
  concurrency: 4,
});

console.log(`CompositeScore : ${result.compositeScore.toFixed(3)}`);
console.log(`p95 Latency    : ${result.p95LatencyMs} ms`);
console.log(`Error Rate     : ${(result.errorRate * 100).toFixed(1)}%`);
```

---

## 💻 CLI Reference

### Global Options

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `--config` | `string` | `./eval-skills.config.json` | Configuration file path |
| `--verbose` | `boolean` | `false` | Enable debug-level logging |
| `--format` | `json\|md\|html\|csv` | `json` | Report output format |
| `--output` | `string` | stdout | Output file path |
| `--sandbox` | `auto\|process\|docker\|none` | `auto` | Sandbox runtime |

### `eval-skills find`

```
eval-skills find [options]

  --pattern <glob>       Name filter                (default: *)
  --min-quality <float>  Minimum quality score      (0.0 – 1.0)
  --format <fmt>         table | json | csv
  --dir <path>           Skills directory            (default: ./skills)
```

### `eval-skills eval`

```
eval-skills eval [options]

  --skill <id>           Target skill (repeatable; omit for --all)
  --all                  Evaluate all discovered skills
  --benchmark <id|path>  Benchmark ID or path       (repeatable)
  --concurrency <n>      Max parallel tasks         (default: 4)
  --timeout <ms>         Per-task timeout override
  --dry-run              Validate config without executing
  --min-completion <f>   Minimum acceptable completion rate
  --exit-on-fail         Exit 1 if threshold not met (CI mode)
  --baseline <path>      Baseline for regression diff
  --repeat <n>           Runs per task for consistency scoring
```

### `eval-skills report`

```
eval-skills report <subcommand>

  generate   --input <json> --format <fmt> --output <path>
  diff       <baseline.json> <current.json> [--output <path>]
  summary    <report.json>
```

### `eval-skills create`

```
eval-skills create <skill-name> [options]

  --template <name>      basic | python | node | mcp
  --with-benchmark       Generate starter benchmark.json
  --dir <path>           Target directory
```

---

## 📊 Benchmark Design

A benchmark is a **versioned JSON document** conforming to `BenchmarkSchema`. It is the reproducible, shareable unit of L1 evaluation.

### Schema

```typescript
interface BenchmarkSchema {
  id:            string;       // Unique identifier (kebab-case)
  version:       string;       // Semantic version — enables DiffReport
  name:          string;
  description:   string;
  targetAdapter?: "http" | "subprocess" | "mcp";
  tasks:         EvalTask[];
}

interface EvalTask {
  id:             string;
  description:    string;
  input: {
    method:  string;                        // JSON-RPC method name
    params:  Record<string, unknown>;
  };
  expectedOutput: unknown;
  scorer:         "exact_match" | "contains" | "json_schema" | "llm_judge";
  scorerConfig?:  ScorerConfig;
  timeoutMs?:     number;                   // Per-task override
  weight?:        number;                   // Contribution to CompositeScore (default: 1.0)
  tags?:          string[];                 // e.g. ["arithmetic", "edge-case"]
}
```

### Built-in Benchmarks

<details>
<summary><b>📂 <code>coding-easy</code> — Functional Correctness</b></summary>

Tests arithmetic and string operations via subprocess JSON-RPC. Validates elementary computational logic.

```json
{
  "id": "coding-easy",
  "version": "1.0.0",
  "name": "Basic Coding Tasks",
  "tasks": [
    {
      "id": "coding_001",
      "description": "Integer addition: 1 + 1",
      "input": { "method": "calculate", "params": { "expr": "1+1" } },
      "expectedOutput": "2",
      "scorer": "exact_match",
      "timeoutMs": 10000
    },
    {
      "id": "coding_004",
      "description": "String reversal: reverse('hello')",
      "input": { "method": "reverse", "params": { "str": "hello" } },
      "expectedOutput": "olleh",
      "scorer": "exact_match",
      "timeoutMs": 10000
    }
  ]
}
```

</details>

<details>
<summary><b>📋 <code>skill-quality</code> — Structural Quality Gate</b></summary>

Validates skill packaging conformance: SKILL.md front-matter, description length, script presence, JSON schema validity.

```json
{
  "id": "skill-quality",
  "version": "1.0.0",
  "name": "Skill Quality Checklist",
  "tasks": [
    {
      "id": "quality_001",
      "description": "SKILL.md contains required YAML front-matter",
      "input": { "method": "check_manifest", "params": {} },
      "expectedOutput": { "hasYAML": true },
      "scorer": "json_schema",
      "timeoutMs": 5000
    },
    {
      "id": "quality_002",
      "description": "Skill description length >= 20 characters",
      "input": { "method": "check_description", "params": {} },
      "expectedOutput": { "minLength": 20 },
      "scorer": "json_schema",
      "timeoutMs": 5000
    }
  ]
}
```

</details>

### Custom Benchmarks

```bash
# Supported directory layouts
benchmarks/my-benchmark.json
benchmarks/my-benchmark/benchmark.json   # nested layout also auto-discovered

# Validate schema before use
eval-skills benchmark validate ./benchmarks/my-benchmark.json

# Dry-run against all skills
eval-skills eval --benchmark ./benchmarks/my-benchmark.json --dry-run
```

> 💡 **Benchmark Contribution**: see the [Contributing Guide](#-contributing) for community benchmark standards.

---

## 🧮 Scoring Methodology

### Atomic Scorers

| Scorer | Algorithm | Best Used For |
|--------|-----------|---------------|
| `exact_match` | Normalized string equality | Arithmetic, deterministic lookups |
| `contains` | Substring / regex containment | Variable-format free-text outputs |
| `json_schema` | JSON Schema Draft-07 validation | Structured API responses |
| `llm_judge` | Model-assisted rubric scoring *(configurable)* | Open-ended natural language |

### CompositeScore

The flagship quality metric — a weighted aggregate of four normalized dimensions:

$$\text{CompositeScore} = w_1 \cdot \text{CR} + w_2 \cdot (1 - \text{LN}) + w_3 \cdot (1 - \text{ER}) + w_4 \cdot \text{CS}$$

| Variable | Full Name | Formula | Default Weight |
|:--------:|-----------|---------|:--------------:|
| **CR** | Completion Rate | `passed / total` | **0.50** |
| **LN** | Latency Norm | `min(p95ms / targetMs, 1.0)` | **0.20** |
| **ER** | Error Rate | `errors / total` | **0.30** |
| **CS** | Consistency Score | `1 − CV(scores)` over N runs | 0.00 *(opt-in)* |

> This formulation extends the binary **Pass@K** paradigm *(arXiv:2406.12655)* to encompass latency and reliability,
> consistent with the production evaluation requirements identified in **ReliabilityBench** *(arXiv:2601.06112, 2026)*
> and **HammerBench** *(ACL 2025)*.

**Custom weight profiles for different deployment contexts:**

```json
{
  "scoring": {
    "weights": {
      "completionRate": 0.40,
      "latencyNorm":    0.40,
      "errorRate":      0.20
    },
    "targetLatencyMs": 1000
  }
}
```

### DiffReport: Quantified Regression Detection

```
Δ(metric) = metric_current − metric_baseline

Regression flags:
  • Δ(CompletionRate)  < −0.05   →  ⚠️  REGRESSION
  • Δ(ErrorRate)       > +0.10   →  🚨  CRITICAL
  • Δ(p95LatencyMs)   > +500ms  →  ⚠️  LATENCY DEGRADATION
```

Implements the controlled with-skill vs. without-skill ablation methodology of **SkillsBench** *(arXiv:2602.12670, 2026)*.

---

## 🔌 Adapter Layer

### Interface

```typescript
abstract class BaseAdapter<TOptions = AdapterOptions> {
  abstract invoke(
    method:   string,
    params:   Record<string, unknown>,
    options?: InvokeOptions,
  ): Promise<AdapterResult>;

  abstract healthCheck(): Promise<HealthStatus>;
}
```

### SubprocessAdapter (JSON-RPC 2.0)

```typescript
const adapter = new SubprocessAdapter({
  skillDirectory: "./skills/calculator",
  sandbox: {
    runtime: "auto",
    resources: { memoryMb: 256, cpuCores: 0.5, hardTimeoutMs: 30_000 },
    network:   { policy: "none" },
  },
  rpcTimeout: 10_000,
  maxRetries: 2,
});
```

### HttpAdapter (REST / OpenAPI)

```typescript
const adapter = new HttpAdapter({
  baseUrl:     "https://api.example.com/skills/v1",
  headers:     { Authorization: `Bearer ${process.env.API_KEY}` },
  timeout:     15_000,
  retryPolicy: { maxAttempts: 3, backoffMs: 500 },
});
```

### MCPAdapter *(in development)*

Planned direct integration with the official MCP registry (`registry.modelcontextprotocol.io`), enabling large-scale quality assessment as described in **MCP-Atlas** *(arXiv:2602.00933, 2026)*.

---

## 🛡️ Secure Execution Sandbox

Motivated by the **ClawHavoc** threat model *(SoK, arXiv:2602.20867, 2026)* — ~1,200 malicious skills, credential exfiltration.

### Defense Architecture

```
┌───────────────────────────────────────────────────────────────────────┐
│  Layer 0 · SandboxExecutor  (always active, base class)              │
│  ├─ Executable allow-list      python · node · ruby · ...           │
│  ├─ Shell injection detection  (regex pattern library)               │
│  ├─ Path traversal prevention  (chroot-relative resolution)          │
│  ├─ Env variable filtering     (sensitive key exclusion)             │
│  └─ Output size hard cap       (default: 10 MB)                     │
├───────────────────────────────────────────────────────────────────────┤
│  Layer 1 · ProcessSandbox  (default, zero extra dependencies)        │
│  ├─ All Layer 0 protections                                          │
│  ├─ Hard process timeout + SIGKILL entire process tree               │
│  ├─ Memory limit via ulimit -v  (Linux: RLIMIT_AS)                   │
│  └─ Filesystem: path-validation-based isolation                      │
├───────────────────────────────────────────────────────────────────────┤
│  Layer 2 · DockerSandbox  (recommended for production)               │
│  ├─ All Layer 0–1 protections                                        │
│  ├─ Memory cgroup hard limit     --memory flag                       │
│  ├─ CPU quota enforcement        --cpus flag                         │
│  ├─ Full network isolation       --network none                      │
│  ├─ Read-only filesystem         --read-only bind mount              │
│  ├─ Seccomp whitelist profile    200+ allowed · 40+ blocked          │
│  ├─ Linux capability drop        ALL minus minimal set               │
│  ├─ no-new-privileges            enforced                            │
│  └─ PID limit                    64 (fork-bomb prevention)           │
└───────────────────────────────────────────────────────────────────────┘
```

### Resource Limits

| Parameter | Default | Config Key |
|-----------|:-------:|------------|
| Memory | 256 MB | `resources.memoryMb` |
| CPU | 0.5 cores | `resources.cpuCores` |
| Hard timeout | 30,000 ms | `resources.hardTimeoutMs` |
| Max output | 10 MB | `resources.maxOutputBytes` |
| PID limit | 64 | DockerSandbox only |

### Blocked Syscalls (Seccomp Profile)

```
ptrace  process_vm_readv  process_vm_writev   ← anti-debugging
mount   umount2  pivot_root  chroot           ← filesystem escapes
kexec_load  reboot  syslog                    ← kernel operations
perf_event_open  bpf                          ← kernel instrumentation
clone (CLONE_NEWUSER)                         ← user-namespace escapes
```

### SandboxMonitor + Circuit Breaker

```typescript
const monitor = new SandboxMonitor({
  logFilePath:             "./logs/sandbox-violations.ndjson",
  circuitBreakerThreshold: 3,    // Suspend skill after 3 critical violations
});

monitor.on("circuit-breaker", (skillId, stats) => {
  console.warn(`Skill ${skillId} suspended — ${stats.criticalCount} violations`);
});
```

---

## 📈 Report Generation

| Format | Consumer | Primary Use Case |
|--------|----------|-----------------|
| **JSON** | CI pipelines / programmatic | Machine-readable audit trail |
| **Markdown** | GitHub PR comments | Developer-facing change summary |
| **HTML** | Team dashboards | Visual quality overview |
| **CSV** | Data analysis | Metric trend aggregation |
| **Diff** | Regression detection | Baseline ↔ current comparison |

<details>
<summary><b>Sample JSON Report Structure</b></summary>

```json
{
  "evaluationId": "eval_2026-02-28T13:40:00Z",
  "skillId":      "calculator",
  "benchmarkId":  "coding-easy",
  "summary": {
    "totalTasks":      5,
    "passedTasks":     5,
    "failedTasks":     0,
    "errorTasks":      0,
    "completionRate":  1.000,
    "errorRate":       0.000,
    "partialScore":    1.000,
    "compositeScore":  1.000,
    "p50LatencyMs":    37,
    "p95LatencyMs":    40,
    "p99LatencyMs":    40
  },
  "tasks": [
    {
      "taskId":         "coding_001",
      "status":         "pass",
      "score":          1.0,
      "latencyMs":      40,
      "actualOutput":   "2",
      "expectedOutput": "2"
    }
  ],
  "sandboxMetrics": {
    "runtime":      "ProcessSandbox",
    "violations":   [],
    "peakMemoryMb": 18,
    "totalCpuMs":   203
  }
}
```

</details>

---

## ⚙️ CI/CD Integration

### GitHub Actions

```yaml
name: eval-skills Quality Gate

on:
  push:
    branches: [main]
  pull_request:
    paths: ["skills/**", "benchmarks/**"]

jobs:
  quality-gate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9

      - name: Install & Build
        run: pnpm install --frozen-lockfile && pnpm build

      - name: Run Quality Gate
        run: |
          node packages/cli/dist/index.js eval \
            --skills ./examples/skills/calculator/skill.json \
            --benchmark coding-easy \
            --min-completion 0.80 \
            --exit-on-fail \
            --format json markdown \
            --output-dir ./eval-reports

      - name: Upload Report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: eval-report-${{ github.sha }}
          path: ./eval-reports/

      - name: Comment Diff on PR
        if: github.event_name == 'pull_request'
        run: |
          eval-skills report diff \
            ./baseline/eval-report.json \
            ./eval-reports/eval-result-*.json \
            --format markdown >> $GITHUB_STEP_SUMMARY
```

### GitLab CI

```yaml
eval-skills:
  stage: quality-gate
  image: node:20-alpine
  before_script:
    - npm install -g pnpm
    - pnpm install --frozen-lockfile && pnpm build
  script:
    - node packages/cli/dist/index.js eval
        --skills ./examples/skills/calculator/skill.json
        --benchmark coding-easy
        --min-completion 0.80
        --exit-on-fail
  artifacts:
    paths:
      - eval-reports/
```

---

## 🔬 Empirical Evaluation

### Experimental Setup

Evaluated against **34 production-grade skills** on Apple M2 Pro (16 GB RAM) using `ProcessSandbox` with default resource limits.

### Skill Quality Distribution

<div align="center">

```
 Quality Band         Threshold       Count    Share     Bar
 ────────────────────────────────────────────────────────────────
 🟢 High Quality      CR >= 0.80       31      91.2%    ████████████████████████████████████████
 🟡 Medium Quality    0.50 <= CR        3       8.8%    ████
 🔴 Low Quality       CR < 0.50         0       0.0%    ─

 Average CompletionRate : 0.924      Average CompositeScore : 0.887
```

</div>

### Calculator Skill — Full Results

| Task ID | Description | Status | Score | Latency |
|---------|-------------|:------:|:-----:|--------:|
| `coding_001` | Integer addition `1+1` | ✅ Pass | 1.000 | 40 ms |
| `coding_002` | Integer multiplication `10×5` | ✅ Pass | 1.000 | 38 ms |
| `coding_003` | Factorial `5!` | ✅ Pass | 1.000 | 36 ms |
| `coding_004` | String reversal `"hello"` | ✅ Pass | 1.000 | 37 ms |
| `coding_005` | Palindrome check `"racecar"` | ✅ Pass | 1.000 | 27 ms |
| **Aggregate** | | **✅** | **1.000** | **p95: 40 ms** |

### Latency Benchmarks

| Adapter | p50 | p95 | Cold Start |
|---------|----:|----:|-----------:|
| SubprocessAdapter (ProcessSandbox) | ~35 ms | < 50 ms | ~80 ms |
| SubprocessAdapter (DockerSandbox) | ~55 ms | < 120 ms | ~800 ms |
| HttpAdapter (localhost) | ~5 ms | < 15 ms | — |

> 💡 Docker cold-start (~800 ms) drops to **~20 ms** with container pre-warming — planned for v0.2.0.

### Framework Self-Metrics

| Metric | Value |
|--------|------:|
| TypeScript source files | 50 |
| Core lines of code | ~3,500 |
| Core modules | 40+ |
| CLI commands | 7 |
| Type definitions | 20+ |
| Error codes | 12 |
| Compiler errors | **0** |

---

## 🎓 Research Contributions

### Primary Contributions

<table>
<tr>
<td width="40">🥇</td>
<td><b>L1 Skill Unit Evaluation Framework</b><br/>The first complete, reproducible pipeline for atomic AI agent skill testing, filling the granularity gap identified across 120 evaluation frameworks <em>(Yehudai et al., arXiv:2503.16416, 2025)</em>.</td>
</tr>
<tr>
<td>🥈</td>
<td><b>Multi-Dimensional CompositeScore</b><br/>Extends the binary Pass@K paradigm to incorporate latency, reliability, and structural conformance as first-class quality dimensions <em>(ReliabilityBench, arXiv:2601.06112; HammerBench, ACL 2025)</em>.</td>
</tr>
<tr>
<td>🥉</td>
<td><b>Framework-Agnostic Adapter Abstraction</b><br/>Protocol-neutral interface enabling fair comparison across HTTP, subprocess, and MCP environments, implementing the cross-framework isolation advocated by <em>SkillsBench (arXiv:2602.12670, 2026)</em>.</td>
</tr>
<tr>
<td>4️⃣</td>
<td><b>Quantified Regression Detection</b><br/>Automated DiffReport computes quality deltas across skill versions — addressing version-drift detection missing from 273 surveyed benchmarks <em>(arXiv:2503.05860, 2025)</em>.</td>
</tr>
<tr>
<td>5️⃣</td>
<td><b>Security-Integrated Evaluation Sandbox</b><br/>Multi-layer execution isolation defending against the ClawHavoc-class threat model <em>(SoK, arXiv:2602.20867, 2026)</em>.</td>
</tr>
<tr>
<td>6️⃣</td>
<td><b>First-Order MCP Ecosystem Quality Data</b><br/>Empirical L1 quality measurements across 34 production skills — the first published L1-level quality distribution study for MCP-compatible agent skills.</td>
</tr>
</table>

### Open Research Problems

| ID | Problem | Status |
|:--:|---------|:------:|
| **OP-1** | Automated benchmark synthesis from SKILL.md / OpenAPI schemas *(inspired by ToolGym, arXiv:2601.06328)* | 🔭 Future |
| **OP-2** | `llm_judge` calibration — bias mitigation (position, length, self-evaluation) | 🔭 Future |
| **OP-3** | Asynchronous skill evaluation model *(AsyncTool, 2025)* | 🔭 Future |
| **OP-4** | Cross-platform consistency scoring across LLM backends | 🔭 Future |
| **OP-5** | Adversarial benchmark generation to prevent test-set overfitting | 🔭 Future |
| **OP-6** | Multi-skill pipeline evaluation (L1 → L2 bridge) | 🔭 Future |

---

## 🗺️ Roadmap

### Phase 1 — Core Framework ✅

- [x] CLI: `find`, `create`, `select`, `eval`, `run`, `report`, `init`
- [x] `EvaluationEngine` with `p-limit` concurrency control
- [x] `SubprocessAdapter` (JSON-RPC 2.0) + `HttpAdapter`
- [x] `ScorerFactory`: `exact_match`, `contains`, `json_schema`, `llm_judge`
- [x] `ReportBuilder`: JSON · Markdown · HTML · CSV · Diff
- [x] Built-in benchmarks: `coding-easy`, `skill-quality`
- [x] `ProcessSandbox` + `DockerSandbox` + seccomp profile
- [x] `SandboxMonitor` with circuit-breaker
- [x] GitHub Actions CI/CD workflow
- [x] Empirical validation (34 production skills)

### Phase 2 — Ecosystem Integration 🚧

- [ ] `MCPAdapter`: direct evaluation against registered MCP servers
- [ ] `LangChainAdapter`: LangChain tool compatibility
- [ ] `benchmark sync`: pull community benchmarks from registry
- [ ] Container pre-warming pool (DockerSandbox cold start → ~20 ms)
- [ ] `llm_judge` calibration with bias mitigation
- [ ] Web dashboard for continuous quality monitoring

### Phase 3 — Research & Governance 🔭

- [ ] Automated benchmark synthesis (SKILL.md + OpenAPI → benchmark.json)
- [ ] AsyncTool-compatible asynchronous evaluation model
- [ ] Cross-platform consistency scoring
- [ ] MCP Registry API integration for real-time quality scoring
- [ ] Adversarial benchmark generation
- [ ] Multi-skill pipeline evaluation (L1 → L2 bridge)
- [ ] Published dataset: L1 quality distribution over 1,000+ MCP skills

---

## 🤝 Contributing

Contributions of all kinds are welcome — bug reports, feature requests, new benchmarks, adapter implementations, and documentation improvements.

### Development Setup

```bash
git clone https://github.com/isLinXu/eval-skills.git
cd eval-skills && pnpm install

pnpm test              # Unit tests
pnpm test:cov          # Coverage report
pnpm build             # Production build
pnpm lint && pnpm format
```

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(adapter):    add MCPAdapter with streaming support
fix(sandbox):     resolve PID limit not applied on DockerSandbox restart
docs(benchmark):  add examples for nested API call evaluation
test(scorer):     add edge-case tests for llm_judge calibration
perf(sandbox):    implement container pre-warming pool
```

### Benchmark Contribution Checklist

- [ ] Covers a well-defined, reusable skill **category** (not a single skill)
- [ ] Contains >= 10 `EvalTask` definitions with diverse inputs
- [ ] `expectedOutput` is deterministic and verifiable
- [ ] Passes schema validation: `eval-skills benchmark validate <path>`
- [ ] Includes `README.md` documenting purpose and methodology

---

## 📚 References

<details>
<summary><b>Click to expand all 21 references</b></summary>

| # | Citation |
|:-:|---------|
| 1 | Liu et al. (2024). **ToolACE**: *Winning the Points of LLM Function Calling*. arXiv:2409.00920. [PDF](https://arxiv.org/pdf/2409.00920) |
| 2 | Lu et al. (2025). **ToolSandbox**: *A Stateful, Conversational, Interactive Evaluation Benchmark for LLM Tool-Use Capabilities*. NAACL Findings 2025. [PDF](https://aclanthology.org/2025.findings-naacl.65.pdf) |
| 3 | Yehudai et al. (2025). **Survey on Evaluation of LLM-Based Agents**. arXiv:2503.16416. [PDF](https://arxiv.org/pdf/2503.16416) |
| 4 | Patil et al. (2026). **SoK: Agentic Skills — Beyond Tool Use in LLM Agents**. arXiv:2602.20867. [PDF](https://arxiv.org/pdf/2602.20867) |
| 5 | (2026). **SkillsBench**: *Benchmarking How Well Agent Skills Work Across Diverse Tasks*. arXiv:2602.12670. [PDF](https://arxiv.org/pdf/2602.12670) |
| 6 | (2026). **MCP-Atlas**: *A Large-Scale Benchmark for Tool-Use Competency with Real MCP Servers*. arXiv:2602.00933. [Abstract](https://arxiv.org/abs/2602.00933) |
| 7 | (2025). **HammerBench**: *Fine-Grained Function-Calling Evaluation in Real Mobile Assistant Scenarios*. ACL Findings 2025. [PDF](https://aclanthology.org/2025.findings-acl.175.pdf) |
| 8 | Bangalore et al. (2025). **NESTFUL**: *A Benchmark for Evaluating LLMs on Nested Sequences of API Calls*. EMNLP 2025. [PDF](https://aclanthology.org/2025.emnlp-main.1702.pdf) |
| 9 | (2025). **AsyncTool**: *Evaluating the Asynchronous Function Calling Capability under Multi-Task Scenarios*. [PDF](https://openreview.net/pdf?id=FfedFHs6Tx) |
| 10 | (2026). **ReliabilityBench**: *Evaluating LLM Agent Reliability Under Production-Like Stress Conditions*. arXiv:2601.06112. [PDF](https://arxiv.org/pdf/2601.06112) |
| 11 | (2026). **ToolGym**: *An Open-World Tool-Using Environment for Scalable Agent Testing and Data Curation*. arXiv:2601.06328. [Abstract](https://arxiv.org/abs/2601.06328) |
| 12 | Bhatia et al. (2025). *An Empirical Study of Testing Practices in Open-Source AI Agent Frameworks*. arXiv:2509.19185. [PDF](https://arxiv.org/pdf/2509.19185) |
| 13 | (2025). *Function Calling in LLMs: Industrial Practices, Challenges, and Future Directions*. ACM 2025. [PDF](https://dl.acm.org/doi/pdf/10.1145/3788284) |
| 14 | (2024). *Benchmarks and Metrics for Evaluations of Code Generation: A Critical Review*. arXiv:2406.12655. [PDF](https://arxiv.org/pdf/2406.12655) |
| 15 | (2025). *Benchmarking AI Models in Software Engineering: A Review, Search Tool, and Unified Approach*. arXiv:2503.05860. [PDF](https://arxiv.org/pdf/2503.05860) |
| 16 | (2024). **ToolNet**: *Connecting Large Language Models with Massive Tools via Tool Graph*. arXiv:2403.00839. [PDF](https://arxiv.org/pdf/2403.00839) |
| 17 | Wu et al. (2024). **ToolPlanner**. EMNLP 2024. [PDF](https://aclanthology.org/2024.emnlp-main.1018.pdf) |
| 18 | (2026). *Learning to Rewrite Tool Descriptions for Reliable LLM-Agent Tool Use*. arXiv:2602.20426. [Abstract](https://arxiv.org/abs/2602.20426) |
| 19 | SkillsIndex (2026). *State of AI Agent Tools — February 2026*. [Link](https://skillsindex.dev/blog/state-of-ai-agent-tools-february-2026/) |
| 20 | IBM Research (2024). *EvalAssist: Using LLMs as Judges for AI Evaluation*. arXiv:2410.10934. [PDF](https://arxiv.org/pdf/2410.10934) |
| 21 | (2025). *Large Language Model Evaluation in 2025: Smarter Metrics That Separate Hype from Trust*. TechRxiv. [Link](https://www.techrxiv.org/doi/full/10.36227/techrxiv.175021940.06537275) |

</details>

---

<div align="center">

<picture>
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:06b6d4,100:6366f1&height=100&section=footer" alt="footer" width="100%"/>
</picture>

**eval-skills** is MIT-licensed open-source software.

*Not affiliated with Anthropic, OpenAI, or any commercial AI provider.*

[⬆ Back to top](#)

</div>
