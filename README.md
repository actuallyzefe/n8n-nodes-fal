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

### Text to Image

- **Generate**: Generate images from text prompts using various AI models
  - Multiple models available with different strengths
  - Configurable aspect ratios and resolutions
  - Optional negative prompts for better control
  - Seed support for reproducible results
  - Batch generation support

### Text to Video

- **Generate**: Generate videos from text prompts using AI models
  - Multiple models with different capabilities
  - Various aspect ratios and resolutions
  - Duration options
  - Optional audio generation
  - Advanced prompt controls

### Image to Video

- **Generate Video**: Convert images to videos using AI models
  - Multiple models for different use cases
  - Single image animation
  - Multiple reference images support
  - First-last frame animation
  - Configurable aspect ratios, durations, and resolutions

### Text to Speech

- **Generate**: Convert text to speech using AI models
  - Multiple voice options
  - Language support
  - Adjustable speech parameters (stability, similarity, style, speed)
  - Optional timestamps

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
4. Choose your preferred model from the dropdown
5. Fill in:
   - **Prompt**: Your text description (e.g., "A beautiful sunset over mountains")
   - **Additional Options**: Configure aspect ratio, resolution, etc. based on the selected model

### Basic Video Generation from Text

1. Add the **Fal.ai** node to your workflow
2. Select **Text to Video** as the resource
3. Select **Generate** as the operation
4. Choose your preferred model from the dropdown
5. Fill in:
   - **Prompt**: Your video description (e.g., "A time-lapse of clouds moving over a city")
   - Configure duration, aspect ratio, and resolution options

### Basic Video Generation from Image

1. Add the **Fal.ai** node to your workflow
2. Select **Image to Video** as the resource
3. Select **Generate Video** as the operation
4. Choose your preferred model from the dropdown
5. Fill in:
   - **Image URL**: Publicly accessible image URL (or multiple URLs for reference models)
   - **Prompt**: Animation description (e.g., "Camera slowly pans from left to right")
   - Configure duration, aspect ratio, and resolution options

### Basic Text to Speech

1. Add the **Fal.ai** node to your workflow
2. Select **Text to Speech** as the resource
3. Select **Generate** as the operation
4. Choose your preferred model from the dropdown
5. Fill in:
   - **Text**: The text you want to convert to speech
   - **Voice**: Select from available voice options
   - **Language**: Choose the language
   - Configure additional speech parameters as needed

### Queue Processing

All operations use fal.ai's queue system for reliable async processing:

- Requests are submitted to a queue
- The node polls the queue status every 5 seconds
- Maximum wait time: 20 minutes (suitable for video generation)
- Status updates are logged for visibility

The node handles all queue management automatically - you don't need to worry about polling or checking status manually.

### Chaining Operations

You can chain multiple Fal.ai nodes together for complex workflows:

1. **Text to Image** → Generate an image from text
2. **HTTP Request** → Download/process the image if needed
3. **Image to Video** → Convert the generated image to video
4. **Text to Speech** → Add narration to your content

Example workflows:

- Text prompt → Image generation → Video animation
- Text → Speech generation → Combine with video
- Multiple images → Reference-based video generation

## Features

### Comprehensive AI Generation

- ✅ **Text to Image** - Generate images from text prompts with multiple models
- ✅ **Text to Video** - Create videos directly from text descriptions
- ✅ **Image to Video** - Animate static images into videos
- ✅ **Text to Speech** - Convert text to natural-sounding speech
- ✅ **Multiple models** - Choose the best model for your specific use case
- ✅ **Flexible parameters** - Aspect ratios, resolutions, durations, and more
- ✅ **Advanced controls** - Negative prompts, seeds, style parameters
- ✅ **Batch operations** - Generate multiple outputs in a single request
- ✅ **Reference-based generation** - Use multiple reference images for consistency

### Queue Management

- ✅ **Automatic polling** - No manual status checking required
- ✅ **Status tracking** - Real-time progress updates
- ✅ **Error handling** - Graceful failure management
- ✅ **Timeout protection** - Appropriate timeouts for long-running operations
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
