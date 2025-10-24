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

const displayForSeedanceV1ProFast = {
	...displayFor,
	model: [IMAGE_TO_VIDEO_MODEL_IDS.SEEDANCE_V1_PRO_FAST],
};

const displayForVeo31ReferenceToVideo = {
	...displayFor,
	model: [IMAGE_TO_VIDEO_MODEL_IDS.VEO_3_1_REFERENCE_TO_VIDEO],
};

const displayForVeo31FastFirstLastFrame = {
	...displayFor,
	model: [
		IMAGE_TO_VIDEO_MODEL_IDS.VEO_3_1_FAST_FIRST_LAST_FRAME,
		IMAGE_TO_VIDEO_MODEL_IDS.VEO_3_1_FIRST_LAST_FRAME,
	],
};

const displayForVeo31ImageToVideo = {
	...displayFor,
	model: [
		IMAGE_TO_VIDEO_MODEL_IDS.VEO_3_1_IMAGE_TO_VIDEO,
		IMAGE_TO_VIDEO_MODEL_IDS.VEO_3_1_FAST_IMAGE_TO_VIDEO,
	],
};

// Display for all models except Veo 3.1 (which uses multiple images)
const displayForSingleImage = {
	operation: ['generateVideo'],
	resource: ['imageToVideo'],
	model: [
		IMAGE_TO_VIDEO_MODEL_IDS.VEO_2,
		IMAGE_TO_VIDEO_MODEL_IDS.KLING_V1_6_PRO,
		IMAGE_TO_VIDEO_MODEL_IDS.SORA_2_PRO,
		IMAGE_TO_VIDEO_MODEL_IDS.SEEDANCE_V1_PRO_FAST,
		IMAGE_TO_VIDEO_MODEL_IDS.VEO_3_1_IMAGE_TO_VIDEO,
		IMAGE_TO_VIDEO_MODEL_IDS.VEO_3_1_FAST_IMAGE_TO_VIDEO,
	],
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
		displayOptions: { show: displayForSingleImage },
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
			{ name: 'Auto (Keep Original)', value: 'auto' },
		],
		default: 'auto',
		description:
			'The aspect ratio of the generated video. Use "auto" to keep the original image aspect ratio.',
	},
	{
		displayName: 'Duration',
		name: 'durationSeedance',
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

	// ===== Veo 3.1 Reference-to-Video specific fields =====
	{
		displayName: 'Image URLs',
		name: 'imageUrls',
		type: 'string',
		displayOptions: { show: displayForVeo31ReferenceToVideo },
		default: '',
		required: true,
		typeOptions: {
			rows: 4,
		},
		description:
			'URLs of the reference images (up to 8MB each). Enter one URL per line. These images will be used for consistent subject appearance.',
		placeholder:
			'https://example.com/image1.jpg\nhttps://example.com/image2.jpg\nhttps://example.com/image3.jpg',
	},
	{
		displayName: 'Duration',
		name: 'durationVeo31',
		type: 'options',
		displayOptions: { show: displayForVeo31ReferenceToVideo },
		options: [{ name: '8 Seconds', value: '8s' }],
		default: '8s',
		description: 'Duration of the generated video',
	},
	{
		displayName: 'Resolution',
		name: 'resolution',
		type: 'options',
		displayOptions: { show: displayForVeo31ReferenceToVideo },
		options: [
			{ name: '720p', value: '720p' },
			{ name: '1080p', value: '1080p' },
		],
		default: '720p',
		description: 'Resolution of the generated video',
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		displayOptions: { show: displayForVeo31ReferenceToVideo },
		default: {},
		placeholder: 'Add Option',
		options: [
			{
				displayName: 'Generate Audio',
				name: 'generate_audio',
				type: 'boolean',
				default: true,
				description:
					'Whether to generate audio for the video. If false, 33% less credits will be used.',
			},
		],
	},

	// ===== Veo 3.1 Fast First-Last Frame specific fields =====
	{
		displayName: 'First Frame URL',
		name: 'firstFrameUrl',
		type: 'string',
		displayOptions: { show: displayForVeo31FastFirstLastFrame },
		default: '',
		required: true,
		description: 'URL of the first frame image (up to 8MB)',
		placeholder: 'https://example.com/first-frame.jpg',
	},
	{
		displayName: 'Last Frame URL',
		name: 'lastFrameUrl',
		type: 'string',
		displayOptions: { show: displayForVeo31FastFirstLastFrame },
		default: '',
		required: true,
		description: 'URL of the last frame image (up to 8MB)',
		placeholder: 'https://example.com/last-frame.jpg',
	},
	{
		displayName: 'Aspect Ratio',
		name: 'aspectRatio',
		type: 'options',
		displayOptions: { show: displayForVeo31FastFirstLastFrame },
		options: [
			{ name: '1:1 (Square)', value: '1:1' },
			{ name: '16:9 (Landscape)', value: '16:9' },
			{ name: '9:16 (Portrait)', value: '9:16' },
			{ name: 'Auto', value: 'auto' },
		],
		default: 'auto',
		description: 'Aspect ratio of the generated video',
	},
	{
		displayName: 'Duration',
		name: 'durationVeo31Fast',
		type: 'options',
		displayOptions: { show: displayForVeo31FastFirstLastFrame },
		options: [{ name: '8 Seconds', value: '8s' }],
		default: '8s',
		description: 'Duration of the generated video',
	},
	{
		displayName: 'Resolution',
		name: 'resolution',
		type: 'options',
		displayOptions: { show: displayForVeo31FastFirstLastFrame },
		options: [
			{ name: '720p', value: '720p' },
			{ name: '1080p', value: '1080p' },
		],
		default: '720p',
		description: 'Resolution of the generated video',
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		displayOptions: { show: displayForVeo31FastFirstLastFrame },
		default: {},
		placeholder: 'Add Option',
		options: [
			{
				displayName: 'Generate Audio',
				name: 'generate_audio',
				type: 'boolean',
				default: true,
				description:
					'Whether to generate audio for the video. If false, 33% less credits will be used.',
			},
		],
	},

	// ===== Veo 3.1 Image-to-Video specific fields =====
	{
		displayName: 'Aspect Ratio',
		name: 'aspectRatio',
		type: 'options',
		displayOptions: { show: displayForVeo31ImageToVideo },
		options: [
			{ name: '16:9 (Landscape)', value: '16:9' },
			{ name: '9:16 (Portrait)', value: '9:16' },
		],
		default: '16:9',
		description:
			'The aspect ratio of the generated video. Only 16:9 and 9:16 are supported. If the input image is not in this aspect ratio, it will be cropped to fit.',
	},
	{
		displayName: 'Duration',
		name: 'durationVeo31ImageToVideo',
		type: 'options',
		displayOptions: { show: displayForVeo31ImageToVideo },
		options: [{ name: '8 Seconds', value: '8s' }],
		default: '8s',
		description: 'Duration of the generated video',
	},
	{
		displayName: 'Resolution',
		name: 'resolution',
		type: 'options',
		displayOptions: { show: displayForVeo31ImageToVideo },
		options: [
			{ name: '720p', value: '720p' },
			{ name: '1080p', value: '1080p' },
		],
		default: '720p',
		description: 'Resolution of the generated video',
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		displayOptions: { show: displayForVeo31ImageToVideo },
		default: {},
		placeholder: 'Add Option',
		options: [
			{
				displayName: 'Generate Audio',
				name: 'generate_audio',
				type: 'boolean',
				default: true,
				description:
					'Whether to generate audio for the video. If false, 33% less credits will be used.',
			},
		],
	},

	// ===== To add a new model =====
	// 1. Add model config to models.ts
	// 2. Create displayFor{ModelName} constant at top of this file
	// 3. Add model-specific fields here with displayOptions: { show: displayFor{ModelName} }
	// 4. Update execute/{model}.ts to handle the new model's parameters
];
