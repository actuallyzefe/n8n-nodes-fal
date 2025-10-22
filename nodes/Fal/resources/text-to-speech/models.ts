/**
 * Text to Speech Models Configuration
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

export const TEXT_TO_SPEECH_MODEL_IDS = {
	ELEVENLABS_TURBO_V2_5: 'elevenlabs-turbo-v2-5',
} as const;

/**
 * Type for all valid text-to-speech model IDs
 */
export type TextToSpeechModelId =
	(typeof TEXT_TO_SPEECH_MODEL_IDS)[keyof typeof TEXT_TO_SPEECH_MODEL_IDS];

/**
 * Available Text-to-Speech Models
 * Add new models as they become available
 */
export const TEXT_TO_SPEECH_MODELS: Record<TextToSpeechModelId, ModelConfig> = {
	[TEXT_TO_SPEECH_MODEL_IDS.ELEVENLABS_TURBO_V2_5]: {
		id: TEXT_TO_SPEECH_MODEL_IDS.ELEVENLABS_TURBO_V2_5,
		modelId: 'fal-ai/elevenlabs/tts/turbo-v2.5',
		displayName: 'ElevenLabs Turbo v2.5',
		description:
			'High quality with lowest latency, ideal for real-time applications. Supports 32 languages.',
	},
};

/**
 * Get model configuration by ID
 */
export function getModelConfig(modelId: TextToSpeechModelId): ModelConfig {
	return TEXT_TO_SPEECH_MODELS[modelId];
}

/**
 * Get all available models as options for n8n UI dropdown
 */
export function getModelOptions() {
	return Object.values(TEXT_TO_SPEECH_MODELS).map((config) => ({
		name: config.displayName,
		value: config.id,
		description: config.description,
	}));
}
