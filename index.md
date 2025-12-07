# Quick Start

This guide will help you get up and running with the Hack Club AI API in minutes.

## Get an API Key

Create an API key from your [dashboard](https://ai.hackclub.com/dashboard). Give it a descriptive name for easy identification (e.g. `CraftAI`), and make sure to keep it secure and private!

<video width="100%" src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/620e1c22bd7dd2b81ca871353636f8d0afa27fed_screen_recording_2025-11-19_at_21.40.33.mp4" class="shadow-md rounded-md" autoplay muted loop></video>

## Make Your First Request

Here's how to make your first API call using different methods:

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

## What's Next?

- [Authentication](/guide/authentication) - Learn about API key management
- [Chat Completions](/api/chat-completions) - Generate text responses
- [Image Generation](/api/image-generation) - Create images with AI
- [Embeddings](/api/embeddings) - Generate vector embeddings
