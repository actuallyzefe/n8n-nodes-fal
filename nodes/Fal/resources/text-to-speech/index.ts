import type { INodeProperties } from 'n8n-workflow';
import { textToSpeechGenerateDescription } from './description';

export const textToSpeechDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['textToSpeech'],
			},
		},
		options: [
			{
				name: 'Generate Audio',
				value: 'generate',
				description: 'Generate speech from text using AI models',
				action: 'Generate speech from text',
			},
		],
		default: 'generate',
	},
	...textToSpeechGenerateDescription,
];
