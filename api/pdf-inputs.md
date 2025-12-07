---
description: "Send PDF documents to any model for analysis and summarization."
---

# PDF Inputs

Send PDF documents to any model for analysis and summarization.

## Supported Formats

- **URL**: Send publicly accessible PDFs directly without encoding (hint: [Bucky](https://bucky.hackclub.com) may be useful)
- **Base64**: Required for local files or private documents

When a model supports file input natively, the PDF is passed directly to the model. Otherwise, the PDF will get parsed and the parsed results will be passed to the model.

## PDF Processing Engines

Configure PDF processing using the `plugins` parameter:

| Engine | Description |
|--------|-------------|
| `pdf-text` | Best for well-structured PDFs |
| `mistral-ocr` | Best for scanned documents or PDFs with images |
| `native` | Uses model's built-in file processing **(highly recommended)** |

If you don't specify an engine, Hack Club AI defaults to the model's native capability first (which usually will be the best option), then falls back to `mistral-ocr`.

## Example: PDF via URL

```bash
curl https://ai.hackclub.com/proxy/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen/qwen3-32b",
    "messages": [
      {
        "role": "user",
        "content": [
          {"type": "text", "text": "What are the main points in this document?"},
          {
            "type": "file",
            "file": {
              "filename": "bitcoin.pdf",
              "file_data": "https://bitcoin.org/bitcoin.pdf"
            }
          }
        ]
      }
    ],
    "plugins": [
      {
        "id": "file-parser",
        "pdf": {"engine": "pdf-text"}
      }
    ]
  }'
```

## Example: Base64-encoded PDF

```python
import base64
import requests

def encode_pdf(path):
    with open(path, "rb") as f:
        return f"data:application/pdf;base64,{base64.b64encode(f.read()).decode()}"

response = requests.post(
    "https://ai.hackclub.com/proxy/v1/chat/completions",
    headers={
        "Authorization": "Bearer YOUR_API_KEY",
        "Content-Type": "application/json"
    },
    json={
        "model": "qwen/qwen3-32b",
        "messages": [{
            "role": "user",
            "content": [
                {"type": "text", "text": "Summarize this document"},
                {
                    "type": "file",
                    "file": {
                        "filename": "document.pdf",
                        "file_data": encode_pdf("path/to/document.pdf")
                    }
                }
            ]
        }],
        "plugins": [{"id": "file-parser", "pdf": {"engine": "mistral-ocr"}}]
    }
)
```

## Reusing File Annotations

When you send a PDF, the response may include annotations in the assistant message. Include these in subsequent requests to skip re-parsing and save costs:

```python
response = requests.post(url, headers=headers, json={...})
result = response.json()

annotations = result["choices"][0]["message"].get("annotations")

follow_up = requests.post(url, headers=headers, json={
    "model": "qwen/qwen3-32b",
    "messages": [
        {"role": "user", "content": [...]},  # Original message with PDF
        {
            "role": "assistant",
            "content": result["choices"][0]["message"]["content"],
            "annotations": annotations  # Include these to skip re-parsing!
        },
        {"role": "user", "content": "Can you elaborate on point 2?"}
    ]
})
```
