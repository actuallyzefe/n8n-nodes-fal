/**
 * Speech to Text Models Configuration
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

export const SPEECH_TO_TEXT_MODEL_IDS = {
	WHISPER: 'whisper',
	WIZPER: 'wizper',
} as const;

/**
 * Type for all valid speech-to-text model IDs
 */
export type SpeechToTextModelId =
	(typeof SPEECH_TO_TEXT_MODEL_IDS)[keyof typeof SPEECH_TO_TEXT_MODEL_IDS];

/**
 * Available Speech-to-Text Models
 * Add new models as they become available
 */
export const SPEECH_TO_TEXT_MODELS: Record<SpeechToTextModelId, ModelConfig> = {
	[SPEECH_TO_TEXT_MODEL_IDS.WHISPER]: {
		id: SPEECH_TO_TEXT_MODEL_IDS.WHISPER,
		modelId: 'fal-ai/whisper',
		displayName: 'Whisper',
		description: 'OpenAI Whisper model for high-quality speech-to-text transcription',
	},
	[SPEECH_TO_TEXT_MODEL_IDS.WIZPER]: {
		id: SPEECH_TO_TEXT_MODEL_IDS.WIZPER,
		modelId: 'fal-ai/wizper',
		displayName: 'Wizper',
		description: 'Optimized Whisper v3 Large - same accuracy, double the performance',
	},
};

/**
 * Get model configuration by ID
 */
export function getModelConfig(modelId: SpeechToTextModelId): ModelConfig {
	return SPEECH_TO_TEXT_MODELS[modelId];
}

/**
 * Get all available models as options for n8n UI dropdown
 */
export function getModelOptions() {
	return Object.values(SPEECH_TO_TEXT_MODELS).map((config) => ({
		name: config.displayName,
		value: config.id,
		description: config.description,
	}));
}
