
export const SPEECH_TO_TEXT_MODEL_IDS = {
    WHISPER: 'whisper',
    WIZPER: 'wizper',
} as const;

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
}
;