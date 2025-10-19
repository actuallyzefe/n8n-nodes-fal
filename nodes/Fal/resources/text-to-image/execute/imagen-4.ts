import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { pollQueueResult } from '../../../utils/poll-queue.util';
import { QueueSubmitResponseInterface } from '../../../interfaces';
import { getModelConfig, TEXT_TO_IMAGE_MODEL_IDS } from '../models';

/**
 * Execute Imagen 4 text-to-image generation
 */
export async function executeImagen4(
	context: IExecuteFunctions,
	itemIndex: number,
): Promise<IDataObject> {
	// Get model configuration
	const modelConfig = getModelConfig(TEXT_TO_IMAGE_MODEL_IDS.IMAGEN_4);

	// Get parameters (specific to Imagen 4)
	const prompt = context.getNodeParameter('prompt', itemIndex) as string;
	const numImages = context.getNodeParameter('numImages', itemIndex, 1) as number;
	const aspectRatio = context.getNodeParameter('aspectRatio', itemIndex, '1:1') as string;
	const resolution = context.getNodeParameter('resolution', itemIndex, '1K') as string;
	const negativePrompt = context.getNodeParameter('negativePrompt', itemIndex, '') as string;
	const additionalOptions = context.getNodeParameter(
		'additionalOptions',
		itemIndex,
		{},
	) as IDataObject;

	// Build request body according to fal.ai API documentation for this model
	const body: IDataObject = {
		prompt,
		num_images: numImages,
		aspect_ratio: aspectRatio,
		resolution,
	};

	// Add optional parameters
	if (negativePrompt) {
		body.negative_prompt = negativePrompt;
	}
	if (additionalOptions.seed !== undefined) {
		body.seed = additionalOptions.seed;
	}

	// Submit to queue using the model ID from configuration
	const submitResponse = (await context.helpers.httpRequestWithAuthentication.call(
		context,
		'falApi',
		{
			method: 'POST',
			url: `https://queue.fal.run/${modelConfig.modelId}`,
			body,
			json: true,
		},
	)) as QueueSubmitResponseInterface;

	// Poll for result using the URLs provided by the API
	return await pollQueueResult(
		context,
		submitResponse.status_url,
		submitResponse.response_url,
		itemIndex,
	);
}
