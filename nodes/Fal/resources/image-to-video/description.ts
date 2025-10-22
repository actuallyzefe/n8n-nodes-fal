import type { INodeProperties } from 'n8n-workflow';
import { getModelOptions, IMAGE_TO_VIDEO_MODEL_IDS } from './models';

const displayFor = {
	operation: ['generateVideo'],
	resource: ['imageToVideo'],
};

// Define which models show which fields
// Add new models here with their specific parameter requirements
const displayForVeo2 = {
	...displayFor,
	model: [IMAGE_TO_VIDEO_MODEL_IDS.VEO_2],
};

const displayForKlingV16Pro = {
	...displayFor,
	model: [IMAGE_TO_VIDEO_MODEL_IDS.KLING_V1_6_PRO],
};

const displayForSora2Pro = {
	...displayFor,
	model: [IMAGE_TO_VIDEO_MODEL_IDS.SORA_2_PRO],
};

export const imageToVideoGenerateDescription: INodeProperties[] = [
	{
		displayName: 'Model',
		name: 'model',
		type: 'options',
		default: '',
		displayOptions: { show: displayFor },
		options: getModelOptions(),
		description: 'The AI model to use for video generation',
	},

	// ===== Common fields (shown for all models) =====
	{
		displayName: 'Prompt',
		name: 'prompt',
		type: 'string',
		displayOptions: { show: displayFor },
		default: '',
		required: true,
		description: 'Text describing how the image should be animated or the desired motion',
		placeholder: 'Camera pans slowly to the right',
	},
	{
		displayName: 'Image URL',
		name: 'imageUrl',
		type: 'string',
		displayOptions: { show: displayFor },
		default: '',
		required: true,
		description: 'URL of the input image (should be 720p or higher)',
		placeholder: 'https://example.com/image.jpg',
	},

	// ===== Veo 2 specific fields =====
	{
		displayName: 'Aspect Ratio',
		name: 'aspectRatio',
		type: 'options',
		displayOptions: { show: displayForVeo2 },
		options: [
			{ name: 'Auto', value: 'auto' },
			{ name: 'Auto (Prefer Portrait)', value: 'auto_prefer_portrait' },
			{ name: '16:9', value: '16:9' },
			{ name: '9:16', value: '9:16' },
		],
		default: 'auto',
		description: 'Aspect ratio for the generated video',
	},
	{
		displayName: 'Duration',
		name: 'durationVeo',
		type: 'options',
		displayOptions: { show: displayForVeo2 },
		options: [
			{ name: '5 Seconds', value: '5s' },
			{ name: '6 Seconds', value: '6s' },
			{ name: '7 Seconds', value: '7s' },
			{ name: '8 Seconds', value: '8s' },
		],
		default: '5s',
		description: 'Duration of the generated video',
	},

	// ===== Kling v1.6 Pro specific fields =====
	{
		displayName: 'Duration',
		name: 'durationKling',
		type: 'options',
		displayOptions: { show: displayForKlingV16Pro },
		options: [
			{ name: '5 Seconds', value: '5' },
			{ name: '10 Seconds', value: '10' },
		],
		default: '5',
		description: 'Duration of the generated video in seconds',
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		displayOptions: { show: displayForKlingV16Pro },
		default: {},
		placeholder: 'Add Option',
		options: [
			{
				displayName: 'Aspect Ratio',
				name: 'aspectRatio',
				type: 'options',
				options: [
					{ name: '1:1', value: '1:1' },
					{ name: '16:9', value: '16:9' },
					{ name: '21:9', value: '21:9' },
					{ name: '3:4', value: '3:4' },
					{ name: '4:3', value: '4:3' },
					{ name: '9:16', value: '9:16' },
					{ name: '9:21', value: '9:21' },
				],
				default: '16:9',
				description: 'Aspect ratio for the generated video',
			},
			{
				displayName: 'Negative Prompt',
				name: 'negativePrompt',
				type: 'string',
				default: '',
				description: 'Elements to avoid in the generated video',
				placeholder: 'blurry, distorted',
			},
			{
				displayName: 'CFG Scale',
				name: 'cfgScale',
				type: 'number',
				default: 0.5,
				description: 'Classifier Free Guidance scale (0.0-1.0)',
				typeOptions: {
					minValue: 0,
					maxValue: 1,
					numberPrecision: 1,
				},
			},
		],
	},

	// ===== Sora 2 Pro specific fields =====
	{
		displayName: 'Aspect Ratio',
		name: 'aspectRatio',
		type: 'options',
		displayOptions: { show: displayForSora2Pro },
		options: [
			{ name: 'Auto', value: 'auto' },
			{ name: '16:9 (Landscape)', value: '16:9' },
			{ name: '9:16 (Portrait)', value: '9:16' },
		],
		default: 'auto',
		description: 'Aspect ratio for the generated video',
	},
	{
		displayName: 'Duration',
		name: 'durationSora',
		type: 'options',
		displayOptions: { show: displayForSora2Pro },
		options: [
			{ name: '4 Seconds', value: '4' },
			{ name: '8 Seconds', value: '8' },
			{ name: '12 Seconds', value: '12' },
		],
		default: '4',
		description: 'Duration of the generated video in seconds',
	},
	{
		displayName: 'Resolution',
		name: 'resolution',
		type: 'options',
		displayOptions: { show: displayForSora2Pro },
		options: [
			{ name: 'Auto', value: 'auto' },
			{ name: '720p', value: '720p' },
			{ name: '1080p', value: '1080p' },
		],
		default: 'auto',
		description: 'The resolution of the generated video',
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		displayOptions: { show: displayForSora2Pro },
		default: {},
		placeholder: 'Add Option',
		options: [
			{
				displayName: 'API Key',
				name: 'api_key',
				type: 'string',
				default: '',
				typeOptions: {
					password: true,
				},
				description:
					'OpenAI API key to use. If provided, you will not be billed by fal.ai for the request.',
			},
		],
	},

	// ===== To add a new model =====
	// 1. Add model config to models.ts
	// 2. Create displayFor{ModelName} constant at top of this file
	// 3. Add model-specific fields here with displayOptions: { show: displayFor{ModelName} }
	// 4. Update execute/{model}.ts to handle the new model's parameters
];
