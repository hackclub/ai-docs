---
description: "Add real-time web search to your AI applications."
---

# Web Search for AI

Ground your AI responses with real-time web data using the [Hack Club Search API](https://search.hackclub.com). This guide shows how to combine Hack Club AI with web search for more accurate, up-to-date responses.

## Why Add Web Search?

LLMs have knowledge cutoffs and can hallucinate facts. By incorporating live search results into your prompts, you can:

- Provide current information (news, prices, events).
- Ground responses in verifiable sources and increase trustworthiness.
- Reduce hallucinations with real data.

## Getting Started

You'll need two API keys:
1. **Hack Club AI** - for LLM inference ([get one here](/guide/authentication))
2. **Hack Club Search** - for web search ([get one from the dashboard](https://search.hackclub.com))

## Basic Pattern

The pattern is simple: search first, then include results in your prompt.

```ts
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { generateText } from 'ai';

const hackclub = createOpenRouter({
  apiKey: process.env.HACK_CLUB_AI_API_KEY,
  baseUrl: 'https://ai.hackclub.com/proxy/v1',
});

async function searchWeb(query: string) {
  const res = await fetch(
    `https://search.hackclub.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=5`,
    {
      headers: {
        Authorization: `Bearer ${process.env.HACK_CLUB_SEARCH_API_KEY}`,
      },
    }
  );
  return res.json();
}

async function askWithSearch(question: string) {
  // 1. Search the web
  const searchResults = await searchWeb(question);
  
  // 2. Format results for the prompt
  const context = searchResults.web?.results
    ?.map((r: any) => `[${r.title}](${r.url})\n${r.description}`)
    .join('\n\n');

  // 3. Ask the AI with search context
  const { text } = await generateText({
    model: hackclub('qwen/qwen3-32b'),
    system: `You are a helpful assistant. Use the following web search results to answer questions accurately. Cite sources using markdown links.

Web search results:
${context}`,
    prompt: question,
  });

  return text;
}

// Example usage
const answer = await askWithSearch("What's happening at Hack Club right now?");
console.log(answer);
```

## Search Types

The Search API supports multiple search types for different use cases:

### Web Search
General web search for pages, articles, and documentation.

```ts
const res = await fetch(
  `https://search.hackclub.com/res/v1/web/search?q=${query}&count=10`,
  { headers: { Authorization: `Bearer ${apiKey}` } }
);
```

### News Search
Get recent news articles with the `freshness` parameter.

```ts
const res = await fetch(
  `https://search.hackclub.com/res/v1/news/search?q=${query}&freshness=pd`, // pd = past day
  { headers: { Authorization: `Bearer ${apiKey}` } }
);
```

### Image Search
Search for images to include in multimodal prompts.

```ts
const res = await fetch(
  `https://search.hackclub.com/res/v1/images/search?q=${query}&count=5`,
  { headers: { Authorization: `Bearer ${apiKey}` } }
);
```

## Python Example

```python
import requests
import os

def search_web(query: str) -> dict:
    response = requests.get(
        'https://search.hackclub.com/res/v1/web/search',
        params={'q': query, 'count': 5},
        headers={'Authorization': f'Bearer {os.environ["HACK_CLUB_SEARCH_API_KEY"]}'}
    )
    return response.json()

def ask_with_search(question: str) -> str:
    # Search the web
    results = search_web(question)
    
    # Format context
    context = "\n\n".join([
        f"[{r['title']}]({r['url']})\n{r['description']}"
        for r in results.get('web', {}).get('results', [])
    ])
    
    # Call Hack Club AI
    response = requests.post(
        'https://ai.hackclub.com/chat/completions',
        headers={'Authorization': f'Bearer {os.environ["HACK_CLUB_AI_API_KEY"]}'},
        json={
            'model': 'qwen/qwen3-32b',
            'messages': [
                {
                    'role': 'system',
                    'content': f'Use these web results to answer accurately. Cite sources.\n\n{context}'
                },
                {'role': 'user', 'content': question}
            ]
        }
    )
    
    return response.json()['choices'][0]['message']['content']
```

## Tips

- **Be specific with queries** - More specific search queries yield better results.
- **Limit results** - 3-5 results is usually enough context without overwhelming the model. If you request too many, it can pollute the context and make it harder for the model to understand the question.
- **Use freshness** - For time-sensitive topics, use `freshness=pd` (past day) or `freshness=pw` (past week).
- **Cite sources** - Instruct the model to cite sources so users can verify information.
- **Handle errors** - The search API has rate limits (400 requests per 30 minutes), so handle 429 errors gracefully.

## Rate Limits

The Hack Club Search API allows:
- 400 requests per 30 minutes per user
- Maximum query length: 400 characters

## Next Steps

- [Hack Club Search API Documentation](https://search.hackclub.com/docs) - Full API reference
- [Brave Search API Docs](https://api.search.brave.com/app/documentation) - Detailed response schemas
