---
title: "Kredge"
date: "2026-04-03"
description: "GST ITC Reconciliation Platform for Indian CA Firms."
tags: ["projects", "ai", "fastapi"]
---

# Kredge

Recover what's yours. — GST ITC Reconciliation Platform for Indian CA Firms.

Built an end-to-end reconciliation engine that helps chartered accountants match Input Tax Credit (ITC) between purchase registers (Tally/Busy) and GSTR-2B returns.  
The system identifies missing invoices, value mismatches, and GSTIN inconsistencies — ensuring zero ITC leakage.

- **Core Features:**
  - Automated invoice matching using Pandas-based reconciliation engine  
  - Detection of missing ITC, mismatched values, and supplier discrepancies  
  - Supplier risk scoring system (GREEN / YELLOW / RED)  
  - Automated supplier follow-ups via email workflows  
  - Secure client portal with tokenized access for real-time tracking  
  - Monthly automated summaries with Telegram alerts  

- **Backend:** FastAPI (modular API + cron webhook architecture)  
- **Frontend:** React Flow + Tailwind CSS (Vite)  
- **Database:** PostgreSQL via Supabase (with RLS policies)  
- **Auth:** Supabase Auth (JWT-based)  
- **File Processing:** openpyxl (Excel), JSON parsing (GSTR-2B)  
- **Reporting:** WeasyPrint + Jinja2 (PDF generation)  
- **Automation:** Telegram Bot API + external cron triggers  
- **Deployment:** Docker, Vercel (frontend), Railway (backend)  

- **Architecture Highlights:**
  - Document-driven reconciliation pipeline with scalable DAG-like processing  
  - In-memory demo mode for rapid testing without external dependencies  
  - Secure cron endpoint for scheduled monthly aggregation workflows  

[View on GitHub](https://github.com/Hundred-Trillion/Kredge)
