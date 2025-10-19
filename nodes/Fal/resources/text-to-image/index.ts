import type { INodeProperties } from 'n8n-workflow';
import { textToImageGenerateDescription } from './description';

export const textToImageDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['textToImage'],
			},
		},
		options: [
			{
				name: 'Generate',
				value: 'generate',
				description: 'Generate image from text prompt using Nano Banana model',
				action: 'Generate image from text',
			},
		],
		default: 'generate',
	},
	...textToImageGenerateDescription,
];
