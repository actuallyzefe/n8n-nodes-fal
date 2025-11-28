import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { pollQueueResult } from '../../../utils/poll-queue.util';
import { QueueSubmitResponseInterface } from '../../../interfaces';
import { getModelConfig, TEXT_TO_IMAGE_MODEL_IDS } from '../models';

/**
 * Execute Nano Banana 2 text-to-image generation
 */
export async function executeNanoBanana2(
	context: IExecuteFunctions,
	itemIndex: number,
): Promise<IDataObject> {
	// Get model configuration
	const modelConfig = getModelConfig(TEXT_TO_IMAGE_MODEL_IDS.NANO_BANANA_2);

	// Get parameters
	const prompt = context.getNodeParameter('prompt', itemIndex) as string;
	const numImages = context.getNodeParameter('numImages', itemIndex, 1) as number;
	const aspectRatio = context.getNodeParameter('aspectRatioNanoBanana2', itemIndex, '1:1') as string;
	const resolution = context.getNodeParameter('resolutionNanoBanana2', itemIndex, '1K') as string;
	const outputFormat = context.getNodeParameter('outputFormatNanoBanana2', itemIndex, 'png') as string;
	const syncMode = context.getNodeParameter('syncModeNanoBanana2', itemIndex, false) as boolean;

	// Build request body according to fal.ai API documentation for this model
	const body: IDataObject = {
		prompt,
		num_images: numImages,
		aspect_ratio: aspectRatio,
		resolution,
		output_format: outputFormat,
		sync_mode: syncMode,
	};

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
