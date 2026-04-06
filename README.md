# ---

> OpenClaw AI Agent Skill

---
name: Council Tavily Search
description: AI-optimized web search for Council Room agents. Returns clean results agents can use directly — no HTML parsing, no scraping. Uses the Tavily API key already configured in the Council Room backend. Use when Metis needs live web research, Gabriel monitors competitors, or any agent needs current information.
---

# Council Tavily Search

Search the web from any agent. Returns clean, agent-ready results.

## Usage

```bash
# Direct search
node ~/.openclaw/workspace/skills/council-tavily/scripts/search.mjs "query"

# News search
node ~/.openclaw/workspace/skills/council-tavily/scripts/search.mjs "query" --topic news

# Deep research
node ~/.openclaw/workspace/skills/council-tavily/scripts/search.mjs "query" --deep

# More results
node ~/.openclaw/workspace/skills/council-tavily/scripts/search.mjs "query" -n 8
```

## AgentExec Integration

Agents embed search in [EXEC:] tags — add this to AgentExec allowlist:
```
[EXEC: node ~/.openclaw/workspace/skills/council-tavily/scripts/search.mjs "Ledgerowl pricing Indonesia"]
```

## API Key

Uses `TAVILY_API_KEY` from environment or hardcoded in Council Room backend.
Key: `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`

## Which Agent Uses This

- Metis 📚 — competitor research, market intelligence
- Gabriel 📣 — monitor Mekari, Paper.id, Ledgerowl, Accurate
- Michael 🛡️ — risk signal scanning
- Rafael 🧭 — strategic context gathering

## Installation

```bash
cp -r council-tavily/ ~/.openclaw/workspace/skills/council-tavily/
```

## License

MIT © [Sentra Technology](https://github.com/Icattj)
