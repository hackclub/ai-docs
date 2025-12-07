---
description: "Generate images with AI"
---

# Image Generation

Generate images using AI models via the chat completions endpoint.

## Supported Models

- `google/gemini-2.5-flash-image-preview` (aka Nano Banana) - faster, but lower quality
- `google/gemini-3-pro-image-preview` (aka Nano Banana 3 Pro) - higher quality output, but also slower

## Request Parameters

In addition to standard chat completion parameters, include:

| Parameter | Type | Description |
|-----------|------|-------------|
| `modalities` | array | Set to `["image", "text"]` for image generation |
| `image_config` | object | Optional configuration for image output |
| `image_config.aspect_ratio` | string | Aspect ratio (see table below) |

### Supported Aspect Ratios

For Gemini image-generation models:

| Aspect Ratio | Dimensions |
|--------------|------------|
| `1:1` | 1024×1024 (default) |
| `2:3` | 832×1248 |
| `3:2` | 1248×832 |
| `3:4` | 864×1184 |
| `4:3` | 1184×864 |
| `4:5` | 896×1152 |
| `5:4` | 1152×896 |
| `9:16` | 768×1344 |
| `16:9` | 1344×768 |
| `21:9` | 1536×672 |

## Example Request

::: code-group

```bash [cURL]
curl https://ai.hackclub.com/proxy/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "google/gemini-2.5-flash-image-preview",
    "messages": [
      {
        "role": "user",
        "content": "Make a picture of a sunset over mountains"
      }
    ],
    "modalities": ["image", "text"],
    "image_config": {
      "aspect_ratio": "16:9"
    },
    "stream": false
  }'
```

```python [Python]
import base64
import requests

headers = {
    "Authorization": f"Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}

payload = {
    "model": "google/gemini-2.5-flash-image",
    "messages": [
        {
            "role": "user",
            "content": "Make a picture of a sunset over mountains"
        }
    ],
    "modalities": ["image", "text"],
    "image_config": {
        "aspect_ratio": "16:9"
    }
}

response = requests.post(
    "https://ai.hackclub.com/proxy/v1/chat/completions",
    headers=headers,
    json=payload
)
result = response.json()

if result.get("choices"):
    message = result["choices"][0]["message"]
    if message.get("images"):
        image_url = message["images"][0]["image_url"]["url"]
        
        # Handle data URI prefix
        if "," in image_url:
            base64_data = image_url.split(",")[1]
        else:
            base64_data = image_url

        image_bytes = base64.b64decode(base64_data)
        # Save or process image_bytes as needed
```

:::

## Response Format

The response includes an `images` array in the assistant message:

```json
{
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "Here is your image of a sunset over mountains.",
        "images": [
          {
            "type": "image_url",
            "image_url": {
              "url": "data:image/png;base64,..."
            }
          }
        ]
      },
      "finish_reason": "stop"
    }
  ]
}
```

- **Format**: Images are returned as base64-encoded data URLs
- **Types**: Typically PNG format (`data:image/png;base64,`)
- **Multiple Images**: Some models can generate multiple images in a single response

## Streaming

Image generation also works with streaming responses. Set `stream: true` to receive the response as server-sent events.

## More Information

Refer to the [OpenRouter image docs](https://openrouter.ai/docs/guides/overview/multimodal/image-generation) for more details.
