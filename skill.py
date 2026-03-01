#!/usr/bin/env python3
"""
Eval-Skills Wrapper Script
==========================

This script serves as a bridge to the full TypeScript CLI implementation.
It ensures that the powerful eval-skills CLI is invoked, rather than a limited static check script.

Prerequisites:
- Node.js >= 18
- pnpm >= 8
- Build artifacts (pnpm build)

"""
import os
import sys
import subprocess
from pathlib import Path

def main():
    # Locate the CLI entry point
    root_dir = Path(__file__).parent.absolute()
    cli_entry = root_dir / "packages" / "cli" / "dist" / "index.js"

    # Check if CLI is built
    if not cli_entry.exists():
        print(f"Error: eval-skills CLI not found at {cli_entry}", file=sys.stderr)
        print("Please run 'pnpm install && pnpm build' first.", file=sys.stderr)
        sys.exit(1)

    # Check for Node.js
    try:
        subprocess.run(["node", "--version"], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("Error: Node.js is required to run eval-skills but was not found.", file=sys.stderr)
        sys.exit(1)

    # Forward arguments to the CLI
    cmd = ["node", str(cli_entry)] + sys.argv[1:]
    
    try:
        # Replace current process with the CLI process
        if sys.platform == "win32":
            subprocess.run(cmd)
        else:
            os.execvp("node", cmd)
    except Exception as e:
        print(f"Error executing CLI: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
