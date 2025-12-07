---
description: "Classify if text or images are potentially inappropriate (e.g., hate speech, violence, NSFW content)."
---

# Moderations

Classify if text or images are potentially inappropriate (e.g., hate speech, violence, NSFW content).

## Endpoint

```
POST /proxy/v1/moderations
```

## Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | string | Yes | Text to classify |

## Example Request

```bash
curl https://ai.hackclub.com/proxy/v1/moderations \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "input": "I want to kill them."
  }'
```

## Example Response

```json
{
  "id": "modr-5558",
  "model": "omni-moderation-latest",
  "results": [
    {
      "flagged": true,
      "categories": {
        "harassment": false,
        "harassment/threatening": false,
        "sexual": false,
        "hate": false,
        "hate/threatening": false,
        "illicit": false,
        "illicit/violent": false,
        "self-harm/intent": false,
        "self-harm/instructions": false,
        "self-harm": false,
        "sexual/minors": false,
        "violence": true,
        "violence/graphic": false
      },
      "category_scores": {
        "harassment": 0.009,
        "harassment/threatening": 0.001,
        "sexual": 0.0002,
        "hate": 0.001,
        "hate/threatening": 0.00002,
        "illicit": 0.004,
        "illicit/violent": 0.00003,
        "self-harm/intent": 0.0002,
        "self-harm/instructions": 0.000003,
        "self-harm": 0.00001,
        "sexual/minors": 0.0002,
        "violence": 0.93,
        "violence/graphic": 0.000004
      },
      "category_applied_input_types": {
        "harassment": ["text"],
        "harassment/threatening": ["text"],
        "sexual": ["text"],
        "hate": ["text"],
        "hate/threatening": ["text"],
        "illicit": ["text"],
        "illicit/violent": ["text"],
        "self-harm/intent": ["text"],
        "self-harm/instructions": ["text"],
        "self-harm": ["text"],
        "sexual/minors": ["text"],
        "violence": ["text"],
        "violence/graphic": ["text"]
      }
    }
  ]
}
```

## Categories

| Category | Description |
|----------|-------------|
| `harassment` | Harassing language |
| `harassment/threatening` | Threatening harassment |
| `sexual` | Sexual content |
| `hate` | Hate speech |
| `hate/threatening` | Threatening hate speech |
| `illicit` | Illegal activity |
| `illicit/violent` | Violent illegal activity |
| `self-harm` | Self-harm content |
| `self-harm/intent` | Intent to self-harm |
| `self-harm/instructions` | Instructions for self-harm |
| `sexual/minors` | Sexual content involving minors |
| `violence` | Violent content |
| `violence/graphic` | Graphic violence |
