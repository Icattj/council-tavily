#!/usr/bin/env node
/**
 * Council Tavily Search — Clean web search for agents
 * Uses Tavily API key already in Council Room backend
 */

const TAVILY_API_KEY = process.env.TAVILY_API_KEY || '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';

const args = process.argv.slice(2);
if (!args.length || args[0] === '--help') {
  console.error('Usage: search.mjs "query" [-n 5] [--deep] [--topic news|general] [--days 7]');
  process.exit(1);
}

const query = args[0];
let maxResults = 5;
let searchDepth = 'basic';
let topic = 'general';
let days;

for (let i = 1; i < args.length; i++) {
  if (args[i] === '-n' && args[i+1]) maxResults = parseInt(args[++i]);
  else if (args[i] === '--deep') searchDepth = 'advanced';
  else if (args[i] === '--topic' && args[i+1]) topic = args[++i];
  else if (args[i] === '--days' && args[i+1]) days = parseInt(args[++i]);
}

async function search() {
  const body = { query, max_results: maxResults, search_depth: searchDepth, topic };
  if (days) body.days = days;

  const res = await fetch('https://api.tavily.com/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${TAVILY_API_KEY}` },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(JSON.stringify({ error: `Tavily API error ${res.status}`, detail: err }));
    process.exit(1);
  }

  const data = await res.json();

  // Format for agent consumption
  let output = '';
  if (data.answer) output += `## Answer\n\n${data.answer}\n\n---\n\n`;
  output += `## Sources\n\n`;
  for (const r of (data.results || [])) {
    output += `### ${r.title}\n`;
    output += `URL: ${r.url}\n`;
    if (r.published_date) output += `Date: ${r.published_date}\n`;
    output += `\n${r.content}\n\n---\n\n`;
  }

  console.log(output.trim());
}

search().catch(e => {
  console.error(JSON.stringify({ error: e.message }));
  process.exit(1);
});
