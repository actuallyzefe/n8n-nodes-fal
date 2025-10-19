/**
 * Text to Image Models Configuration
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

export const TEXT_TO_IMAGE_MODEL_IDS = {
	NANO_BANANA: 'nano-banana',
	IMAGEN_4: 'imagen-4',
} as const;

/**
 * Type for all valid text-to-image model IDs
 */
export type TextToImageModelId = typeof TEXT_TO_IMAGE_MODEL_IDS[keyof typeof TEXT_TO_IMAGE_MODEL_IDS];

/**
 * Available Text-to-Image models
 * Add new models as they become available
 */
export const TEXT_TO_IMAGE_MODELS: Record<TextToImageModelId, ModelConfig> = {
	[TEXT_TO_IMAGE_MODEL_IDS.NANO_BANANA]: {
		id: TEXT_TO_IMAGE_MODEL_IDS.NANO_BANANA,
		modelId: 'fal-ai/nano-banana',
		displayName: 'Nano Banana',
		description: 'Gemini-based fast image generation',
	},
	[TEXT_TO_IMAGE_MODEL_IDS.IMAGEN_4]: {
		id: TEXT_TO_IMAGE_MODEL_IDS.IMAGEN_4,
		modelId: 'fal-ai/imagen4/preview',
		displayName: 'Imagen 4',
		description: 'Google Imagen 4 - High-quality with enhanced detail',
	},
};

/**
 * Get model configuration by ID
 */
export function getModelConfig(modelId: TextToImageModelId): ModelConfig {
	return TEXT_TO_IMAGE_MODELS[modelId];
}

/**
 * Get all available models as options for n8n UI dropdown
 */
export function getModelOptions() {
	return Object.values(TEXT_TO_IMAGE_MODELS).map((config) => ({
		name: config.displayName,
		value: config.id,
		description: config.description,
	}));
}
