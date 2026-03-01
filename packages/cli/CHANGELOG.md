# @eval-skills/cli

## 0.2.0

### Minor Changes

- Initial public release of eval-skills — AI Agent Skill L1 evaluation framework.
  - Framework-agnostic skill discovery, scaffolding, evaluation, and reporting
  - Multi-dimensional CompositeScore (completion rate, latency, error rate, consistency)
  - 3-layer sandboxed execution (ProcessSandbox + DockerSandbox)
  - HTTP, Subprocess, and MCP adapters
  - Built-in benchmarks (coding-easy, skill-quality, web-search-basic)
  - Regression detection via DiffReport
  - CLI with find, create, select, eval, run, report commands
  - JSON, Markdown, HTML, CSV report formats

### Patch Changes

- Updated dependencies []:
  - @eval-skills/core@0.2.0
