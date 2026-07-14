---
title: "Privacy Policy - Praescius Market Observer"
date: "2026-07-14"
description: "Privacy Policy and Data Usage terms for the Praescius Market Observer Chrome Extension."
tags: ["privacy", "policy", "praescius", "legal"]
---

# Privacy Policy for Praescius Market Observer

Praescius Market Observer ("Praescius", "we", "us", or "our") is a localized Chrome Extension designed to provide market telemetry and algorithmic analysis. This Privacy Policy outlines our data processing practices. 

Our core philosophy is **Local-First Execution**. We do not operate central servers to collect your personal data, nor do we sell your data to third parties.

## 1. Data We Collect and Process

To function as a market observer, Praescius requires specific permissions to process data:

*   **Website Content (Host Permissions):** The extension reads public market data (prices, volumes, and chart text) directly from the financial charting platforms you actively visit. This data is strictly used to calculate mathematical indicators (e.g., MACD, RSI) and evaluate your local trading rules. 
*   **Local Application State:** Your custom trading rules, watchlists, paper trading history, and application settings are saved.

## 2. How Data is Stored

**All data is stored locally on your device.** 
*   Market data (candlesticks, ticks) and your paper trading journal are cached locally inside your browser using **IndexedDB**.
*   Your application settings and API keys are stored securely using **Chrome Local Storage**.
*   We **do not** transmit your market telemetry, rules, or paper trading data to any remote developer databases or analytics servers.

## 3. Third-Party Integrations

Praescius allows you to optionally integrate with third-party services to enhance functionality. If you choose to use these features, your data interacts with those services directly from your browser:

*   **Google Gemini AI:** If you provide an API key, the extension will send local rule evaluation summaries directly to Google's API to generate natural language explanations.
*   **Telegram Bot API:** If you provide a Telegram Bot Token and Chat ID, the extension will send alert messages directly to the Telegram API to notify your device.
*   *Note:* Your API keys for these services are stored locally on your machine and are never transmitted to us.

## 4. Personally Identifiable Information (PII)

We do not collect, store, or process any Personally Identifiable Information (such as your name, email address, physical address, or IP address). Furthermore, the extension's simulated "Paper Trading Wallet" is entirely fictional and does not interact with real financial systems, wallets, or blockchains.

## 5. Changes to This Policy

We may update our Privacy Policy from time to time to reflect changes in our extension or compliance requirements. Any updates will be reflected in this document with a new "Last Updated" date.

## 6. Contact Us

If you have any questions or concerns regarding this Privacy Policy or the practices of this extension, please reach out to us:

*   **Website:** [adithyasrivatsa.in](https://adithyasrivatsa.in)
*   **Email:** [nandurilabs@gmail.com](mailto:nandurilabs@gmail.com)
*   **GitHub:** [Hundred-Trillion/Praescius](https://github.com/Hundred-Trillion/Praescius)
