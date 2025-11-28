/**
 * Image to Video Models Configuration
 *
 * Add new models here - just provide:
 * 1. A unique key for n8n (can be anything, used in UI)
 * 2. The actual fal.ai model ID
 * 3. Display name and description
 *
 * Each model can have completely different parameters - define them in description.ts
 */

export interface ModelConfig {
	id: string; // Unique identifier for n8n (used in UI selection)
	modelId: string; // Actual fal.ai model ID (from fal.ai documentation)
	displayName: string; // Display name in n8n UI
	description: string; // Short description for users
}

export const IMAGE_TO_VIDEO_MODEL_IDS = {
	VEO_2: 'veo-2',
	KLING_V1_6_PRO: 'kling-v1-6-pro',
	SORA_2_PRO: 'sora-2-pro',
	SORA_2: 'sora-2',
	SEEDANCE_V1_PRO_FAST: 'seedance-v1-pro-fast',
	VEO_3_1_REFERENCE_TO_VIDEO: 'veo-3-1-reference-to-video',
	VEO_3_1_FAST_FIRST_LAST_FRAME: 'veo-3-1-fast-first-last-frame',
	VEO_3_1_FIRST_LAST_FRAME: 'veo-3-1-first-last-frame',
	VEO_3_1_IMAGE_TO_VIDEO: 'veo-3-1-image-to-video',
	VEO_3_1_FAST_IMAGE_TO_VIDEO: 'veo-3-1-fast-image-to-video',
} as const;

/**
 * Type for all valid image-to-video model IDs
 */
export type ImageToVideoModelId =
	(typeof IMAGE_TO_VIDEO_MODEL_IDS)[keyof typeof IMAGE_TO_VIDEO_MODEL_IDS];

/**
 * Available Image-to-Video Models
 * Add new models as they become available
 */
export const IMAGE_TO_VIDEO_MODELS: Record<ImageToVideoModelId, ModelConfig> = {
	[IMAGE_TO_VIDEO_MODEL_IDS.VEO_2]: {
		id: IMAGE_TO_VIDEO_MODEL_IDS.VEO_2,
		modelId: 'fal-ai/veo2/image-to-video',
		displayName: 'Veo 2',
		description: "Google's Veo 2 model for high-quality video generation",
	},
	[IMAGE_TO_VIDEO_MODEL_IDS.KLING_V1_6_PRO]: {
		id: IMAGE_TO_VIDEO_MODEL_IDS.KLING_V1_6_PRO,
		modelId: 'fal-ai/kling-video/v1.6/pro/image-to-video',
		displayName: 'Kling Video v1.6 Pro',
		description: 'Kling v1.6 Pro model for advanced video generation',
	},
	[IMAGE_TO_VIDEO_MODEL_IDS.SORA_2_PRO]: {
		id: IMAGE_TO_VIDEO_MODEL_IDS.SORA_2_PRO,
		modelId: 'fal-ai/sora-2/image-to-video/pro',
		displayName: 'OpenAI Sora 2 Pro',
		description:
			'Generate high-quality videos from images with 1080p resolution using OpenAI Sora 2 Pro',
	},
	[IMAGE_TO_VIDEO_MODEL_IDS.SORA_2]: {
		id: IMAGE_TO_VIDEO_MODEL_IDS.SORA_2,
		modelId: 'fal-ai/sora-2/image-to-video',
		displayName: 'OpenAI Sora 2',
		description: 'Generate videos from images using OpenAI Sora 2',
	},
	[IMAGE_TO_VIDEO_MODEL_IDS.SEEDANCE_V1_PRO_FAST]: {
		id: IMAGE_TO_VIDEO_MODEL_IDS.SEEDANCE_V1_PRO_FAST,
		modelId: 'fal-ai/bytedance/seedance/v1/pro/fast/image-to-video',
		displayName: 'Seedance 1.0 Pro Fast',
		description:
			'Fast and efficient image-to-video by Bytedance. Supports auto aspect ratio detection and up to 12 seconds.',
	},
	[IMAGE_TO_VIDEO_MODEL_IDS.VEO_3_1_REFERENCE_TO_VIDEO]: {
		id: IMAGE_TO_VIDEO_MODEL_IDS.VEO_3_1_REFERENCE_TO_VIDEO,
		modelId: 'fal-ai/veo3.1/reference-to-video',
		displayName: 'Veo 3.1 Reference to Video',
		description:
			"Generate videos from reference images using Google's Veo 3.1 model with consistent subject appearance",
	},
	[IMAGE_TO_VIDEO_MODEL_IDS.VEO_3_1_FAST_FIRST_LAST_FRAME]: {
		id: IMAGE_TO_VIDEO_MODEL_IDS.VEO_3_1_FAST_FIRST_LAST_FRAME,
		modelId: 'fal-ai/veo3.1/fast/first-last-frame-to-video',
		displayName: 'Veo 3.1 First-Last Frame Fast',
		description:
			"Animate between first and last frames using Google's Veo 3.1 Fast model with 720p/1080p resolution",
	},
	[IMAGE_TO_VIDEO_MODEL_IDS.VEO_3_1_FIRST_LAST_FRAME]: {
		id: IMAGE_TO_VIDEO_MODEL_IDS.VEO_3_1_FIRST_LAST_FRAME,
		modelId: 'fal-ai/veo3.1/first-last-frame-to-video',
		displayName: 'Veo 3.1 First-Last Frame',
		description:
			"Animate between first and last frames using Google's Veo 3.1 model with 720p/1080p resolution",
	},
	[IMAGE_TO_VIDEO_MODEL_IDS.VEO_3_1_IMAGE_TO_VIDEO]: {
		id: IMAGE_TO_VIDEO_MODEL_IDS.VEO_3_1_IMAGE_TO_VIDEO,
		modelId: 'fal-ai/veo3.1/image-to-video',
		displayName: 'Veo 3.1 Image to Video',
		description: "Animate a single image using Google's Veo 3.1 model with 720p/1080p resolution",
	},
	[IMAGE_TO_VIDEO_MODEL_IDS.VEO_3_1_FAST_IMAGE_TO_VIDEO]: {
		id: IMAGE_TO_VIDEO_MODEL_IDS.VEO_3_1_FAST_IMAGE_TO_VIDEO,
		modelId: 'fal-ai/veo3.1/fast/image-to-video',
		displayName: 'Veo 3.1 Image to Video Fast',
		description:
			"Animate a single image using Google's Veo 3.1 Fast model with 720p/1080p resolution",
	},
};

/**
 * Get model configuration by ID
 */
export function getModelConfig(modelId: ImageToVideoModelId): ModelConfig {
	return IMAGE_TO_VIDEO_MODELS[modelId];
}

/**
 * Get all available models as options for n8n UI dropdown
 */
export function getModelOptions() {
	return Object.values(IMAGE_TO_VIDEO_MODELS).map((config) => ({
		name: config.displayName,
		value: config.id,
		description: config.description,
	}));
}
