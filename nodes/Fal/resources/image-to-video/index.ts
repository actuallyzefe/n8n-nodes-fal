import type { INodeProperties } from 'n8n-workflow';
import { imageToVideoGenerateDescription } from './description';

export const imageToVideoDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['imageToVideo'],
			},
		},
		options: [
			{
				name: 'Generate Video',
				value: 'generateVideo',
				description: 'Generate video from image using AI models',
				action: 'Generate video from image',
			},
		],
		default: 'generateVideo',
	},
	...imageToVideoGenerateDescription,
];
