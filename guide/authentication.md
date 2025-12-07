# Authentication

All API requests require authentication using an API key.

## Using Your API Key

Include your API key in the `Authorization` header as a Bearer token:

```
Authorization: Bearer YOUR_API_KEY
```

## Managing API Keys

- Create and manage keys from your [dashboard](https://ai.hackclub.com/dashboard) - give each key a descriptive name for easy identification (e.g. `CraftAI`)
- You can have up to **50 active API keys.**
- Never share your API keys or commit them to version control. It's your job to look after them!
- Never use your API keys in client-side code - attackers can steal them and use them to make requests on your behalf.

## Example Request

```bash
curl https://ai.hackclub.com/proxy/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen/qwen3-32b",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```
