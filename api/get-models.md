---
description: "List all available models for chat completions and embeddings."
---

# Get Models

List all available models for chat completions and embeddings.

## Language Models

```
GET /proxy/v1/models
```

List all available language models. **No authentication required.**

### Example Request

```bash
curl https://ai.hackclub.com/proxy/v1/models
```

### Response Format

This endpoint is OpenAI compatible, so the response format matches the OpenAI models endpoint:

```json
{
  "object": "list",
  "data": [
    {
      "id": "qwen/qwen3-32b",
      "object": "model",
      "created": 1677649963,
      "owned_by": "qwen"
    },
    ...
  ]
}
```

## Embedding Models

```
GET /proxy/v1/embeddings/models
```

List all available embedding models. **No authentication required.**

### Example Request

```bash
curl https://ai.hackclub.com/proxy/v1/embeddings/models
```

### Response Format

This endpoint is OpenRouter compatible, so the response format matches the OpenRouter models endpoint.
