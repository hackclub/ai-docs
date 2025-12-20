---
description: "Send images to vision-capable models for analysis and understanding."
---

# Image Inputs

Send images to vision-capable models for analysis and understanding.

## Supported Models

- `google/gemini-3-pro-image-preview` - High quality vision model
- `google/gemini-2.5-flash-image-preview` - Faster vision model

## Supported Formats

- **URL**: Send publicly accessible images directly
- **Base64**: Required for local files or private images

## Example: Image via URL

::: code-group

```bash [cURL]
curl https://ai.hackclub.com/proxy/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "google/gemini-3-pro-image-preview",
    "messages": [
      {
        "role": "user",
        "content": [
          {"type": "text", "text": "What'\''s in this image?"},
          {
            "type": "image_url",
            "image_url": {
              "url": "https://example.com/image.jpg"
            }
          }
        ]
      }
    ]
  }'
```

```javascript [JavaScript]
const response = await fetch('https://ai.hackclub.com/proxy/v1/chat/completions', {
  method: 'POST',
  headers: {
    Authorization: `Bearer YOUR_API_KEY`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'google/gemini-3-pro-image-preview',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: "What's in this image?",
          },
          {
            type: 'image_url',
            image_url: {
              url: 'https://example.com/image.jpg',
            },
          },
        ],
      },
    ],
  }),
});

const data = await response.json();
console.log(data.choices[0].message.content);
```

```python [Python]
import requests

response = requests.post(
    "https://ai.hackclub.com/proxy/v1/chat/completions",
    headers={
        "Authorization": "Bearer YOUR_API_KEY",
        "Content-Type": "application/json"
    },
    json={
        "model": "google/gemini-3-pro-image-preview",
        "messages": [{
            "role": "user",
            "content": [
                {"type": "text", "text": "What's in this image?"},
                {
                    "type": "image_url",
                    "image_url": {
                        "url": "https://example.com/image.jpg"
                    }
                }
            ]
        }]
    }
)

result = response.json()
print(result["choices"][0]["message"]["content"])
```

:::

## Example: Base64-encoded Image

::: code-group

```javascript [JavaScript]
// Convert image to base64
const imageBuffer = await fetch('https://example.com/image.jpg').then(r => r.arrayBuffer());
const base64Image = Buffer.from(imageBuffer).toString('base64');

const response = await fetch('https://ai.hackclub.com/proxy/v1/chat/completions', {
  method: 'POST',
  headers: {
    Authorization: `Bearer YOUR_API_KEY`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'google/gemini-3-pro-image-preview',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: "What's in this image?",
          },
          {
            type: 'image_url',
            image_url: {
              url: `data:image/jpeg;base64,${base64Image}`,
            },
          },
        ],
      },
    ],
  }),
});

const data = await response.json();
console.log(data.choices[0].message.content);
```

```python [Python]
import base64
import requests

def encode_image(path):
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode()

image_data = encode_image("path/to/image.jpg")

response = requests.post(
    "https://ai.hackclub.com/proxy/v1/chat/completions",
    headers={
        "Authorization": "Bearer YOUR_API_KEY",
        "Content-Type": "application/json"
    },
    json={
        "model": "google/gemini-3-pro-image-preview",
        "messages": [{
            "role": "user",
            "content": [
                {"type": "text", "text": "What's in this image?"},
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/jpeg;base64,{image_data}"
                    }
                }
            ]
        }]
    }
)

result = response.json()
print(result["choices"][0]["message"]["content"])
```

:::

## Response Format

```json
{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "model": "google/gemini-3-pro-image-preview",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "This image shows a sunset over mountains with vibrant orange and purple colors..."
      },
      "finish_reason": "stop"
    }
  ]
}
```
