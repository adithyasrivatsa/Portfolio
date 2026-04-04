---
title: "F1 Autonomous Racing Digital Twin"
date: "2025-12-27"
description: "Production-grade AI system for autonomous F1 racing simulation and control."
tags: ["projects", "ai", "machine-learning", "reinforcement-learning", "python"]
---

# F1 Autonomous Racing Digital Twin

A production-grade AI system for autonomous F1 racing simulation and control.

## 🧠 Architecture Overview
**Closed decision loop:**  
`Telemetry → World Model → Decision → Vehicle Dynamics → Outcome → Learning`

### Design Principles
- **Configuration controls everything**: All architecture variables are isolated in YAML configuration files.
- **No simulator code in ML code**: Clean environment abstraction layers.
- **CPU-first, GPU-ready**: Graceful scaling across minimal development machines and massive training clusters.
- **Reproducibility by default**: Strict experiment encapsulation.
- **Explainability over performance**: Priority on analysis-ready logging mechanisms.

## 💻 Hardware Requirements

**Development (CPU-only):**
- Intel i5-13500H or equivalent
- 32GB RAM minimum
- No GPU required

**Training (GPU):**
- RTX A4000 (16GB VRAM)
- 128GB system RAM
- Arch Linux

## 🏗️ Repository Structure

```text
f1_digital_twin/
├── configs/                 # All configuration (YAML only)
├── src/
│   ├── core/               # Pure functions, no side effects
│   ├── env/                # Environment abstraction layer
│   ├── models/             # World model, policy networks
│   ├── training/           # Training loops, rollout management
│   ├── telemetry/          # State representation, normalization
│   └── analysis/           # Explainability, logging
├── tests/                  # Unit and integration tests
├── scripts/                # Entry points only
└── experiments/            # Isolated experiment outputs
```

## 🚀 Quick Start

```bash
# CPU environment setup
cd f1_digital_twin
python -m venv .venv_cpu
source .venv_cpu/bin/activate
pip install -r requirements_cpu.txt

# Verify installation
python -m pytest tests/ -v

# Run CPU training (stub environment)
python scripts/train.py --config configs/base.yaml --device cpu
```

[View on GitHub](https://github.com/adithyasrivatsa/f1_digital_twin)
