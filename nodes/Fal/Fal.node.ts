import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { textToImageDescription } from './resources/text-to-image';
import { imageToVideoDescription } from './resources/image-to-video';
import { textToSpeechDescription } from './resources/text-to-speech';
import { textToVideoDescription } from './resources/text-to-video';
import { executeTextToImage } from './resources/text-to-image/execute';
import { executeImageToVideo } from './resources/image-to-video/execute';
import { executeTextToSpeech } from './resources/text-to-speech/execute';
import { executeTextToVideo } from './resources/text-to-video/execute';

export class Fal implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Fal',
		name: 'fal',
		icon: 'file:fal-ai-logo.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with fal.ai AI model APIs for image, video, and speech generation',
		defaults: {
			name: 'Fal',
		},
		usableAsTool: true,
		inputs: ['main'],
		outputs: ['main'],
		credentials: [{ name: 'falApi', required: true }],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Image to Video',
						value: 'imageToVideo',
						description: 'Generate videos from images',
					},
					{
						name: 'Text to Image',
						value: 'textToImage',
						description: 'Generate images from text prompts',
					},
					{
						name: 'Text to Speech',
						value: 'textToSpeech',
						description: 'Generate speech from text',
					},
					{
						name: 'Text to Video',
						value: 'textToVideo',
						description: 'Generate videos from text prompts',
					},
				],
				default: 'textToImage',
			},
			...textToImageDescription,
			...imageToVideoDescription,
			...textToSpeechDescription,
			...textToVideoDescription,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData;

				switch (resource) {
					case 'textToImage':
						responseData = await executeTextToImage(this, i);
						break;

					case 'imageToVideo':
						responseData = await executeImageToVideo(this, i);
						break;

					case 'textToSpeech':
						responseData = await executeTextToSpeech(this, i);
						break;

					case 'textToVideo':
						responseData = await executeTextToVideo(this, i);
						break;

					default:
						throw new NodeOperationError(
							this.getNode(),
							`The resource "${resource}" is not known`,
							{
								itemIndex: i,
							},
						);
				}

				// Add metadata
				const executionData = this.helpers.constructExecutionMetaData([{ json: responseData }], {
					itemData: { item: i },
				});

				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message,
						},
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
