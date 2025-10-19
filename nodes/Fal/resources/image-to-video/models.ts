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
} as const;

/**
 * Type for all valid image-to-video model IDs
 */
export type ImageToVideoModelId = typeof IMAGE_TO_VIDEO_MODEL_IDS[keyof typeof IMAGE_TO_VIDEO_MODEL_IDS];

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
