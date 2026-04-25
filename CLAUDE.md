# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Discord bot built with [discord.js v14](https://discord.js.org/) and Node.js. Currently a bare skeleton — client is initialized with intents and logs in, but no commands or event handlers are implemented yet.

## Commands

```bash
npm install          # Install dependencies
node src/index.js   # Run the bot
```

No build step, test suite, or linter is configured.

## Architecture

**Entry point:** `src/index.js` — creates a `discord.js` `Client` with four gateway intents (`Guilds`, `GuildMembers`, `GuildMessages`, `MessageContent`) and calls `client.login()` using `process.env.DISCORD_TOKEN`.

**Environment:** Requires a `.env` file at the project root with `DISCORD_TOKEN` set. The `dotenv` package is used in code but is not listed in `package.json` — add it with `npm install dotenv` if needed.

**Module system:** CommonJS (`require()`), not ESM.

**discord.js v14 conventions to follow when extending:**
- Register slash commands via `REST` + `Routes.applicationCommands()` before running the bot.
- Handle commands in a `client.on('interactionCreate', ...)` listener.
- Gate privileged intents (`GuildMembers`, `MessageContent`) in the Discord Developer Portal — they must be explicitly enabled there as well.

---

## Behavioral Guidelines

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

### 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.
