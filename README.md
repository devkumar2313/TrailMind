# TrailMind 🌿 — Offline Nature AI Companion

> **Identify birds, plants, mushrooms & wildlife with open-source AI — no internet required on the trail.**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Powered by Ollama](https://img.shields.io/badge/Powered%20by-Ollama-blue.svg)](https://ollama.com)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-orange.svg)](https://web.dev/progressive-web-apps/)
[![Built for Hacktoberfest 2026](https://img.shields.io/badge/Hacktoberfest-2026-ff69b4.svg)](https://dev.to/challenges/hacktoberfest-week1-2026-10-05)

## What It Does

TrailMind is a **Progressive Web App (PWA)** that uses locally-running open-weight AI vision models (via [Ollama](https://ollama.com)) to identify nature in your photos. Take a picture of a bird, plant, mushroom, or any wildlife — TrailMind gives you:

- 🦅 Species name (common + scientific)
- 🔬 Key identifying features
- 📚 Interesting ecological facts
- 🥾 Trail notes (habitat, season, edibility/safety)

**The entire AI runs on your device. Your photos never leave your laptop or phone.**

## Why Open Source AI?

| Closed API | TrailMind (Open-source) |
|---|---|
| Sends photos to corporate servers | Photos never leave your device |
| Requires internet on the trail | Works offline, mid-hike |
| Monthly subscription costs | Runs free, forever |
| Black-box model | Swap models, fine-tune, inspect |
| Rate-limited | Unlimited queries |

## Tech Stack

| Component | Technology |
|---|---|
| **AI Inference** | [Ollama](https://ollama.com) — local open-weight models |
| **Vision Models** | llama3.2-vision, llava, moondream, llava-phi3 |
| **Frontend** | Vanilla HTML/CSS/JS — zero dependencies |
| **Offline** | Service Worker + Cache API |
| **Installable** | PWA with Web App Manifest |
| **Server** | Node.js (zero npm dependencies) |

## Quick Start

### 1. Clone & run TrailMind

```bash
git clone https://github.com/YOUR_USERNAME/trailmind
cd trailmind
node server.js
# Open http://localhost:3000
```

### 2. Set up Ollama (one-time)

```bash
# Install from https://ollama.com

# Pull a vision model
ollama pull llama3.2-vision

# Run with CORS enabled (required for browser access)
OLLAMA_ORIGINS=* ollama serve
```

### 3. Go outside!

Open TrailMind on your laptop (or phone via local network), snap a photo of something interesting outdoors, and get an instant identification.

## Supported Models

| Model | Size | Best For |
|---|---|---|
| `llama3.2-vision` | ~8GB | Best accuracy, detailed descriptions |
| `llava` | ~4GB | Balanced speed/accuracy |
| `moondream` | ~1.7GB | Fast, works on older hardware |
| `llava-phi3` | ~2.9GB | Good on CPU-only machines |

## Architecture

```
┌─────────────────────────────────────┐
│           TrailMind PWA             │
│  (Browser — fully cached offline)   │
│                                     │
│  📸 Camera/Upload → Base64 encode   │
│         ↓                           │
│  🔍 POST /api/chat (localhost)      │
└──────────────┬──────────────────────┘
               │ (local network only)
┌──────────────▼──────────────────────┐
│           Ollama Server             │
│   (Running on your machine)         │
│                                     │
│   llama3.2-vision / llava / etc.    │
│   Open-weight, Apache 2.0 / MIT     │
└─────────────────────────────────────┘
```

## Privacy

- ✅ No analytics
- ✅ No telemetry  
- ✅ No accounts required
- ✅ Photos never leave your device
- ✅ History stored in localStorage only
- ✅ Works completely offline after setup

## License

MIT — free to use, fork, and take hiking.

---

*Built for [Hacktoberfest Open-Source AI Challenge Week 1: Touch Grass](https://dev.to/challenges/hacktoberfest-week1-2026-10-05)*
