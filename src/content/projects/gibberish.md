---
title: "Gibberish"
date: "2026-04-14"
description: "A global, system-level prompt compression tool that runs silently in the background."
tags: ["python", "automation", "ai"]
---

# ⚡ Gibberish
**Select chaos. Press shortcut. Get clarity.**

A global, system-level prompt compression tool that runs silently in the background.  
Select messy text anywhere → press a hotkey → get a clean, compressed prompt instantly.  

License: MIT | Python 3.8+ Platform

> [!IMPORTANT]
> - **Windows users:** You must run your terminal as Administrator (right-click → "Run as administrator").
> - **macOS users:** Grant Accessibility permissions to your terminal app.
> - **Linux users:** Run with `sudo`.
> 
> This is required for global hotkey capture to work system-wide.

## 🎯 What It Does
Gibberish compresses verbose, messy prompts into minimal, structured form — system-wide, with a single keyboard shortcut.

### Before → After

**INPUT (195 chars):**
> "Hi there, I was wondering if you could possibly help me understand how
> neural networks work? I'd really appreciate it if you could explain the
> basics with some simple examples. Thanks in advance!"

**OUTPUT (66 chars, 66% smaller):**
> Understand how neural networks work
> Explain basics simple examples

---

**INPUT (68 chars):**
> "hey bro can you explain recursion in python simply with examples pls"

**OUTPUT (24 chars, 65% smaller):**
> Explain recursion python

## 🚀 Quick Start

**1. Clone**
```bash
git clone https://github.com/Hundred-Trillion/gibberish.git
cd gibberish
```

**2. Install Dependencies**
```bash
pip install -r requirements.txt
```

**3. Test Compression**
```bash
python main.py --test
```

**4. Run the Daemon**
```bash
# Windows: Run terminal as Administrator
python main.py
```

**5. Use It**
- Select any text (browser, editor, terminal, anywhere)
- Press `Ctrl+;` (configurable)
- Selected text is replaced with the compressed version ✨

## 🖥️ Platform Setup

### Windows
```bash
pip install -r requirements.txt
```
*Important: Run your terminal as Administrator (right-click → "Run as administrator").*  
The keyboard library requires elevated privileges for global hotkey capture on Windows.

### macOS
```bash
pip3 install -r requirements.txt
```
*Important: Grant Accessibility permissions to your terminal:*  
System Settings → Privacy & Security → Accessibility → Add Terminal/IDE

### Linux
```bash
pip3 install -r requirements.txt

# Install a clipboard tool if not present
sudo apt install xclip          # X11
sudo apt install wl-clipboard   # Wayland

# Run with sudo (required for keyboard library)
sudo python3 main.py
```

## ⚙️ Configuration
Edit `config/settings.json`:

```json
{
    "shortcut": ["ctrl", ";"],
    "initializer_enabled": true,
    "initializer_text": "Respond minimal. No fluff. Direct answers only.",
    "compression_level": "ultra",
    "simulate_copy_delay_ms": 50,
    "simulate_paste_delay_ms": 50,
    "notification_enabled": true,
    "log_enabled": false,
    "log_file": "gibberish.log",
    "custom_filler_words": [],
    "custom_removals": []
}
```

### Options
| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `shortcut` | list | `["ctrl", ";"]` | Global hotkey combination |
| `initializer_enabled` | bool | `true` | Prepend session initializer prompt on first use |
| `initializer_text` | string | `"Respond minimal..."` | The initializer prompt text |
| `compression_level` | string | `"ultra"` | light, medium, or ultra |
| `custom_filler_words` | list | `[]` | Extra filler words to strip |
| `custom_removals` | list | `[]` | Extra phrases to strip |

### Compression Levels
| Level | What It Strips |
| :--- | :--- |
| **light** | Greetings, politeness, multi-word filler phrases |
| **medium** | + Individual filler words (just, really, basically...) |
| **ultra** | + Articles, prepositions, pronouns + restructures into bullet lines |

## 🧠 How It Works

### The Clipboard Trick
There's no universal API to read selected text across all apps. Gibberish uses the clipboard:

**Save clipboard → Clear → Simulate Ctrl+C → Read clipboard (= selected text)  
→ Compress → Write to clipboard → Simulate Ctrl+V → Restore original clipboard**  

Works in browsers, editors, terminals — anything that supports copy/paste.

### 6-Pass Compression Pipeline
1. **Strip multi-word filler phrases** ("thanks in advance", "I was wondering")
2. **Strip custom patterns** (user-defined in config)
3. **Strip filler words** ("just", "basically", "honestly")
4. **Ultra strip** (ultra mode) ("the", "a", "to", "in", "I", "you")
5. **Clean punctuation noise** (collapse repeated punctuation)
6. **Restructure** (ultra mode) (split into semantic bullet lines)

### Session Initializer
The initializer prompt is injected exactly once per session:

```text
Session Start
  ├─ 1st compression → "Respond minimal. No fluff." + compressed text
  ├─ 2nd compression → compressed text only
  ├─ 3rd compression → compressed text only
  └─ ...
Session Reset (--reset)
  ├─ 1st compression → initializer re-injected
  └─ ...
```

### Global Hotkey
Uses the keyboard library with `suppress=True` to intercept the hotkey at OS level before any application can see it. No conflicts with VS Code, browsers, or system shortcuts.

## 📁 Project Structure
```text
gibberish/
├── main.py                 # Entry point, CLI, orchestrator
├── requirements.txt        # Dependencies (keyboard, pynput, pyperclip)
├── LICENSE                 # MIT License
├── README.md
├── .gitignore
│
├── config/
│   └── settings.json       # User configuration
│
├── core/
│   ├── __init__.py
│   ├── compressor.py       # 6-pass prompt compression engine
│   ├── initializer.py      # One-time session initializer
│   └── session.py          # Session state tracker
│
└── system/
    ├── __init__.py
    ├── clipboard.py        # Cross-platform clipboard (ctypes / pbcopy / xclip)
    ├── hotkey.py           # Global hotkey (keyboard lib + suppress)
    └── selection.py        # Text capture/replace via clipboard trick
```

## 🛠️ CLI Commands
```bash
python main.py              # Start daemon (background mode)
python main.py --test       # Run compression on sample prompts
python main.py --reset      # Reset session (re-inject initializer)
python main.py --status     # Show current session info
```

## 📝 License
MIT — do whatever you want with it.

> *Built for developers who talk too much to their AI.*  
> *Stop writing essays. Start writing prompts.*
