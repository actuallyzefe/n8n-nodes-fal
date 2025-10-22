import type { INodeProperties } from 'n8n-workflow';
import { textToVideoGenerateDescription } from './description';

export const textToVideoDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['textToVideo'],
			},
		},
		options: [
			{
				name: 'Generate Video',
				value: 'generate',
				description: 'Generate video from text prompt using AI models',
				action: 'Generate video from text',
			},
		],
		default: 'generate',
	},
	...textToVideoGenerateDescription,
];
