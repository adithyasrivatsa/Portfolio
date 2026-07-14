---
title: "Praescius Market Observer"
date: "2026-07-14"
description: "Advanced, locally-hosted market telemetry and algorithmic trading assistant built as a Chrome Extension."
tags: ["projects", "javascript", "chrome-extension", "ai", "fintech", "trading"]
---

# Praescius Market Observer

An advanced, locally-hosted market telemetry and algorithmic trading assistant built as a Chrome Extension.

## 🧠 Architecture Overview
**Event-driven data pipeline:**  
`Market DOM/WebSocket → Interception Layer → Local Database (IndexedDB) → Rule Engine → UI/Telegram Alerts`

### Design Principles
- **Privacy-first execution**: All tick aggregation and historical data are stored and processed entirely on your local machine.
- **Zero-drift calculations**: Custom mathematical implementations for MACD, EMA, and RSI that avoid rounding degradation during high-frequency live ticks.
- **Dual-Engine Telemetry**: Automatically falls back to stable DOM-scraping if WebSocket interception is blocked or unavailable.
- **Unbreakable UI**: Sleek, Neobrutalist design with a multi-symbol widget carousel and perfectly isolated state bounds.

## 💻 Technical Stack

**Frontend & UI:**
- Pure Vanilla JavaScript (ES6+)
- HTML5 & CSS3 (Custom Neobrutalist Design System)

**Backend & Storage:**
- Service Workers (Manifest V3)
- IndexedDB (`idb` for high-speed local data persistence)
- REST APIs (Google Gemini AI, Telegram Bot API)

## 🏗️ Repository Structure

```text
Praescius/
├── background/            # Service workers, event routing, rule engine
├── core/                  # Compilers, evaluators, local logging
├── indicators/            # Zero-drift mathematical calculations (MACD, RSI, etc.)
├── providers/             # Logic for specific broker connections and DOM scraping
├── storage/               # IndexedDB configuration and wrapper
├── strategies/            # 176+ JSON-based algorithmic trading strategies
├── ui/                    # Multi-symbol dashboard, Portfolio Hub, Neobrutalist CSS
└── manifest.json          # Chrome Extension Manifest V3 configuration
```

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Hundred-Trillion/Praescius.git

# Install in Chrome
# 1. Open chrome://extensions/
# 2. Enable Developer Mode (top right)
# 3. Click "Load unpacked" and select the cloned Praescius directory

# (Optional) Setup Alerts
# Open extension settings to configure Telegram Bot and Google Gemini API keys
```

[View on GitHub](https://github.com/Hundred-Trillion/Praescius)
