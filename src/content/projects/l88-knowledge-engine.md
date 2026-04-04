---
title: "L88 — Agentic RAG Knowledge Engine"
date: "2026-03-03"
description: "Locally-hosted agentic RAG system with a self-correcting LangGraph pipeline running entirely on your own hardware."
tags: ["projects", "ai", "langgraph", "fastapi", "rag", "react"]
---

# L88 — Agentic RAG Knowledge Engine

**100% Local · Zero Cloud · Fully Private**

L88 is a locally-hosted agentic RAG system for researchers. Upload PDFs, ask questions, and get cited answers — powered by a self-correcting LangGraph pipeline running entirely on your own hardware. Multi-user, multi-session, role-based access control.

## 🏗️ Architecture Stack

| Layer | Stack |
| :--- | :--- |
| **Frontend** | React 19, Vite 6, Tailwind CSS 4, Framer Motion, Lucide |
| **Backend** | FastAPI, SQLModel (SQLite), Pydantic, JWT |
| **Intelligence** | LangGraph (agentic orchestration), Ollama (local LLM) |
| **Retrieval** | FAISS (vector store) + BM25 (keyword) + BGE (embed + rerank) |
| **LLM** | Qwen2.5-7B-AWQ (4-bit quantized, GPU-optimized) |

```text
┌────────────────────────────────────────────────────────────────────┐
│                      Frontend (React + Vite)                       │
│   Sidebar (Sessions)  │  ChatPanel (Messages)  │  RightPanel       │
│   Role Switcher       │  Pipeline Status HUD   │  Docs · Notes     │
│   Session CRUD        │  Stop Generation       │  Members          │
├────────────────────────────────────────────────────────────────────┤
│                    Backend (FastAPI + SQLModel)                    │
│   Auth (JWT)  │  Sessions  │  Documents  │  Members  │ Scratchpad │
├────────────────────────────────────────────────────────────────────┤
│                  Intelligence (LangGraph + Ollama)                 │
│   Router → Analyzer → Rewriter → Retriever → Generator             │
│                              ↑          Self-Evaluator ↓           │
│                              └──── retry loop ─────────┘           │
└────────────────────────────────────────────────────────────────────┘
```

## 🧠 Agentic RAG Pipeline

L88 doesn't just retrieve — it reasons. The backend runs a cyclic LangGraph that self-corrects:

1. **Router** — Routes to RAG (docs selected), general chat, or summarization.
2. **Analyzer & Rewriter** — Classifies query type, expands acronyms, decomposes into sub-queries.
3. **Retrieval** — Hybrid FAISS + BM25 with score normalization and cross-encoder reranking.
4. **Generator** — Produces structured answers with reasoning traces and inline citations.
5. **Self-Evaluator** — Validates confidence; retries the rewriter loop if evidence gaps are found.

When no documents are uploaded, L88 successfully falls back to the LLM's trained knowledge for general conversation.

## ✨ Features

- **Session Workspaces**: Isolated research sessions with their own documents and chat history.
- **Per-Session Collaboration**: Add users with role-based access (Admin / Chat / Read Only).
- **Document Management**: Upload PDFs, toggle selection, delete — per session (async index rebuild).
- **Hardened Retrieval**: Header/footer stripping, stopword-aware BM25, score normalization, acronym expansion, and 0.55 confidence tuning.
- **Semantic Section-Aware Chunking**: Detects document headers and prepends them to chunks for superior retrieval context.
- **Rich Source Attribution**: Visual badges for "Document Evidence," "Web Research," and "Internal Knowledge" with distinct iconography.
- **Live Pipeline Status**: Ambient status text shows what the pipeline is doing while generating.
- **OCR Fallback**: Built-in PaddleOCR support to extract text from scanned PDFs and images.

[View on GitHub](https://github.com/Hundred-Trillion/L88-Full)
