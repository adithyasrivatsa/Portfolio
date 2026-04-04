---
title: "Claude Code Leaked: Anthropic's AI Agent Architecture is Now Public"
date: "2026-04-03"
description: "How a missing .npmignore line handed $19B of proprietary agent architecture to the global developer community."
tags: ["AI", "Anthropic", "architecture", "agents"]
---

Let me tell you about the most expensive missing line of code in the history of software.

Not a buffer overflow. Not a SQL injection. Not a zero-day in some ancient C library. One missing rule in a `.npmignore` file. That's it. That's the whole story of how Anthropic — a company valued at $19 billion, generating $2.5 billion in annualised revenue, staffed by some of the most credentialed AI researchers on the planet — accidentally handed the entire architecture of their flagship product to the global developer community on a Tuesday morning.

The internet, predictably, did not give them time to process their feelings about this.

## What Actually Happened — Because Most People Got This Wrong

March 31st, 2026. Anthropic's engineering team pushes version 2.1.88 of Claude Code to the public npm registry. Routine release. Nobody thinks twice.

Somewhere in the build pipeline — running on the Bun JavaScript runtime that Anthropic acquired in late 2025 — the system generates a source map file called `cli.js.map`. Source maps are debugging tools. They map minified, compressed production code back to the original human-readable source. They are, in every meaningful sense, the opposite of what you want shipping to production. They are the engineering equivalent of publishing your novel and accidentally including the notebook where you wrote every draft, every deleted chapter, and every note to yourself about what you were actually trying to say.

The file was 59.8 MB. It contained the fully reconstructed, de-obfuscated TypeScript source code — inline. It also pointed directly to a ZIP archive sitting on Anthropic's own Cloudflare R2 bucket containing the complete codebase. 1,906 files. 512,000 lines. Years of proprietary research and engineering.

To make it worse: there's an open bug in the Bun runtime (`oven-sh/bun#28001`) that forces source maps to be served in production mode regardless of configuration. So even if someone had thought to check, the toolchain was actively working against them.

Security researcher Chaofan Shou found it within hours. Posted on X. And then — as the physicists say — things escalated.

## The Containment Strategy That Absolutely Did Not Work

Anthropic's response was swift, aggressive, and about as effective as trying to un-ring a bell with a strongly worded letter.

First they tried to scrub the package from npm. Ran into npm's own policies — packages with more than 231 dependent projects (this had exactly that) can't just be unpublished unilaterally. Reports say they eventually had to call in a personal favour with registry administrators to force the removal. Not a great sentence to have in your incident report.

Then came the DMCA campaign. 8,100 GitHub repositories, simultaneously targeted. GitHub processed the takedown against the entire network. Repositories disappeared. Developers got notices.

And then the Streisand Effect did what the Streisand Effect always does.

Every developer on the internet who hadn't heard about the leak now heard about the leak — because 8,100 simultaneous takedowns is not subtle. The community responded by doing what communities do when you tell them not to look at something: they looked, they downloaded, they mirrored, and then — this is the part Anthropic really didn't want — they started translating the TypeScript into Python and Bash using LLMs, creating syntactically distinct but functionally identical codebases that copyright law couldn't easily touch.

By April 1st, Anthropic quietly filed a partial retraction of their own DMCA notice. Scaled it back to 96 specific URLs. Let everything else go.

The code was out. It was staying out. Time to talk about what was in it.

## The Architecture — This is the Part That Actually Matters

Here's what nobody tells you about frontier AI companies: the model is not the moat. The model is the engine. The moat is everything wrapped around it — the orchestration, the memory management, the tool routing, the state machines that turn a powerful neural network into a reliable, autonomous agent. That's the hard part. That's what takes years to build. And that's exactly what leaked.

### The Core Loop

The heart of Claude Code lives in `query.ts`. Inside it is an asynchronous generator function called `queryLoop` — 1,729 lines long — structured as a persistent `while(true)` loop with seven distinct "continue sites."

In plain English: Claude Code is not sending one prompt and waiting for a response. It's running a continuous state machine. It yields control at specific decision points, evaluates what its subsystems have returned, and dynamically decides what to do next. Planners break down tasks. Executors run shell commands. Tool handlers manage API calls. Output managers synthesise everything. The whole thing is a distributed, asynchronous orchestra with a very complex conductor.

This is the architecture that makes Claude Code feel like it's thinking rather than just responding. And it's now documented in 1,729 lines of production TypeScript that anyone can read.

### Microcompaction — The Memory Trick

One of the hardest problems in building long-running AI agents is context window degradation. Your agent runs for a while, accumulates tool outputs, shell logs, conversation history — and suddenly it's slow, incoherent, and burning through your API budget like it's trying to set a record.

Anthropic's solution was something they called Microcompaction. When the system detects the agent has been idle for more than an hour — meaning the cache is cold — it automatically kicks off a background process that scrubs old, irrelevant tool results from session history. Localised garbage collection for AI context. It's what allows Claude Code to maintain coherence over sessions spanning up to a million tokens without collapsing.

This wasn't in any paper. It wasn't in any talk at any conference. It was quietly sitting in a private repository doing its job. Now it's public knowledge.

### KAIROS — The Part That Should Genuinely Excite You

The biggest revelation in the entire codebase was an unreleased architecture codenamed KAIROS. Referenced 190+ times across 61 files. Gated behind internal feature flags with names like `tengu_onyx_plover`. Never announced. Never hinted at publicly.

KAIROS is a persistent background daemon. An always-on digital worker. It runs while your laptop is closed. It wakes every five minutes via cron. It monitors GitHub webhooks, reviews pull requests, responds to Slack messages, and executes tasks — all without you touching it.

Its most interesting sub-component is `autoDream`. During extended idle periods, KAIROS forks a separate subagent that goes through four phases: Orient, Gather, Consolidate, Prune. It reviews the day's logs. Merges related observations. Eliminates logical contradictions. Converts vague insights into clean, indexable facts. It is, in the most literal sense, an AI that organises its own memory while you sleep.

Your brain on a Sunday night: randomly replaying that embarrassing thing you said in 2017.

`autoDream` at the same time: systematically pruning logical contradictions and preparing optimised context for morning execution.

We are not the same.

KAIROS represents the shift from AI as a tool you pick up to AI as a colleague that's always working. That shift is coming whether the feature was supposed to be announced or not. The leak just moved the timeline up.

### The Multi-Agent Coordinator

The leak also exposed Coordinator Mode — an unreleased feature where Claude acts as a top-level manager, breaks complex tasks into discrete pieces, and delegates them to parallel worker agents running in isolated scratchpads. A swarm architecture, production-ready, waiting behind a feature flag.

And Ultraplan — a mode that spins up a dedicated 30-minute Opus session on Anthropic's remote infrastructure specifically to think through hard architectural problems before execution. You review the plan. Then it runs.

These aren't concept demos. They're compiled binaries that were one config change away from shipping.

## What the Community Did With It in 24 Hours

This is where it gets genuinely inspiring, depending on your relationship with intellectual property law.

**claw-code** — Developer Sigrid Jin stayed up all night, used an AI orchestration workflow to rewrite Claude Code's entire architecture in Python, and published a clean-room reimplementation with zero copied code. It hit 100,000 GitHub stars in a single day. The official Anthropic Claude Code repo had 97,600 stars at the time. One person. One all-nighter. Fastest growing repository in GitHub history. Getting ratio'd by your own leak is a new category of corporate misfortune that didn't exist before this week.

**ccunpacked.dev** — A complete visual architecture guide mapping every tool, every loop, every decision point in Claude Code's agent lifecycle. Built within hours of the leak. Became the reference document for anyone wanting to understand how production AI agents actually work.

**pi.dev** — The creator of ccunpacked used the architectural insights to build their own competing terminal coding agent with four distinct operating modes and a philosophy of aggressive extensibility. A direct competitor, built in days using Anthropic's own leaked playbook. Minimal core. No built-in MCP support. Modular by design. The anti-Claude Code.

These people didn't wait. They read the code, understood the patterns, and shipped. And they did it faster than Anthropic's legal team could file takedowns.

## What You Can Actually Build — Right Now

Okay. Here's the part you came for.

The architecture is public. The patterns are documented. The community has already proven they work. Here's how to translate what leaked into things you can actually build:

**1. Build Your Agent as a State Machine, Not a Chatbot**

The `queryLoop` pattern is the single most important thing the leak revealed. Stop thinking about your AI features as prompt → response. Start thinking in loops.

Your agent should be a persistent state machine with explicit decision points — moments where it evaluates what it has, consults its subsystems, and decides the next action. Build it with a central coordinator loop, specialised sub-components (planner, executor, synthesiser), and defined exit conditions.

This is the difference between an AI feature and an AI agent. The code showing exactly how Anthropic implemented it is now public. Read `query.ts`. It is the most valuable free resource in AI engineering right now.

**2. Add a Compaction Layer to Every Long-Running Agent You Build**

If you're building anything with sessions that run longer than a few minutes, implement Microcompaction. The logic is straightforward:

Track a `lastActiveTimestamp`. On cold-cache resumption (idle > 1 hour), run a summarisation pass on old tool results before reinjecting context. Keep recent exchanges verbatim. Compress or discard older ones. Maintain a running summary that grows slowly rather than a raw history that grows fast.

This one pattern can cut your API costs materially and dramatically improve coherence on complex tasks. It's not in any tutorial. It was in a private repo. Now it's yours.

**3. Build One KAIROS-Inspired Daemon This Week**

Don't try to build the whole thing. Start with the smallest useful version of an always-on agent.

Some ideas that are buildable today:
*   A nightly codebase summariser — runs at midnight, reads your recent commits, writes a living document of what changed and why. Wake up with context.
*   A PR reviewer daemon — subscribes to your GitHub webhooks, runs whenever a PR is opened, posts an automated first-pass review to Slack before any human looks at it.
*   A standup brief generator — wakes at 8am, checks your open issues and recent commits, writes your standup update so you can actually think about the work instead of summarising it.

The pattern is always the same: persistent process + cron or webhook trigger + append-only memory log + subagent for synthesis. KAIROS showed you exactly how Anthropic wired it together. The only thing missing is your use case.

**4. Implement Coordinator-Worker Patterns**

Take one complex task you currently run sequentially through a single agent. Break it into subtasks. Spin up worker agents in parallel with isolated contexts. Have a coordinator synthesise the results.

You can do this today with the Anthropic API and basic async Python. The architecture is no longer theoretical — it's documented in production code. The leap in capability on complex, multi-step tasks is significant. Parallel agents with isolated scratchpads don't step on each other's context. They specialise. They go faster. They produce better outputs.

This is how Anthropic was building internally. Now you can too.

**5. Fork claw-code and Actually Read It**

`claw-code` is open source, MIT licensed, and a clean Python implementation of the core Claude Code agent harness. It's the fastest on-ramp to understanding how a production agent actually works in practice.

Don't just clone it. Read it. Understand the tool routing. Understand the session management. Understand how it handles the execution loop. Then build on top of it, extend it, or use it as the reference implementation for your own agent harness.

One developer built it in a night. Imagine what you can do with a week.

## The Bigger Picture

For years the assumption was that the competitive moat of frontier AI companies was the model — the weights, the training data, the compute. The Claude Code leak proved something more nuanced.

The model is necessary but not sufficient. The real value is the orchestration layer. The stateful loops, the memory management, the tool routing, the multi-agent coordination — the engineering that turns a powerful model into a reliable autonomous agent. That's what Anthropic spent years and hundreds of millions building. That's what leaked.

And here's the uncomfortable truth for the incumbents: a single developer rebuilt the core architecture overnight. Another built a competing product in days. The patterns are not magic. They're engineering. Good engineering, painstakingly developed — but engineering that can be understood, replicated, and improved upon now that it's public.

The black box just opened. The developers who study what's inside it and move fast will spend the next six months building things that would otherwise have taken two years to figure out.

The gold rush started on March 31st. The map is public. What are you building?

---
*Sources: VentureBeat · Zscaler ThreatLabz · Cybernews · Sabrina Ramonov · Alex000kim · ccunpacked.dev · WaveSpeed AI · The New Stack · SOCRadar · r/ClaudeAI · Mintlify (claw-code docs) · PCMag · SecurityWeek*
