import type { INodeProperties } from 'n8n-workflow';
import { getModelOptions, SPEECH_TO_TEXT_MODEL_IDS } from './models';

const displayFor = {
	operation: ['transcribe'],
	resource: ['speechToText'],
};

const displayForWhisper = {
	...displayFor,
	model: [SPEECH_TO_TEXT_MODEL_IDS.WHISPER],
};

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
		displayName: 'Audio URL',
		name: 'audioUrl',
		type: 'string',
		displayOptions: { show: displayFor },
		default: '',
		required: true,
		description:
			'URL of the audio file to transcribe. Supported formats: mp3, ogg, wav, m4a, aac.',
		placeholder: 'https://example.com/audio.mp3',
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
	},
];
