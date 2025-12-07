---
description: "Get token usage statistics for your account."
---

# Token Stats

Get token usage statistics for your account.

## Endpoint

```
GET /proxy/v1/stats
```

## Example Request

```bash
curl https://ai.hackclub.com/proxy/v1/stats \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Example Response

```json
{
  "totalRequests": 123456,
  "totalTokens": 7890,
  "totalPromptTokens": 1234,
  "totalCompletionTokens": 5678
}
```

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `totalRequests` | number | Total number of API requests made |
| `totalTokens` | number | Total tokens used (prompt + completion) |
| `totalPromptTokens` | number | Total tokens used in prompts |
| `totalCompletionTokens` | number | Total tokens generated in responses |
