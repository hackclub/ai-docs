---
description: "Create responses using the Responses API. Supports simple text input, structured messages, and streaming."
---

# Responses API

Create responses for conversations with AI models. Supports both simple string input and structured message arrays.

## Endpoint

```
POST /proxy/v1/responses
```

## Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `model` | string | Yes | Model ID (e.g., `qwen/qwen3-32b`) |
| `input` | string or array | Yes | Text prompt or message array |
| `stream` | boolean | No | Enable streaming (default: `false`) |
| `max_output_tokens` | integer | No | Maximum tokens to generate |
| `temperature` | number | No | Sampling temperature, 0-2 |
| `top_p` | number | No | Nucleus sampling parameter, 0-1 |

### Message Object (Structured Input)

| Field | Type | Description |
|-------|------|-------------|
| `type` | string | Must be `message` |
| `role` | string | `user` or `assistant` |
| `content` | array | Array of content objects |

### Content Object

| Field | Type | Description |
|-------|------|-------------|
| `type` | string | `input_text` for user, `output_text` for assistant |
| `text` | string | The message content |

## Simple String Input

The simplest way to use the API:

::: code-group

```bash [cURL]
curl https://ai.hackclub.com/proxy/v1/responses \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen/qwen3-32b",
    "input": "What is the meaning of life?",
    "max_output_tokens": 9000
  }'
```

```javascript [JavaScript]
const response = await fetch('https://ai.hackclub.com/proxy/v1/responses', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'qwen/qwen3-32b',
    input: 'What is the meaning of life?',
    max_output_tokens: 9000,
  }),
});

const result = await response.json();
console.log(result);
```

```python [Python]
import requests

response = requests.post(
    'https://ai.hackclub.com/proxy/v1/responses',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json',
    },
    json={
        'model': 'qwen/qwen3-32b',
        'input': 'What is the meaning of life?',
        'max_output_tokens': 9000,
    }
)

result = response.json()
print(result)
```

:::

## Structured Message Input

For more complex conversations, use the message array format:

::: code-group

```bash [cURL]
curl https://ai.hackclub.com/proxy/v1/responses \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen/qwen3-32b",
    "input": [
      {
        "type": "message",
        "role": "user",
        "content": [
          {
            "type": "input_text",
            "text": "Tell me a joke about programming"
          }
        ]
      }
    ],
    "max_output_tokens": 9000
  }'
```

```javascript [JavaScript]
const response = await fetch('https://ai.hackclub.com/proxy/v1/responses', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'qwen/qwen3-32b',
    input: [
      {
        type: 'message',
        role: 'user',
        content: [
          {
            type: 'input_text',
            text: 'Tell me a joke about programming',
          },
        ],
      },
    ],
    max_output_tokens: 9000,
  }),
});

const result = await response.json();
```

```python [Python]
import requests

response = requests.post(
    'https://ai.hackclub.com/proxy/v1/responses',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json',
    },
    json={
        'model': 'qwen/qwen3-32b',
        'input': [
            {
                'type': 'message',
                'role': 'user',
                'content': [
                    {
                        'type': 'input_text',
                        'text': 'Tell me a joke about programming',
                    },
                ],
            },
        ],
        'max_output_tokens': 9000,
    }
)

result = response.json()
```

:::

## Example Response

```json
{
  "id": "resp_1234567890",
  "object": "response",
  "created_at": 1234567890,
  "model": "qwen/qwen3-32b",
  "output": [
    {
      "type": "message",
      "id": "msg_abc123",
      "status": "completed",
      "role": "assistant",
      "content": [
        {
          "type": "output_text",
          "text": "The meaning of life is a philosophical question...",
          "annotations": []
        }
      ]
    }
  ],
  "usage": {
    "input_tokens": 12,
    "output_tokens": 45,
    "total_tokens": 57
  },
  "status": "completed"
}
```

## Streaming

Set `stream: true` to receive responses as server-sent events (SSE):

::: code-group

```javascript [JavaScript]
const response = await fetch('https://ai.hackclub.com/proxy/v1/responses', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'qwen/qwen3-32b',
    input: 'Write a short story about AI',
    stream: true,
    max_output_tokens: 9000,
  }),
});

const reader = response.body?.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  const chunk = decoder.decode(value);
  const lines = chunk.split('\n');

  for (const line of lines) {
    if (line.startsWith('data: ')) {
      const data = line.slice(6);
      if (data === '[DONE]') return;

      try {
        const parsed = JSON.parse(data);
        console.log(parsed);
      } catch (e) {
        // Skip invalid JSON
      }
    }
  }
}
```

```python [Python]
import requests
import json

response = requests.post(
    'https://ai.hackclub.com/proxy/v1/responses',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json',
    },
    json={
        'model': 'qwen/qwen3-32b',
        'input': 'Write a short story about AI',
        'stream': True,
        'max_output_tokens': 9000,
    },
    stream=True
)

for line in response.iter_lines():
    if line:
        line_str = line.decode('utf-8')
        if line_str.startswith('data: '):
            data = line_str[6:]
            if data == '[DONE]':
                break
            try:
                parsed = json.loads(data)
                print(parsed)
            except json.JSONDecodeError:
                continue
```

:::

## Multi-Turn Conversations

The Responses API is stateless—include the full conversation history in each request:

```javascript
const response = await fetch('https://ai.hackclub.com/proxy/v1/responses', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'qwen/qwen3-32b',
    input: [
      {
        type: 'message',
        role: 'user',
        content: [{ type: 'input_text', text: 'What is the capital of France?' }],
      },
      {
        type: 'message',
        role: 'assistant',
        id: 'msg_abc123',
        status: 'completed',
        content: [{ type: 'output_text', text: 'The capital of France is Paris.', annotations: [] }],
      },
      {
        type: 'message',
        role: 'user',
        content: [{ type: 'input_text', text: 'What is the population of that city?' }],
      },
    ],
    max_output_tokens: 9000,
  }),
});
```

::: info
The `id` and `status` fields are required for any `assistant` role messages in conversation history.
:::
