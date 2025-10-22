import type { INodeProperties } from 'n8n-workflow';
import { getModelOptions, TEXT_TO_VIDEO_MODEL_IDS } from './models';

const displayFor = {
	operation: ['generate'],
	resource: ['textToVideo'],
};

// Define which models show which fields
// Add new models here with their specific parameter requirements
const displayForSora2 = {
	...displayFor,
	model: [TEXT_TO_VIDEO_MODEL_IDS.SORA_2],
};

const displayForSora2Pro = {
	...displayFor,
	model: [TEXT_TO_VIDEO_MODEL_IDS.SORA_2_PRO],
};

export const textToVideoGenerateDescription: INodeProperties[] = [
	{
		displayName: 'Model',
		name: 'model',
		type: 'options',
		default: '',
		displayOptions: { show: displayFor },
		options: getModelOptions(),
		description: 'The AI model to use for text-to-video generation',
	},

	// ===== Common fields (shown for all models) =====
	{
		displayName: 'Prompt',
		name: 'prompt',
		type: 'string',
		displayOptions: { show: displayFor },
		default: '',
		required: true,
		typeOptions: {
			rows: 4,
		},
		description: 'Text prompt describing the video you want to generate',
		placeholder: 'A dramatic Hollywood breakup scene at dusk on a quiet suburban street...',
	},

	// ===== Sora 2 specific fields =====
	{
		displayName: 'Aspect Ratio',
		name: 'aspectRatio',
		type: 'options',
		displayOptions: { show: displayForSora2 },
		options: [
			{ name: '16:9 (Landscape)', value: '16:9' },
			{ name: '9:16 (Portrait)', value: '9:16' },
		],
		default: '16:9',
		description: 'The aspect ratio of the generated video',
	},
	{
		displayName: 'Duration',
		name: 'duration',
		type: 'options',
		displayOptions: { show: displayForSora2 },
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
		displayOptions: { show: displayForSora2 },
		options: [{ name: '720p', value: '720p' }],
		default: '720p',
		description: 'The resolution of the generated video',
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		displayOptions: { show: displayForSora2 },
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

	// ===== Sora 2 Pro specific fields =====
	{
		displayName: 'Aspect Ratio',
		name: 'aspectRatio',
		type: 'options',
		displayOptions: { show: displayForSora2Pro },
		options: [
			{ name: '16:9 (Landscape)', value: '16:9' },
			{ name: '9:16 (Portrait)', value: '9:16' },
		],
		default: '16:9',
		description: 'The aspect ratio of the generated video',
	},
	{
		displayName: 'Duration',
		name: 'duration',
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
			{ name: '720p', value: '720p' },
			{ name: '1080p', value: '1080p' },
		],
		default: '1080p',
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
