---
description: "Extract text and structured content from images and PDF documents using OCR."
---

# OCR (Optical Character Recognition)

::: warning Closed Beta
This feature is currently in **closed beta**. Access is limited to approved users only. Contact support if you'd like to request access.
:::

Extract text and structured content from images and PDF documents. Powered by Mistral OCR, this endpoint can understand complex document elements including tables, mathematical expressions, and multi-column layouts.

## Endpoint

```
POST /proxy/v1/ocr
```

## Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `document` | object | Yes | The document to process (see Document Types below) |
| `model` | string | No | Model to use. Default: `mistral-ocr-latest` |
| `pages` | array/string | No | Specific pages to process (e.g., `[0, 1, 2]` or `"0-5"`) |
| `include_image_base64` | boolean | No | Include extracted images as base64 in response |
| `image_limit` | integer | No | Maximum number of images to extract |
| `image_min_size` | integer | No | Minimum height/width of images to extract |
| `table_format` | string | No | Table output format: `"markdown"`, `"html"`, or `null` |
| `extract_header` | boolean | No | Extract document headers separately |
| `extract_footer` | boolean | No | Extract document footers separately |

## Document Types

### Image URL
```json
{
  "document": {
    "type": "image_url",
    "image_url": "https://example.com/image.png"
  }
}
```

### Document URL (PDF)
```json
{
  "document": {
    "type": "document_url",
    "document_url": "https://example.com/document.pdf"
  }
}
```

### Base64 Encoded
```json
{
  "document": {
    "type": "base64",
    "data": "base64_encoded_content_here",
    "mime_type": "application/pdf"
  }
}
```

## Example Request

```bash
curl https://ai.hackclub.com/proxy/v1/ocr \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "document": {
      "type": "image_url",
      "image_url": "https://example.com/receipt.png"
    },
    "table_format": "markdown"
  }'
```

## Example Response

```json
{
  "model": "mistral-ocr-latest",
  "pages": [
    {
      "index": 0,
      "markdown": "# Invoice\n\nDate: 2024-01-15\n\n| Item | Quantity | Price |\n|------|----------|-------|\n| Widget | 5 | $10.00 |\n| Gadget | 2 | $25.00 |\n\n**Total: $100.00**",
      "images": [],
      "dimensions": {
        "width": 800,
        "height": 1200
      }
    }
  ]
}
```

## Features

- **Text Extraction**: Preserves document structure including headers, paragraphs, and lists
- **Table Recognition**: Outputs tables in Markdown or HTML format
- **Math Support**: Handles mathematical expressions and LaTeX formatting
- **Multi-language**: Supports thousands of scripts and languages
- **Image Extraction**: Optionally extract embedded images with bounding boxes

## Supported Formats

### Images
- PNG, JPEG/JPG, AVIF, WebP, and more

### Documents
- PDF, PPTX, DOCX, and more

## Limitations

- Maximum file size: 50 MB
- Maximum pages: 1000 per request
- Character formatting (bold, italic, underline) is not preserved
- Footnotes and superscript text are preserved
