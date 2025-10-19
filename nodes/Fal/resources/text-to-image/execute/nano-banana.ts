import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { pollQueueResult } from '../../../utils/poll-queue.util';
import { QueueSubmitResponseInterface } from '../../../interfaces';
import { getModelConfig, TEXT_TO_IMAGE_MODEL_IDS } from '../models';

/**
 * Execute Nano Banana text-to-image generation
 */
export async function executeNanoBanana(
	context: IExecuteFunctions,
	itemIndex: number,
): Promise<IDataObject> {
	// Get model configuration
	const modelConfig = getModelConfig(TEXT_TO_IMAGE_MODEL_IDS.NANO_BANANA);

	// Get parameters (specific to Nano Banana)
	const prompt = context.getNodeParameter('prompt', itemIndex) as string;
	const numImages = context.getNodeParameter('numImages', itemIndex, 1) as number;
	const additionalOptions = context.getNodeParameter(
		'additionalOptions',
		itemIndex,
		{},
	) as IDataObject;

	// Build request body according to fal.ai API documentation for this model
	const body: IDataObject = {
		prompt,
		num_images: numImages,
	};

	// Add optional parameters
	if (additionalOptions.enableSafetyChecker !== undefined) {
		body.enable_safety_checker = additionalOptions.enableSafetyChecker;
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
