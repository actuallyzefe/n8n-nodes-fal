import type { INodeProperties } from 'n8n-workflow';
import { getModelOptions, TEXT_TO_IMAGE_MODEL_IDS } from './models';

const displayFor = {
	operation: ['generate'],
	resource: ['textToImage'],
};

// Define which models show which fields
const displayForNanoBanana = {
	...displayFor,
	model: [TEXT_TO_IMAGE_MODEL_IDS.NANO_BANANA],
};

const displayForImagen4 = {
	...displayFor,
	model: [TEXT_TO_IMAGE_MODEL_IDS.IMAGEN_4],
};

const displayForNanoBanana2 = {
	...displayFor,
	model: [TEXT_TO_IMAGE_MODEL_IDS.NANO_BANANA_2],
};

export const textToImageGenerateDescription: INodeProperties[] = [
	{
		displayName: 'Model',
		name: 'model',
		type: 'options',
		default: '',
		displayOptions: { show: displayFor },
		options: getModelOptions(),
		description: 'The AI model to use for image generation',
	},
	{
		displayName: 'Prompt',
		name: 'prompt',
		type: 'string',
		displayOptions: { show: displayFor },
		default: '',
		required: true,
		description: 'Text prompt describing what you want to see',
		placeholder: 'A beautiful sunset over mountains',
	},
	{
		displayName: 'Number of Images',
		name: 'numImages',
		type: 'number',
		displayOptions: { show: displayFor },
		default: 1,
		description: 'Number of images to generate (1-4)',
		typeOptions: {
			minValue: 1,
			maxValue: 4,
		},
	},
	// Imagen 4 specific fields
	{
		displayName: 'Aspect Ratio',
		name: 'aspectRatio',
		type: 'options',
		displayOptions: { show: displayForImagen4 },
		options: [
			{ name: '1:1 (Square)', value: '1:1' },
			{ name: '16:9 (Landscape)', value: '16:9' },
			{ name: '3:4 (Portrait)', value: '3:4' },
			{ name: '4:3 (Landscape)', value: '4:3' },
			{ name: '9:16 (Portrait)', value: '9:16' },
		],
		default: '1:1',
		description: 'The aspect ratio of the generated image',
	},
	{
		displayName: 'Resolution',
		name: 'resolution',
		type: 'options',
		displayOptions: { show: displayForImagen4 },
		options: [
			{ name: '1K', value: '1K' },
			{ name: '2K', value: '2K' },
		],
		default: '1K',
		description: 'Output resolution quality',
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		displayOptions: { show: displayForImagen4 },
		default: {},
		placeholder: 'Add Option',
		options: [
			{
				displayName: 'Negative Prompt',
				name: 'negativePrompt',
				type: 'string',
				default: '',
				description: 'What to discourage in the generated images',
				placeholder: 'blurry, low quality, distorted',
			},
			{
				displayName: 'Seed',
				name: 'seed',
				type: 'number',
				default: undefined,
				description: 'Random seed for reproducible generation (optional)',
			},
		],
	},
	// Nano Banana specific options
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		displayOptions: { show: displayForNanoBanana },
		default: {},
		placeholder: 'Add Option',
		options: [
			{
				displayName: 'Enable Safety Checker',
				name: 'enableSafetyChecker',
				type: 'boolean',
				default: true,
				description: 'Whether to check generated images for NSFW content',
			},
		],
	},
	// Nano Banana 2 specific fields
	{
		displayName: 'Aspect Ratio',
		name: 'aspectRatioNanoBanana2',
		type: 'options',
		displayOptions: { show: displayForNanoBanana2 },
		options: [
			{ name: '1:1 (Square)', value: '1:1' },
			{ name: '16:9', value: '16:9' },
			{ name: '2:3', value: '2:3' },
			{ name: '21:9', value: '21:9' },
			{ name: '3:2', value: '3:2' },
			{ name: '3:4', value: '3:4' },
			{ name: '4:3', value: '4:3' },
			{ name: '4:5', value: '4:5' },
			{ name: '5:4', value: '5:4' },
			{ name: '9:16', value: '9:16' },
		],
		default: '1:1',
		description: 'The aspect ratio of the generated image',
	},
	{
		displayName: 'Resolution',
		name: 'resolutionNanoBanana2',
		type: 'options',
		displayOptions: { show: displayForNanoBanana2 },
		options: [
			{ name: '1K', value: '1K' },
			{ name: '2K', value: '2K' },
			{ name: '4K', value: '4K' },
		],
		default: '1K',
		description: 'The resolution of the image to generate',
	},
	{
		displayName: 'Output Format',
		name: 'outputFormatNanoBanana2',
		type: 'options',
		displayOptions: { show: displayForNanoBanana2 },
		options: [
			{ name: 'JPEG', value: 'jpeg' },
			{ name: 'PNG', value: 'png' },
			{ name: 'WebP', value: 'webp' },
		],
		default: 'png',
		description: 'The format of the generated image',
	},
	{
		displayName: 'Sync Mode',
		name: 'syncModeNanoBanana2',
		type: 'boolean',
		displayOptions: { show: displayForNanoBanana2 },
		default: false,
		description: 'Whether the media will be returned as a data URI. If true, the output data won\'t be available in the request history.',
	},
];
