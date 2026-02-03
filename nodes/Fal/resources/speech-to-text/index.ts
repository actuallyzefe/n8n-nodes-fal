import type { INodeProperties } from 'n8n-workflow';
import { speechToTextTranscribeDescription } from './description';

export const speechToTextDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['speechToText'] } },
		options: [
			{ name: 'Transcribe', value: 'transcribe', action: 'Transcribe audio to text' },
		],
		default: 'transcribe',
	},
	...speechToTextTranscribeDescription,
];
