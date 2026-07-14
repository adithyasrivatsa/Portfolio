# Praescius (V2)
### by Nanduri Labs

Praescius is an extensible, high-performance, and **strictly observational** Chrome Extension (Manifest V3) designed to observe, parse, and analyze real-time market data directly from financial web charting applications. 

V2 introduces the **Portfolio Hub & AI Coach**, bringing deep quantitative diagnostics, discipline enforcement, and real-time market mentorship in a sleek Neobrutalist interface.

> [!IMPORTANT]
> **Observation-Only Rule**: This extension is read-only. It does **not** make trades, place orders, click buy/sell execution elements, bypass platform checks, or interact with financial transaction services. It includes a completely simulated Paper Trading Wallet for educational purposes.

---

## 🚀 What's New in V2?

The extension has been entirely overhauled with a **Neobrutalist UI** and a massive suite of analytical tools built into the new **Portfolio Hub**:

*   **🤖 AI Trade Assistant:** Analyzes the live macro-trend, volume, and RSI structure of any asset, providing a real-time Confidence Score before you execute a setup.
*   **📚 The Strategy Library:** A pre-loaded JSON bundle of 176 distinct trading strategies (including Mean Reversion, Trend Following, and Order Block plays) ready to execute against the engine.
*   **📱 Instant Telegram Alerts:** Bind your Telegram Chat ID and API Token to route all rule evaluations and AI-summarized signals directly to your mobile device.
*   **📊 Multi-Symbol Live Carousel:** A perfectly synced, Neobrutalist swipeable UI that displays compact, live OHLC grids, volume, and EMA 9/21 trends for multiple active data streams simultaneously.
*   **📋 One-Click Trade Checklist:** A hard UI gate enforcing discipline. You cannot click the "Unlock Trade Execution" button until you manually confirm support zones, trend alignment, and risk management.
*   **⚠️ Emotion Detector:** Actively monitors your paper trading journal in real-time. If you take more than 5 rapid-fire trades within 20 minutes, it flashes red, recalculates your degraded win rate, and explicitly tells you to stop revenge trading.
*   **📰 ForexFactory News Filter:** A background worker that hits the official `faireconomy.media` JSON API every hour. If it detects a High-Impact news event (like CPI or NFP) dropping within the next 4 hours, it triggers an aggressive UI warning to avoid trading that currency.
*   **🌐 Multi-Chart Scanner:** Cycles through your active Watchlist entirely in the background, identifying RSI divergences and overbought/oversold exhaustion zones across multiple assets simultaneously.
*   **📝 AI Auto-Journal & Personal Stats:** Calculates distinct Win Rates for your Longs and Shorts based on your history, and auto-generates reflection summaries after every closed paper trade.
*   **🌍 Session Assistant:** Tracks UTC time against global Forex overlaps (London, New York, Tokyo) to advise on optimal momentum windows.
*   **⏪ Replay Your Mistakes:** Routes your historical losses directly into the offline Simulator, visually highlighting your impulsive entries versus optimal confirmations.
*   **🎓 Live Trading Coach:** Reads the live tick stream to intercept poor decisions (e.g. "Low volume detected," "Price is overextended from the EMA").

---

## Core Architecture

* **State Machine (`core/stateMachine.js`)**: Tracks execution states as a single source of truth (`OFFLINE`, `CONNECTING`, `LIVE_WS`, `LIVE_DOM`, `REPLAY`, `ERROR`).
* **Versioned Event Bus (`core/eventBus.js`)**: Decouples components by routing actions over structured channels:
  * `market.tick.v1` — Decoded web-socket ticks
  * `market.candle.v1` — Standardized OHLCV candles
  * `market.rule.trigger.v1` — Dispatched when technical conditions evaluate to true
  * `market.ai.summary.v1` — AI-generated notification summaries
* **Dynamic WebSocket Interception**: Captures socket traffic via an injected main-world script (`inject.js`) and forwards it to the content script using HTML5 `postMessage`.
* **Historical Validation & Adaptive Confidence**: Compares real-time WebSocket ticks against DOM fallbacks, adjusting the confidence weighting dynamically.
* **Web3 Wallet Bridge**: Demonstrates isolated world communication. When the UI runs as a sidebar iframe over a live page, it can securely bridge a `CONNECT_WALLET` command through the content script to invoke MetaMask (`window.ethereum`) on the host site.

---

## Rules DSL (Offline Compiler)
You can write structured rule conditions beginning with `WHEN` to compile rules instantly offline:
```text
WHEN
  RSI < 30
  AND
  EMA9 crosses above 100
THEN
  Notify
```
* **Supported Indicators**: 47+ indicators including `Price`, `RSI`, `SMA`, `EMA`, `MACD`, `BollingerBands`, `Ichimoku`, `ATR`, `VWAP`, etc.
* **Supported Operators**: `>`, `<`, `>=`, `<=`, `==`, `crosses above`, `crosses below`
* **Supported Patterns**: `Three Bullish Candles`, `Three Bearish Candles`, `Bullish Engulfing`, `Bearish Engulfing`, `Doji`, `Hammer`

---

## Installation & Setup

1. Clone or download this project directory to your local system.
2. Open Google Chrome and go to `chrome://extensions/`.
3. Toggle the **Developer mode** switch (top-right).
4. Click **Load unpacked** (top-left) and select this project directory.
5. The extension is now loaded and available in the extensions toolbar.

---

## Obtaining a Free Gemini API Key

Praescius uses the Gemini API to translate natural language rules into structured JSON. You can set up your own API key for free:

1. Navigate to [Google AI Studio](https://aistudio.google.com/).
2. Sign in with a standard Google account.
3. Click the blue **"Get API Key"** button in the left sidebar menu.
4. Click **"Create API Key"** (you can bind it to a new or existing Google Cloud project).
5. Copy your generated API key.
6. Open the extension popup, click the **Gear Icon** (Settings) in the top-right, choose **Google Gemini API**, paste your key, and click **Save Configuration**.

---

## Running Replay Simulations (Offline Testing)

To verify the rules engine and notifications without opening live charts:
1. Open the extension popup and switch to the **Developer Panel** tab.
2. Click **Load Simulation Dataset**. The replay tracker will load candles from `logs/candles.jsonl`.
3. Switch back to the **Dashboard** tab and type a test prompt or write DSL.
4. Click **Compile & Save Rule**.
5. Return to the **Developer Panel** tab and click **Play**.
6. The simulator will stream candles into the event pipeline. When the condition matches, a browser notification alert will trigger.
