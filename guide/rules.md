# Rules & Rate Limiting

## Rules

1. **For teens.** This service is for teens 18 and under only. Hack Club is a charity — please do not abuse this service.

2. **No coding agents.** You are not allowed to use this service with coding agents like Cursor.

3. **No proxies.** You are not allowed to use this service to create proxies or other tools that allow others to access the API without them also abiding by these rules.

4. **No resale.** You are not allowed to resell this service or use it to create a service that resells AI to others.

5. **Follow the Code of Conduct.** You are not allowed to use this service to create tools that intentionally violate the [Code of Conduct](https://hackclub.com/conduct). Don't try to generate explicit imagery or text, malware, or other harmful content.

## Rate Limiting

Rate limits are applied per user:

| Endpoint | Limit |
|----------|-------|
| Chat completions & Embeddings | 150 requests per 30 minutes |
| Moderations | 300 requests per minute |

When you exceed a rate limit, the API will return a `429 Too Many Requests` response. Wait for the rate limit window to reset before making additional requests.
