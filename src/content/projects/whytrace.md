---
title: "Whytrace"
date: "2026-03-01"
description: "A zero-setup Python debugging tool for tracking variable provenance and causal history."
tags: ["projects", "python", "debugging", "open-source", "dev-tools"]
---

# Whytrace

*Why does this variable have this value?*

**Whytrace** is a zero-setup Python debugging tool. When you're staring at a variable wondering "how did it end up with this value?", just call `why.did(x)` and get the full history — every assignment, every return, every rebinding — without a single print statement.

⚠️ *Dev tool only. Adds 2×–10× overhead via `sys.settrace`. Not for production.*

## ✨ Features
- **Zero setup**: Just `pip install` and import.
- **Automatic recording**: Tracks every variable mutation inherently.
- **Causal chain tracing**: Outputs a beautiful visual timeline of assignments.
- **Structured API**: Access provenance programmatically via JSON exports.
- **Conditional debugging**: `why.did_if(x, condition)` allows looping filters.
- **Checkpoint filtering**: Only see events after a specific moment in time.
- **Pytest Plugin Built-in**: Automatically dumps the history natively on test failures.

## 🚀 Quick Start

```python
import whytrace as why

def process():
    x = 10
    x = x * 3
    x = x + 5
    return x

result = process()
why.did(result)  # "Why does result have this value?"
```

**Output:**
```text
  ══════════════════════════════════════════════════════════════
  🔍 whytrace: Provenance for 'result'
  ──────────────────────────────────────────────────────────────
    1 → x = 10
       at example.py:4 in process()
       │ x = 10
      ········································
    2 → x = 30
       at example.py:5 in process()
       │ x = x * 3
       (rebound — prev id: ...)
      ········································
    3 → x = 35
       at example.py:6 in process()
       │ x = x + 5
       (rebound — prev id: ...)
      ········································
    4 → <return:process> = 35
       at example.py:7 in process()
       │ return x
      ········································
    5 → result = 35
       at example.py:9 in <module>()
       │ result = process()
  ──────────────────────────────────────────────────────────────
  5 event(s) across: <return:process>, result, x
  ══════════════════════════════════════════════════════════════
```

## 🛠️ Tracing Capabilities

| ✅ Tracked | ❌ Not tracked |
|---|---|
| `x = 42` (assignment) | `x.append(1)` (in-place mutation) |
| `x = f()` (return values) | `obj.attr = 5` (attribute mutation) |
| `x = y + z` (rebinding) | `d["key"] = val` (dict mutation) |
| `raise ValueError(...)` | Async task context switches |

*Rule of thumb: if Python creates a new object and binds a name to it → why sees it. If it mutates an existing object in-place → why doesn't (the id() hasn't changed).*

[View on GitHub](https://github.com/Hundred-Trillion/whytrace)
