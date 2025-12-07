import type { INodeProperties } from 'n8n-workflow';
import { getModelOptions, RUN_LLM_MODEL_IDS } from './models';

const displayFor = {
	operation: ['generate'],
	resource: ['runLlm'],
};

// Define which models show which fields
const displayForOpenRouter = {
	...displayFor,
	model: [RUN_LLM_MODEL_IDS.OPENROUTER],
};

export const runLlmGenerateDescription: INodeProperties[] = [
	{
		displayName: 'Model',
		name: 'model',
		type: 'options',
		default: '',
		displayOptions: { show: displayFor },
		options: getModelOptions(),
		description: 'The LLM provider to use',
	},

	// ===== Common fields (shown for all models) =====
	{
		displayName: 'Prompt',
		name: 'prompt',
		type: 'string',
		displayOptions: { show: displayFor },
		default: '',
		required: true,
		typeOptions: {
			rows: 4,
		},
		description: 'The prompt to be used for the chat completion',
		placeholder:
			'Write a short story about an AI that learns to dream. Use vivid sensory details and end with a surprising twist.',
	},

	{
		displayName: 'LLM Model',
		name: 'llmModel',
		type: 'options',
		displayOptions: { show: displayForOpenRouter },
		default: 'google/gemini-2.5-flash',
		required: true,
		options: [
			{
				name: 'Anthropic Claude Sonnet 4.5',
				value: 'anthropic/claude-sonnet-4.5',
				description: 'Advanced Claude model from Anthropic',
			},
			{
				name: 'Custom Model',
				value: 'custom',
				description: 'Specify a custom model name',
			},
			{
				name: 'Google Gemini 2.5 Flash',
				value: 'google/gemini-2.5-flash',
				description: 'Fast and efficient model from Google',
			},
			{
				name: 'Meta Llama 4 Maverick',
				value: 'meta-llama/llama-4-maverick',
				description: 'Latest Llama model from Meta',
			},
			{
				name: 'OpenAI GPT-4.1',
				value: 'openai/gpt-4.1',
				description: 'Latest GPT-4 model from OpenAI',
			},
			{
				name: 'OpenAI GPT-OSS-120B',
				value: 'openai/gpt-oss-120b',
				description: 'Open source GPT model with 120B parameters',
			},
		],
		description:
			'Select a model to use for text generation. Charged based on actual token usage. Visit openrouter.ai for more models.',
	},

	{
		displayName: 'Custom Model Name',
		name: 'customModel',
		type: 'string',
		displayOptions: {
			show: {
				...displayForOpenRouter,
				llmModel: ['custom'],
			},
		},
		default: '',
		required: true,
		description:
			'Enter the custom model name (e.g., openai/gpt-4, anthropic/claude-3-opus, cohere/command-r-plus)',
		placeholder: 'provider/model-name',
	},

	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		displayOptions: { show: displayForOpenRouter },
		default: {},
		placeholder: 'Add Option',
		options: [
			{
				displayName: 'System Prompt',
				name: 'system_prompt',
				type: 'string',
				default: '',
				typeOptions: {
					rows: 3,
				},
				description: 'System prompt to provide context or instructions to the model',
				placeholder: 'You are a helpful assistant...',
			},
			{
				displayName: 'Temperature',
				name: 'temperature',
				type: 'number',
				default: 1,
				description:
					'Controls randomness in responses. Lower values (0-0.5) make output more focused and deterministic. Higher values (0.5-2) make output more creative and diverse.',
				typeOptions: {
					minValue: 0,
					maxValue: 2,
					numberPrecision: 2,
				},
			},
			{
				displayName: 'Max Tokens',
				name: 'max_tokens',
				type: 'number',
				default: undefined,
				description:
					'Maximum number of tokens to generate in the response. Leave empty to use model default. The maximum value is the context length minus the prompt length.',
				typeOptions: {
					minValue: 1,
				},
			},
			{
				displayName: 'Enable Reasoning',
				name: 'reasoning',
				type: 'boolean',
				default: false,
				description:
					'Whether reasoning should be part of the final answer. When enabled, the model will provide its reasoning process along with the response.',
			},
		],
	},
];
