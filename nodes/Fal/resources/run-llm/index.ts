import type { INodeProperties } from 'n8n-workflow';
import { runLlmGenerateDescription } from './description';

export const runLlmDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['runLlm'],
			},
		},
		options: [
			{
				name: 'Generate Text',
				value: 'generate',
				description: 'Generate text completions using LLM models',
				action: 'Generate text with LLM',
			},
		],
		default: 'generate',
	},
	...runLlmGenerateDescription,
];
