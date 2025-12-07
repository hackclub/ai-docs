---
description: "Create chat completions (aka: talk to the AI) for conversations with AI models. Supports streaming and non-streaming modes."
---

# Chat Completions

Create chat completions for conversations with AI models. Supports streaming and non-streaming modes.

## Endpoint

```
POST /proxy/v1/chat/completions
```

## Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `model` | string | Yes | Model ID (e.g., `qwen/qwen3-32b`) |
| `messages` | array | Yes | Array of message objects |
| `stream` | boolean | No | Enable streaming (default: `false`) |
| `temperature` | number | No | Controls randomness, 0-2 (default: `1.0`) |
| `max_tokens` | number | No | Maximum tokens to generate |
| `top_p` | number | No | Nucleus sampling (default: `1.0`) |

### Message Object

| Field | Type | Description |
|-------|------|-------------|
| `role` | string | `user`, `assistant`, or `system` |
| `content` | string | The message content |

## Example Request

::: code-group

```bash [cURL]
curl https://ai.hackclub.com/proxy/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen/qwen3-32b",
    "messages": [
      {"role": "user", "content": "Tell me a joke."}
    ]
  }'
```

```javascript [JavaScript]
import { OpenRouter } from "@openrouter/sdk";

const client = new OpenRouter({
  apiKey: "YOUR_API_KEY",
  baseURL: "https://ai.hackclub.com/proxy/v1",
});

const response = await client.chat.send({
  model: "qwen/qwen3-32b",
  messages: [
    { role: "user", content: "Tell me a joke." },
  ],
  stream: false,
});

console.log(response.choices[0].message.content);
```

```python [Python]
from openrouter import OpenRouter

client = OpenRouter(
    api_key="YOUR_API_KEY",
    server_url="https://ai.hackclub.com/proxy/v1",
)

response = client.chat.send(
    model="qwen/qwen3-32b",
    messages=[
        {"role": "user", "content": "Tell me a joke."}
    ],
    stream=False,
)

print(response.choices[0].message.content)
```

:::

## Example Response

```json
{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "qwen/qwen3-32b",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Why did the scarecrow win an award? Because he was outstanding in his field!"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 20,
    "completion_tokens": 15,
    "total_tokens": 35
  }
}
```

## Streaming

Set `stream: true` to receive responses as server-sent events (SSE). Each chunk contains a delta of the response.
