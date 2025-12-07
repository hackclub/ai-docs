---
description: "Generate vector embeddings from text input. Use these embeddings for semantic search, clustering, or storing in vector databases like Pinecone or pgvector."
---

# Embeddings

Generate vector embeddings from text input. Use these embeddings for semantic search, clustering, or storing in vector databases like Pinecone or pgvector.

## Endpoint

```
POST /proxy/v1/embeddings
```

## Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `model` | string | Yes | Embedding model ID (e.g., `qwen/qwen3-embedding-8b`) |
| `input` | string or array | Yes | Text to embed (single string or array of strings) |

## Example Request

::: code-group

```bash [cURL]
curl https://ai.hackclub.com/proxy/v1/embeddings \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen/qwen3-embedding-8b",
    "input": "The quick brown fox jumps over the lazy dog"
  }'
```

```python [Python]
from openrouter import OpenRouter

client = OpenRouter(
    api_key="YOUR_API_KEY",
)

response = client.embeddings.generate(
    model="qwen/qwen3-embedding-8b",
    input="The quick brown fox jumps over the lazy dog",
)

embedding_vector = response.data[0].embedding
print(len(embedding_vector), "dimensions")
```

:::

## Example Response

```json
{
  "object": "list",
  "data": [
    {
      "object": "embedding",
      "index": 0,
      "embedding": [0.0023, -0.0134, 0.0421, ...]
    }
  ],
  "model": "qwen/qwen3-embedding-8b",
  "usage": {
    "prompt_tokens": 9,
    "total_tokens": 9
  }
}
```

## Available Models

To list available embedding models:

```bash
curl https://ai.hackclub.com/proxy/v1/embeddings/models
```

This endpoint is OpenRouter compatible and requires no authentication.
