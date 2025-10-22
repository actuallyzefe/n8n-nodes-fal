import type { INodeProperties } from 'n8n-workflow';
import { getModelOptions, TEXT_TO_SPEECH_MODEL_IDS } from './models';

const displayFor = {
	operation: ['generate'],
	resource: ['textToSpeech'],
};

// Define which models show which fields
// Add new models here with their specific parameter requirements
const displayForElevenLabsTurboV25 = {
	...displayFor,
	model: [TEXT_TO_SPEECH_MODEL_IDS.ELEVENLABS_TURBO_V2_5],
};

export const textToSpeechGenerateDescription: INodeProperties[] = [
	{
		displayName: 'Model',
		name: 'model',
		type: 'options',
		default: '',
		displayOptions: { show: displayFor },
		options: getModelOptions(),
		description: 'The AI model to use for text-to-speech generation',
	},

	// ===== Common fields (shown for all models) =====
	{
		displayName: 'Text',
		name: 'text',
		type: 'string',
		displayOptions: { show: displayFor },
		default: '',
		required: true,
		typeOptions: {
			rows: 4,
		},
		description: 'The text to convert to speech',
		placeholder: 'Hello! This is a test of the text to speech system.',
	},

	// ===== ElevenLabs Turbo v2.5 specific fields =====
	{
		displayName: 'Voice',
		name: 'voice',
		type: 'options',
		displayOptions: { show: displayForElevenLabsTurboV25 },
		options: [
			{ name: 'Alice', value: 'Alice' },
			{ name: 'Aria', value: 'Aria' },
			{ name: 'Bill', value: 'Bill' },
			{ name: 'Brian', value: 'Brian' },
			{ name: 'Callum', value: 'Callum' },
			{ name: 'Charlie', value: 'Charlie' },
			{ name: 'Charlotte', value: 'Charlotte' },
			{ name: 'Chris', value: 'Chris' },
			{ name: 'Daniel', value: 'Daniel' },
			{ name: 'Eric', value: 'Eric' },
			{ name: 'George', value: 'George' },
			{ name: 'Jessica', value: 'Jessica' },
			{ name: 'Laure', value: 'Laure' },
			{ name: 'Liam', value: 'Liam' },
			{ name: 'Lily', value: 'Lily' },
			{ name: 'Matilda', value: 'Matilda' },
			{ name: 'Rachel', value: 'Rachel' },
			{ name: 'River', value: 'River' },
			{ name: 'Roger', value: 'Roger' },
			{ name: 'Sarah', value: 'Sarah' },
			{ name: 'Will', value: 'Will' },
		],
		default: 'Alice',
		description: 'The voice to use for speech generation',
	},

	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		displayOptions: { show: displayForElevenLabsTurboV25 },
		default: {},
		placeholder: 'Add Option',
		options: [
			{
				displayName: 'Language',
				name: 'language_code',
				type: 'options',
				options: [
					{ name: 'Arabic', value: 'ar' },
					{ name: 'Bulgarian', value: 'bg' },
					{ name: 'Chinese', value: 'zh' },
					{ name: 'Croatian', value: 'hr' },
					{ name: 'Czech', value: 'cs' },
					{ name: 'Danish', value: 'da' },
					{ name: 'Dutch', value: 'nl' },
					{ name: 'English', value: 'en' },
					{ name: 'Filipino', value: 'fil' },
					{ name: 'Finnish', value: 'fi' },
					{ name: 'French', value: 'fr' },
					{ name: 'German', value: 'de' },
					{ name: 'Greek', value: 'el' },
					{ name: 'Hindi', value: 'hi' },
					{ name: 'Hungarian', value: 'hu' },
					{ name: 'Indonesian', value: 'id' },
					{ name: 'Italian', value: 'it' },
					{ name: 'Japanese', value: 'ja' },
					{ name: 'Korean', value: 'ko' },
					{ name: 'Malay', value: 'ms' },
					{ name: 'Norwegian', value: 'no' },
					{ name: 'Polish', value: 'pl' },
					{ name: 'Portuguese', value: 'pt' },
					{ name: 'Romanian', value: 'ro' },
					{ name: 'Russian', value: 'ru' },
					{ name: 'Slovak', value: 'sk' },
					{ name: 'Spanish', value: 'es' },
					{ name: 'Swedish', value: 'sv' },
					{ name: 'Tamil', value: 'ta' },
					{ name: 'Turkish', value: 'tr' },
					{ name: 'Ukrainian', value: 'uk' },
					{ name: 'Vietnamese', value: 'vi' },
				],
				default: 'en',
				description:
					'Language to enforce for the model. Supports regional variants (e.g., USA, UK, Australia for English; Brazil, Portugal for Portuguese).',
			},
			{
				displayName: 'Next Text',
				name: 'next_text',
				type: 'string',
				default: '',
				typeOptions: {
					rows: 2,
				},
				description:
					'Text that comes after the current request. Can improve continuity when concatenating generations.',
			},
			{
				displayName: 'Previous Text',
				name: 'previous_text',
				type: 'string',
				default: '',
				typeOptions: {
					rows: 2,
				},
				description:
					'Text that came before the current request. Can improve continuity when concatenating generations.',
			},
			{
				displayName: 'Similarity Boost',
				name: 'similarity_boost',
				type: 'number',
				default: 0.75,
				description:
					'Similarity boost (0-1). Higher values boost similarity to the original speaker.',
				typeOptions: {
					minValue: 0,
					maxValue: 1,
					numberPrecision: 2,
				},
			},
			{
				displayName: 'Speed',
				name: 'speed',
				type: 'number',
				default: 1,
				description:
					'Speech speed (0.7-1.2). Values below 1.0 slow down the speech, above 1.0 speed it up.',
				typeOptions: {
					minValue: 0.7,
					maxValue: 1.2,
					numberPrecision: 2,
				},
			},
			{
				displayName: 'Stability',
				name: 'stability',
				type: 'number',
				default: 0.5,
				description: 'Voice stability (0-1). Lower values introduce broader emotional range.',
				typeOptions: {
					minValue: 0,
					maxValue: 1,
					numberPrecision: 2,
				},
			},
			{
				displayName: 'Style',
				name: 'style',
				type: 'number',
				default: 0,
				description: 'Style exaggeration (0-1). Higher values exaggerate the speaking style.',
				typeOptions: {
					minValue: 0,
					maxValue: 1,
					numberPrecision: 2,
				},
			},
			{
				displayName: 'Timestamps',
				name: 'timestamps',
				type: 'boolean',
				default: false,
				description: 'Whether to return timestamps for each word in the generated speech',
			},
		],
	},

	// ===== To add a new model =====
	// 1. Add model config to models.ts
	// 2. Create displayFor{ModelName} constant at top of this file
	// 3. Add model-specific fields here with displayOptions: { show: displayFor{ModelName} }
	// 4. Update execute/{model}.ts to handle the new model's parameters
];
