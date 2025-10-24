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

const displayForSeedanceV1ProFast = {
	...displayFor,
	model: [TEXT_TO_VIDEO_MODEL_IDS.SEEDANCE_V1_PRO_FAST],
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

	// ===== Seedance 1.0 Pro Fast specific fields =====
	{
		displayName: 'Aspect Ratio',
		name: 'aspectRatio',
		type: 'options',
		displayOptions: { show: displayForSeedanceV1ProFast },
		options: [
			{ name: '1:1 (Square)', value: '1:1' },
			{ name: '16:9 (Landscape)', value: '16:9' },
			{ name: '21:9 (Ultrawide)', value: '21:9' },
			{ name: '3:4 (Portrait)', value: '3:4' },
			{ name: '4:3 (Landscape)', value: '4:3' },
			{ name: '9:16 (Portrait)', value: '9:16' },
		],
		default: '16:9',
		description: 'The aspect ratio of the generated video',
	},
	{
		displayName: 'Duration',
		name: 'duration',
		type: 'options',
		displayOptions: { show: displayForSeedanceV1ProFast },
		options: [
			{ name: '3 Seconds', value: '3' },
			{ name: '4 Seconds', value: '4' },
			{ name: '5 Seconds', value: '5' },
			{ name: '6 Seconds', value: '6' },
			{ name: '7 Seconds', value: '7' },
			{ name: '8 Seconds', value: '8' },
			{ name: '9 Seconds', value: '9' },
			{ name: '10 Seconds', value: '10' },
			{ name: '11 Seconds', value: '11' },
			{ name: '12 Seconds', value: '12' },
		],
		default: '5',
		description: 'Duration of the generated video in seconds',
	},
	{
		displayName: 'Resolution',
		name: 'resolution',
		type: 'options',
		displayOptions: { show: displayForSeedanceV1ProFast },
		options: [
			{ name: '480p (Faster)', value: '480p' },
			{ name: '720p (Balanced)', value: '720p' },
			{ name: '1080p (Higher Quality)', value: '1080p' },
		],
		default: '1080p',
		description:
			'Video resolution - 480p for faster generation, 720p for balance, 1080p for higher quality',
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		displayOptions: { show: displayForSeedanceV1ProFast },
		default: {},
		placeholder: 'Add Option',
		options: [
			{
				displayName: 'Camera Fixed',
				name: 'camera_fixed',
				type: 'boolean',
				default: false,
				description: 'Whether to fix the camera position during video generation',
			},
			{
				displayName: 'Seed',
				name: 'seed',
				type: 'number',
				default: -1,
				description: 'Random seed to control video generation. Use -1 for random.',
				typeOptions: {
					numberPrecision: 0,
				},
			},
		],
	},

	// ===== To add a new model =====
	// 1. Add model config to models.ts
	// 2. Create displayFor{ModelName} constant at top of this file
	// 3. Add model-specific fields here with displayOptions: { show: displayFor{ModelName} }
	// 4. Update execute/{model}.ts to handle the new model's parameters
];
