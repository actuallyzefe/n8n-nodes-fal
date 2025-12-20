import type { INodeProperties } from "n8n-workflow";
import { getModelOptions,SPEECH_TO_TEXT_MODEL_IDS } from "./model";

const displayFor = {
    operation: ['transcribe'],
    resource: ['speechToText'],
};

//TODO: may no need seperate displayFor if no specific fields
const displayForWhisper = {
    ...displayFor,
    model: [SPEECH_TO_TEXT_MODEL_IDS.WHISPER],
};

const displayForWizper = {
    ...displayFor,
    model: [SPEECH_TO_TEXT_MODEL_IDS.WIZPER],
};

//TODO: check required fields and descriptions align with fal.ai docs
export const speechToTextTranscribeDescription: INodeProperties[] = [
    {
        displayName: 'Model',
        name: 'model',
        type: 'options',
        default: '',
        displayOptions: { show: displayFor },
        options: getModelOptions(),
        description: 'The AI model to use for speech-to-text transcription',
    },
    {
        displayName: 'Audio File URL',
        name: 'audioFileUrl',
        type: 'string',
        displayOptions: { show: displayFor },
        default: '',
        required: true,
    }, 
    { 
        displayName: 'Language',
        name: 'language',
        type: 'string',
        displayOptions: { show: displayForWhisper }, 
        default: 'en',
        description: 'Language code of the audio (e.g., "en" for English)',
    },
    {
        displayName: 'Task',
        name: 'task',
        type: 'options',
        displayOptions: { show: displayForWhisper },
        options: [
            {
                name: 'Transcribe',
                value: 'transcribe',
                description: 'Convert speech to text',
            },
            {
                name: 'Translate',
                value: 'translate',
                description: 'Translate speech to English text',
            },
        ],
        default: 'transcribe',
        description: 'Whether to transcribe or translate the audio',
    }
]

