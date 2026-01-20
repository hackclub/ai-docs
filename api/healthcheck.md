---
description: "Check if Hack Club AI is working and ready to serve requests."
---

# Healthcheck

Check if Hack Club AI is working and ready to serve requests.

## Endpoint

```
GET /up
```

### Example Request

```bash
curl https://ai.hackclub.com/up
```

### Response Format

```json
{
  "status": "up",
  "balanceRemaining": 100.444598325,
  "dailyKeyUsageRemaining": 4.944634734,
  "timestamp": 1768952604456
}
```

| Field Name | Description |
|------------|-------------|
| `status` | `up` or `down`. |
| `balanceRemaining` | How much balance is remaining in HCAI's OpenRouter account. |
| `dailyKeyUsageRemaining` | How much balance is remaining **for today** in HCAI's OpenRouter account. Subject to change. |
| `timestamp` | When the uptime result was generated - results may be up to 30 seconds old. |
