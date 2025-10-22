/**
 * Text to Video Models Configuration
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

export const TEXT_TO_VIDEO_MODEL_IDS = {
	SORA_2: 'sora-2',
	SORA_2_PRO: 'sora-2-pro',
} as const;

/**
 * Type for all valid text-to-video model IDs
 */
export type TextToVideoModelId =
	(typeof TEXT_TO_VIDEO_MODEL_IDS)[keyof typeof TEXT_TO_VIDEO_MODEL_IDS];

/**
 * Available Text-to-Video Models
 * Add new models as they become available
 */
export const TEXT_TO_VIDEO_MODELS: Record<TextToVideoModelId, ModelConfig> = {
	[TEXT_TO_VIDEO_MODEL_IDS.SORA_2]: {
		id: TEXT_TO_VIDEO_MODEL_IDS.SORA_2,
		modelId: 'fal-ai/sora-2/text-to-video',
		displayName: 'OpenAI Sora 2',
		description: 'Generate high-quality videos from text prompts using OpenAI Sora 2',
	},
	[TEXT_TO_VIDEO_MODEL_IDS.SORA_2_PRO]: {
		id: TEXT_TO_VIDEO_MODEL_IDS.SORA_2_PRO,
		modelId: 'fal-ai/sora-2/text-to-video/pro',
		displayName: 'OpenAI Sora 2 Pro',
		description: 'Generate high-quality videos with 1080p resolution using OpenAI Sora 2 Pro',
	},
};

/**
 * Get model configuration by ID
 */
export function getModelConfig(modelId: TextToVideoModelId): ModelConfig {
	return TEXT_TO_VIDEO_MODELS[modelId];
}

/**
 * Get all available models as options for n8n UI dropdown
 */
export function getModelOptions() {
	return Object.values(TEXT_TO_VIDEO_MODELS).map((config) => ({
		name: config.displayName,
		value: config.id,
		description: config.description,
	}));
}
