---
description: Learn how to use Replicate models with the Hack Club AI API.
---

# Using Replicate Models

The Hack Club AI API allows you to easily integrate and use models hosted on [Replicate](https://replicate.com/). This guide will walk you through the steps to get started with Replicate models using the Hack Club AI API.

> [!NOTE]
> Replicate support is currently in **closed beta**. If you're interested in using Replicate models, reach out at [hey@mahadk.com](mailto:hey@mahadk.com)

## Finding Replicate Models

Take a look at [HCAI's model directory](https://ai.hackclub.com/replicate) to find models that suit your needs. Each model page contains important information such as input parameters, output format, and example usage.

## Making Requests

To use a Replicate model, you'll need to make a request to the Hack Club AI API's Replicate endpoint. Below are examples of how to do this.

::: code-group

```ts [JavaScript]
import Replicate from "replicate";
// Make sure REPLICATE_API_TOKEN is set to your Hack Club AI API key
const replicate = new Replicate({ baseUrl: "https://ai.hackclub.com/proxy/v1/replicate" });

const input = {
    voice: "William (Whispering)",
    prompt: "Poppin' bottles in the ice, like a blizzard.\nWhen we drink, we do it right, gettin' slizzered\nSippin' sizzurp in my ride (in my ride) like Three 6.\nNow I'm feelin' so fly like a G 6"
};

const output = await replicate.run("resemble-ai/chatterbox-pro", { input });

// To access the file URL:
console.log(output.url());
```

```bash [cURL]
curl --silent --show-error https://ai.hackclub.com/proxy/v1/replicate/models/minimax/speech-02-turbo/predictions \
 --request POST \
 --header "Authorization: Bearer $HACK_CLUB_AI_KEY" \
 --header "Content-Type: application/json" \
 --header "Prefer: wait" \
 --data @- <<'EOM'
{
 "input": {
      "text": "Speech-02-series is a Text-to-Audio and voice cloning technology that offers voice synthesis, emotional expression, and multilingual capabilities.\n\nThe HD version is optimized for high-fidelity applications like voiceovers and audiobooks. While the turbo one is designed for real-time applications with low latency.\n\nWhen using this model on Replicate, each character represents 1 token.",
      "emotion": "angry",
      "voice_id": "Deep_Voice_Man",
      "language_boost": "English",
      "english_normalization": true
 }
}
EOM
```

:::
