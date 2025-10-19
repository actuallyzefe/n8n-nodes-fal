# n8n-nodes-fal

![fal.ai](https://fal.ai/favicon.ico)

This is an n8n community node that lets you integrate fal.ai AI model APIs into your n8n workflows.

fal.ai is a platform for running AI models with fast inference, supporting text-to-image, image-to-video, and other generative AI capabilities.

n8n is a fair-code licensed workflow automation platform.

## Installation

Follow the installation guide in the n8n community nodes documentation.

### Install via n8n UI

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-fal` in **Enter npm package name**
4. Agree to the risks of using community nodes
5. Select **Install**

### Manual Installation

To get started install the package in your n8n root directory:

```bash
npm install n8n-nodes-fal
```

## Operations

### Text to Image Resource (2 models)

- **Generate**: Generate images from text prompts using AI models
  - **Nano Banana**: Gemini-based fast image generation
    - Supports multiple image generation (1-4 images)
    - Optional safety checker
    - Fast generation times
  - **Imagen 4**: Google's Imagen 4 for high-quality generation
    - Multiple aspect ratios (1:1, 16:9, 9:16, 3:4, 4:3)
    - Resolution options (1K, 2K)
    - Negative prompts for better control
    - Reproducible generation with seed support

### Image to Video Resource (2 models)

- **Generate Video**: Convert images to videos using AI models
  - **Veo 2**: Google's Veo 2 model for high-quality video generation
    - Configurable aspect ratios (auto, 16:9, 9:16, auto prefer portrait)
    - Duration options: 5s, 6s, 7s, 8s
  - **Kling Video v1.6 Pro**: Advanced video generation with extended options
    - Multiple aspect ratios (16:9, 9:16, 1:1, 4:3, 3:4, 21:9, 9:21)
    - Duration: 5s or 10s
    - Negative prompts
    - CFG scale control

## Credentials

To use this node, you'll need a fal.ai API key:

1. Sign up for a free account at [fal.ai](https://fal.ai/)
2. Navigate to your [API Keys dashboard](https://fal.ai/dashboard/keys)
3. Create a new API key or use an existing one
4. Copy the API key (format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

### Setting up credentials in n8n

1. Open your n8n instance
2. Go to **Credentials** → **New**
3. Search for **Fal.ai API**
4. Enter your API Key
5. Click **Create**

The credentials will be automatically tested by making a request to the fal.ai API.

## Usage

### Basic Image Generation

1. Add the **Fal.ai** node to your workflow
2. Select **Text to Image** as the resource
3. Select **Generate** as the operation
4. Choose your model:
   - **Nano Banana** for fast generation
   - **Imagen 4** for high-quality results
5. Fill in:
   - **Prompt**: Your text description (e.g., "A beautiful sunset over mountains")
   - **Model**: Choose between Nano Banana or Imagen 4
   - **Additional Options**: Configure aspect ratio, resolution, etc.

### Basic Video Generation

1. Add the **Fal.ai** node to your workflow
2. Select **Image to Video** as the resource
3. Select **Generate Video** as the operation
4. Choose your model:
   - **Veo 2** for Google's latest model
   - **Kling Video v1.6 Pro** for advanced options
5. Fill in:
   - **Image URL**: Publicly accessible image URL
   - **Prompt**: Animation description (e.g., "Camera slowly pans from left to right")
   - **Duration**: Choose video length
   - **Aspect Ratio**: Select appropriate ratio

### Queue Processing

All operations use fal.ai's queue system for reliable async processing:

- Requests are submitted to a queue
- The node polls the queue status every 5 seconds
- Maximum wait time: 20 minutes (suitable for video generation)
- Status updates are logged for visibility

The node handles all queue management automatically - you don't need to worry about polling or checking status manually.

### Chaining Operations

You can chain multiple Fal.ai nodes together:

1. **Text to Image** → Generate an image from text
2. **HTTP Request** → Download the image if needed
3. **Image to Video** → Convert the generated image to video

Example workflow: Text prompt → Image generation → Video animation

## Features

### Text to Image Operations

- ✅ **Generate images** from text prompts using AI models
- ✅ **Multiple models** - Nano Banana (fast) and Imagen 4 (high-quality)
- ✅ **Aspect ratio control** - 1:1, 16:9, 9:16, 3:4, 4:3
- ✅ **Resolution options** - 1K and 2K for Imagen 4
- ✅ **Negative prompts** for better control
- ✅ **Seed support** for reproducible results
- ✅ **Batch generation** - Generate 1-4 images at once
- ✅ **Safety checker** - Optional content filtering

### Image to Video Operations

- ✅ **Generate videos** from images using AI models
- ✅ **Multiple models** - Veo 2 and Kling Video v1.6 Pro
- ✅ **Duration control** - 5s, 6s, 7s, 8s, or 10s
- ✅ **Aspect ratio options** - Multiple ratios including 21:9
- ✅ **Animation prompts** - Describe desired motion
- ✅ **CFG scale control** - Fine-tune prompt adherence
- ✅ **Negative prompts** - Avoid unwanted elements
- ✅ **Queue-based processing** - Reliable async generation

### Queue Management

- ✅ **Automatic polling** - No manual status checking required
- ✅ **Status tracking** - Real-time progress updates
- ✅ **Error handling** - Graceful failure management
- ✅ **Timeout protection** - 20-minute maximum wait time
- ✅ **Retry logic** - Built-in retry mechanisms

## Rate Limits

fal.ai uses a credit-based pricing system with the following characteristics:

- **Free tier**: Available for testing and development
- **Credits**: Purchase credits based on your usage
- **Pricing**: Varies by model and complexity
- **Queue system**: Ensures reliable processing during high load
- **Failed requests**: Can be retried using n8n's built-in error handling

For detailed pricing information, visit:

- [fal.ai Pricing](https://fal.ai/pricing)
- [Model-specific pricing](https://fal.ai/models)

## API Documentation

For more details about the fal.ai API:

- [fal.ai Documentation](https://docs.fal.ai/)
- [Queue API Guide](https://docs.fal.ai/model-apis/model-endpoints/queue)
- [Model Gallery](https://fal.ai/models)

## Resources

- n8n community nodes documentation
- [fal.ai Documentation](https://docs.fal.ai/)
- [GitHub Repository](https://github.com/actuallyzefe/n8n-nodes-fal)

## Version History

### 0.1.0

- Initial release

## Development

```bash
# Install dependencies
npm install

# Build the node
npm run build

# Run in development mode
npm run dev

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues, questions, or contributions, please visit the GitHub repository.

## About

A community node for fal.ai

### Resources

Readme

### License

MIT license
