---
description: "Use Hack Club AI with Vercel AI SDK."
---

# Using with Vercel AI SDK

This guide will show you how to use Hack Club AI with the Vercel AI SDK.

## Installation

To use Hack Club AI with the Vercel AI SDK, you will need to install the SDK and configure it with your API key. Hack Club AI is OpenRouter compatible, so we'll use the OpenRouter provider and change the base URL.

```sh
npm install @openrouter/ai-sdk-provider ai // [!=npm auto]
```

## Usage

First, create a provider instance:

```ts
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { generateText } from 'ai';

const hackclub = createOpenRouter({
  apiKey: process.env.HACK_CLUB_AI_API_KEY,
  baseUrl: 'https://ai.hackclub.com/proxy/v1',
});
```

Then, use it like any other AI SDK provider:

```ts
const { text } = await generateText({
    model: hackclub('qwen/qwen3-32b'),
    system: 'You are a helpful assistant.',
    prompt: "What is the capital of Peru?",
});

console.log(text);
```

## Next Steps

To learn more about the Vercel AI SDK, see the [Vercel AI SDK documentation](https://ai-sdk.dev/docs/ai-sdk-core/overview).