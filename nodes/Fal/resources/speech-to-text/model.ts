

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

export type SpeechToTextModelId =
    (typeof SPEECH_TO_TEXT_MODEL_IDS)[keyof typeof SPEECH_TO_TEXT_MODEL_IDS];


export const SPEECH_TO_TEXT_MODELS = {
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
        description: 'Optimized Whisper v3 Large - same accuracy, double the performance'
    },
};

/* *
 * Get model configuration by ID
 */
export function getModelConfig(modelId: SpeechToTextModelId): ModelConfig { 
    return SPEECH_TO_TEXT_MODELS[modelId];
}


export function getModelOptions(){ // for n8n UI dropdown
    return Object.values(SPEECH_TO_TEXT_MODELS).map((config) => ({
        name: config.displayName,
        value: config.id,
        description: config.description,
    }));
}