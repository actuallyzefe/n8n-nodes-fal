import type { INodeProperties } from 'n8n-workflow';
import { getModelOptions, SPEECH_TO_TEXT_MODEL_IDS } from './models';

const displayFor = {
	operation: ['transcribe'],
	resource: ['speechToText'],
};

const displayForBothModels = {
	...displayFor,
	model: [SPEECH_TO_TEXT_MODEL_IDS.WHISPER, SPEECH_TO_TEXT_MODEL_IDS.WIZPER],
};

const displayForWhisper = {
	...displayFor,
	model: [SPEECH_TO_TEXT_MODEL_IDS.WHISPER],
};

const displayForWizper = {
	...displayFor,
	model: [SPEECH_TO_TEXT_MODEL_IDS.WIZPER],
};

// All 75 supported languages from fal.ai API documentation
const languageOptions = [
	{ name: 'Afrikaans', value: 'af' },
	{ name: 'Amharic', value: 'am' },
	{ name: 'Arabic', value: 'ar' },
	{ name: 'Assamese', value: 'as' },
	{ name: 'Azerbaijani', value: 'az' },
	{ name: 'Bashkir', value: 'ba' },
	{ name: 'Belarusian', value: 'be' },
	{ name: 'Bulgarian', value: 'bg' },
	{ name: 'Bengali', value: 'bn' },
	{ name: 'Tibetan', value: 'bo' },
	{ name: 'Breton', value: 'br' },
	{ name: 'Bosnian', value: 'bs' },
	{ name: 'Catalan', value: 'ca' },
	{ name: 'Czech', value: 'cs' },
	{ name: 'Welsh', value: 'cy' },
	{ name: 'Danish', value: 'da' },
	{ name: 'German', value: 'de' },
	{ name: 'Greek', value: 'el' },
	{ name: 'English', value: 'en' },
	{ name: 'Spanish', value: 'es' },
	{ name: 'Estonian', value: 'et' },
	{ name: 'Basque', value: 'eu' },
	{ name: 'Persian', value: 'fa' },
	{ name: 'Finnish', value: 'fi' },
	{ name: 'Faroese', value: 'fo' },
	{ name: 'French', value: 'fr' },
	{ name: 'Galician', value: 'gl' },
	{ name: 'Gujarati', value: 'gu' },
	{ name: 'Hausa', value: 'ha' },
	{ name: 'Hawaiian', value: 'haw' },
	{ name: 'Hebrew', value: 'he' },
	{ name: 'Hindi', value: 'hi' },
	{ name: 'Croatian', value: 'hr' },
	{ name: 'Haitian Creole', value: 'ht' },
	{ name: 'Hungarian', value: 'hu' },
	{ name: 'Armenian', value: 'hy' },
	{ name: 'Indonesian', value: 'id' },
	{ name: 'Icelandic', value: 'is' },
	{ name: 'Italian', value: 'it' },
	{ name: 'Japanese', value: 'ja' },
	{ name: 'Javanese', value: 'jw' },
	{ name: 'Georgian', value: 'ka' },
	{ name: 'Kazakh', value: 'kk' },
	{ name: 'Khmer', value: 'km' },
	{ name: 'Kannada', value: 'kn' },
	{ name: 'Korean', value: 'ko' },
	{ name: 'Latin', value: 'la' },
	{ name: 'Luxembourgish', value: 'lb' },
	{ name: 'Lingala', value: 'ln' },
	{ name: 'Lao', value: 'lo' },
	{ name: 'Lithuanian', value: 'lt' },
	{ name: 'Latvian', value: 'lv' },
	{ name: 'Malagasy', value: 'mg' },
	{ name: 'Maori', value: 'mi' },
	{ name: 'Macedonian', value: 'mk' },
	{ name: 'Malayalam', value: 'ml' },
	{ name: 'Mongolian', value: 'mn' },
	{ name: 'Marathi', value: 'mr' },
	{ name: 'Malay', value: 'ms' },
	{ name: 'Maltese', value: 'mt' },
	{ name: 'Burmese', value: 'my' },
	{ name: 'Nepali', value: 'ne' },
	{ name: 'Dutch', value: 'nl' },
	{ name: 'Norwegian Nynorsk', value: 'nn' },
	{ name: 'Norwegian', value: 'no' },
	{ name: 'Occitan', value: 'oc' },
	{ name: 'Punjabi', value: 'pa' },
	{ name: 'Polish', value: 'pl' },
	{ name: 'Pashto', value: 'ps' },
	{ name: 'Portuguese', value: 'pt' },
	{ name: 'Romanian', value: 'ro' },
	{ name: 'Russian', value: 'ru' },
	{ name: 'Sanskrit', value: 'sa' },
	{ name: 'Sindhi', value: 'sd' },
	{ name: 'Sinhala', value: 'si' },
	{ name: 'Slovak', value: 'sk' },
	{ name: 'Slovenian', value: 'sl' },
	{ name: 'Shona', value: 'sn' },
	{ name: 'Somali', value: 'so' },
	{ name: 'Albanian', value: 'sq' },
	{ name: 'Serbian', value: 'sr' },
	{ name: 'Sundanese', value: 'su' },
	{ name: 'Swedish', value: 'sv' },
	{ name: 'Swahili', value: 'sw' },
	{ name: 'Tamil', value: 'ta' },
	{ name: 'Telugu', value: 'te' },
	{ name: 'Tajik', value: 'tg' },
	{ name: 'Thai', value: 'th' },
	{ name: 'Turkmen', value: 'tk' },
	{ name: 'Tagalog', value: 'tl' },
	{ name: 'Turkish', value: 'tr' },
	{ name: 'Tatar', value: 'tt' },
	{ name: 'Ukrainian', value: 'uk' },
	{ name: 'Urdu', value: 'ur' },
	{ name: 'Uzbek', value: 'uz' },
	{ name: 'Vietnamese', value: 'vi' },
	{ name: 'Yiddish', value: 'yi' },
	{ name: 'Yoruba', value: 'yo' },
	{ name: 'Chinese', value: 'zh' },
];

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
			'URL of the audio file to transcribe. Supported formats: mp3, mp4, mpeg, mpga, m4a, wav or webm.',
		placeholder: 'https://example.com/audio.mp3',
	},
	{
		displayName: 'Language',
		name: 'language',
		type: 'options',
		displayOptions: { show: displayForBothModels },
		options: languageOptions,
		default: 'en',
		description:
			'Language of the audio file. If translate is selected as the task, the audio will be translated to English regardless of the language selected.',
	},
	{
		displayName: 'Task',
		name: 'task',
		type: 'options',
		displayOptions: { show: displayForBothModels },
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

	// ===== Whisper-specific Additional Options =====
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		displayOptions: { show: displayForWhisper },
		default: {},
		placeholder: 'Add Option',
		options: [
			{
				displayName: 'Batch Size',
				name: 'batch_size',
				type: 'number',
				default: 64,
				description: 'Batch size for processing',
				typeOptions: {
					minValue: 1,
				},
			},
			{
				displayName: 'Chunk Level',
				name: 'chunk_level',
				type: 'options',
				options: [
					{
						name: 'None',
						value: 'none',
						description:
							'No chunking - returns a single chunk with the whole transcription. May improve quality.',
					},
					{
						name: 'Segment',
						value: 'segment',
						description: 'Return segments with timestamps',
					},
					{
						name: 'Word',
						value: 'word',
						description: 'Return word-level timestamps',
					},
				],
				default: 'segment',
				description: 'Level of the chunks to return',
			},
			{
				displayName: 'Diarize',
				name: 'diarize',
				type: 'boolean',
				default: false,
				description:
					'Whether to enable speaker diarization. Setting to true will add costs proportional to diarization inference time.',
			},
			{
				displayName: 'Number of Speakers',
				name: 'num_speakers',
				type: 'number',
				default: undefined,
				description:
					'Number of speakers in the audio file. If not provided, the number of speakers will be automatically detected. Only used when diarization is enabled.',
				typeOptions: {
					minValue: 1,
				},
			},
			{
				displayName: 'Prompt',
				name: 'prompt',
				type: 'string',
				default: '',
				description: 'Prompt to use for generation',
				typeOptions: {
					rows: 2,
				},
			},
		],
	},

	// ===== Wizper-specific Additional Options =====
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		displayOptions: { show: displayForWizper },
		default: {},
		placeholder: 'Add Option',
		options: [
			{
				displayName: 'Chunk Level',
				name: 'chunk_level',
				type: 'options',
				options: [
					{
						name: 'Segment',
						value: 'segment',
						description: 'Return segments with timestamps',
					},
				],
				default: 'segment',
				description: 'Level of the chunks to return',
			},
			{
				displayName: 'Max Segment Length',
				name: 'max_segment_len',
				type: 'number',
				default: 29,
				description: 'Maximum speech segment duration in seconds before splitting',
				typeOptions: {
					minValue: 1,
				},
			},
			{
				displayName: 'Merge Chunks',
				name: 'merge_chunks',
				type: 'boolean',
				default: true,
				description:
					'Whether to merge consecutive chunks. When enabled, chunks are merged if their combined duration does not exceed max segment length.',
			},
		],
	},
];
