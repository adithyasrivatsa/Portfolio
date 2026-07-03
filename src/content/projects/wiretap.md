---
title: "Wiretap"
date: "2026-07-03"
description: "A spec-driven protocol analysis framework that captures, reverse-engineers, and reproduces real-time browser network traffic natively."
tags: ["python", "networking", "reverse-engineering", "websocket"]
---

# 🔍 Wiretap
**Capture the wire. Learn the protocol. Speak it natively.**

A protocol analysis framework that watches a web app's real network traffic — HTTP, WebSocket, SSE — at the byte level, figures out how it works, and hands you a lightweight client that speaks the same language without a browser attached.

License: MIT | Python 3.12+ | Platform: Cross-platform (capture mode requires Chromium via Playwright)

> [!IMPORTANT]
> Wiretap operates on your own authenticated sessions and your own accounts. It captures traffic your browser already sends and receives — it does not attack, exploit, or gain unauthorized access to any system. Reproducing a private/undocumented API is a **Terms of Service** question for the target platform, not a security bypass. Read the ToS of anything you point this at before running it unattended.

## 🎯 What It Does

Most tools that automate a web app do it the expensive way — a headless browser rendering a full DOM, burning 300MB–1GB of RAM per tab, and getting fingerprinted by Cloudflare/Akamai the moment they behave like a bot. Wiretap does it the correct way: **capture the protocol once, then talk to it directly.**

### Before → After

**BEFORE (Browser Automation):**
> Playwright/Selenium tab running 24/7, rendering full JS, polling the DOM for price changes
> ~300–1000 MB RAM · high CPU · flagged by TLS/behavioral fingerprinting · crashes and leaks over long runs

**AFTER (Wiretap Native Mode):**
> One WebSocket connection, replaying the exact Engine.IO/Socket.IO handshake it recorded
> **< 35 MB RSS** · near-zero CPU · inherits your browser's authenticated session · stable for continuous long-duration streams

## 🚀 Quick Start

**1. Install**
```bash
git clone https://github.com/Hundred-Trillion/wiretap.git
cd wiretap
pip install -e .
playwright install chromium   # only needed for capture mode
```

**2. Capture a Session**
Open a real, visible browser and record everything it sends/receives while you use the target app normally:
```bash
wiretap capture https://example.com --name my-capture-session
```
Type short annotations into the terminal as you click around (`Loaded Dashboard`, `Placed Order`) — Wiretap correlates them with the network events happening at that moment.

**3. Let It Figure Out the Protocol**
```bash
wiretap analyze my-capture-session
wiretap report my-capture-session --output ./my-reports
```
This produces a Markdown protocol spec plus interactive HTML dashboards (timeline, connection graph, payload explorer) — no manual byte-counting required.

**4. Drop the Browser Entirely**
Once the protocol is understood, connect straight to the backend using your saved session — no Chromium, no DOM:
```bash
wiretap trace quotex --token <session-token> --asset BTCUSD_otc
```

## 🖥️ Setup Notes

### Capture Mode (all platforms)
Requires Playwright's bundled Chromium (`playwright install chromium`). This is the only mode that needs a real browser — it's used once to observe and learn a protocol, not to run continuously.

### Native Mode (all platforms)
Pure Python networking (`websockets`, `orjson`) — no browser dependency. This is the mode meant to run unattended on a VPS or low-resource box.

### Linux headless capture
If capturing on a headless server, run capture mode with a virtual display (`xvfb-run wiretap capture ...`) since Playwright needs a display target even in headed mode.

## ⚙️ Configuration

Protocols are described declaratively, not hardcoded — when a backend changes its field layout, you edit a spec file, not Python:

```json
{
  "protocol": "quotex",
  "transport": "engine.io-v3",
  "endpoint": "wss://ws2.qxbroker.com/socket.io/?EIO=3&transport=websocket",
  "auth_event": "authorization",
  "fields": {
    "session": "string",
    "isDemo": "int",
    "tournamentId": "int"
  }
}
```

### Options
| Option | Description |
| :--- | :--- |
| `capture <url>` | Start recording browser traffic via CDP |
| `analyze <session>` | Run the protocol discovery engine (auth flow, heartbeats, request/response pairing) |
| `report <session>` | Generate Markdown + interactive HTML artifacts |
| `trace <protocol>` | Stream live data natively, no browser |
| `simulate <session>` | Replay a captured session offline, with speed/step controls |
| `doctor <session>` | Flag protocol drift against the saved spec |
| `decode <data>` | Run all registered decoders against a raw hex/base64 blob |
| `compare <a> <b>` | Diff two capture sessions |

## 🧠 How It Works

### The Capture Path
Wiretap doesn't scrape the DOM or inject page scripts. It hooks the Chrome DevTools Protocol directly:

**Chromium (CDP) → Network.webSocketFrame* / requestWillBeSent / eventSourceMessageReceived**
**→ EventBus → SQLite (SQLAlchemy + aiosqlite, SHA256-deduplicated payloads)**

Every frame is stored with forensic fidelity — raw bytes, headers, cookies, handshake order, and sequence numbers — so nothing is lost between "what the wire actually said" and "what gets analyzed later."

### Decoder Pipeline
A pluggable decoder registry (entry-point based, same pattern as Python's own packaging system) tries each payload against UTF-8/16, JSON, XML, Gzip, Zlib, Brotli, MessagePack, and CBOR, plus heuristic detectors for Protocol Buffers and FlatBuffers. New formats register without touching core code.

### Credential Inheritance, Not Credential Bypass
Native mode doesn't defeat Cloudflare/Akamai challenges — it avoids triggering them in the first place, by reusing the cookie jar and session token your own browser already earned by logging in normally. One headed capture run does the CAPTCHA-solving; every subsequent native connection rides on that already-authenticated state until it expires.

### Protocol Drift Detection
Backends change field layouts without warning. `wiretap doctor` validates incoming packets against the saved JSON spec in real time and flags the first packet that doesn't match, instead of failing silently three fields downstream.

## 📁 Project Structure
```text
wiretap/
├── capture/          # Playwright + CDP traffic recording
├── core/             # Domain models, adapters, protocol client, event bus
├── analysis/         # Discovery, clustering, structural analysis, correlation
├── decoders/         # Pluggable payload decoders (UTF-8, JSON, Gzip, etc.)
├── drift/            # Runtime drift detection against layout specs
├── protocols/        # Protocol implementations (Quotex, extensible)
├── replay/           # Offline replay simulator
├── reports/          # Markdown report generator
├── visualization/    # HTML timeline and connection graph generators
├── validators/       # Price field validation engine
├── plugins/          # Plugin registry (entry-point based)
└── specs/            # Declarative JSON protocol specifications
```

## 🔌 Extending It
New protocol? New site? Implement the `Decoder` or `Plugin` protocol and register it via entry points — no core changes required:

```python
class DiscordPlugin:
    @property
    def info(self) -> PluginInfo:
        return PluginInfo(
            name="discord",
            target_domains=["discord.com", "gateway.discord.gg"],
        )

    def can_handle(self, connections: list[Connection]) -> bool:
        return any(d in c.url for c in connections for d in self.info.target_domains)
```

## 📝 License
MIT — do whatever you want with it.

> *Built for developers tired of paying 1GB of RAM to poll a number that changes twice a second.*
> *Learn the protocol once. Stop dragging a browser everywhere after.*

[View on GitHub](https://github.com/Hundred-Trillion/wiretap)
