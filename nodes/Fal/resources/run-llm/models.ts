/**
 * Run LLM Models Configuration
 *
 * This resource provides access to various LLM models through fal.ai.
 * Currently supports OpenRouter as the primary model provider.
 */

export interface ModelConfig {
	id: string; // Unique identifier for n8n (used in UI selection)
	modelId: string; // Actual fal.ai model ID (from fal.ai documentation)
	displayName: string; // Display name in n8n UI
	description: string; // Short description for users
}

export const RUN_LLM_MODEL_IDS = {
	OPENROUTER: 'openrouter',
} as const;

/**
 * Type for all valid Run LLM model IDs
 */
export type RunLlmModelId = typeof RUN_LLM_MODEL_IDS[keyof typeof RUN_LLM_MODEL_IDS];

/**
 * Available Run LLM Models
 */
export const RUN_LLM_MODELS: Record<RunLlmModelId, ModelConfig> = {
	[RUN_LLM_MODEL_IDS.OPENROUTER]: {
		id: RUN_LLM_MODEL_IDS.OPENROUTER,
		modelId: 'openrouter/router',
		displayName: 'OpenRouter',
		description:
			'Run any LLM with fal.ai, powered by OpenRouter. Access hundreds of models through a single API.',
	},
};

/**
 * Get model configuration by ID
 */
export function getModelConfig(modelId: RunLlmModelId): ModelConfig {
	return RUN_LLM_MODELS[modelId];
}

/**
 * Get all available models as options for n8n UI dropdown
 */
export function getModelOptions() {
	return Object.values(RUN_LLM_MODELS).map((config) => ({
		name: config.displayName,
		value: config.id,
		description: config.description,
	}));
}
