import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { pollQueueResult } from '../../../utils/poll-queue.util';
import { QueueSubmitResponseInterface } from '../../../interfaces';
import { getModelConfig, IMAGE_TO_VIDEO_MODEL_IDS } from '../models';

/**
 * Execute Sora 2 image-to-video generation
 */
export async function executeSora2(
	context: IExecuteFunctions,
	itemIndex: number,
): Promise<IDataObject> {
	// Get model configuration
	const modelConfig = getModelConfig(IMAGE_TO_VIDEO_MODEL_IDS.SORA_2);

	// Get parameters
	const prompt = context.getNodeParameter('prompt', itemIndex) as string;
	const imageUrl = context.getNodeParameter('imageUrl', itemIndex) as string;
	const aspectRatio = context.getNodeParameter('aspectRatioSora2', itemIndex, 'auto') as string;
	const duration = parseInt(context.getNodeParameter('durationSora2', itemIndex, '4') as string, 10);
	const resolution = context.getNodeParameter('resolutionSora2', itemIndex, 'auto') as string;
	const additionalOptions = context.getNodeParameter(
		'additionalOptions',
		itemIndex,
		{},
	) as IDataObject;

	// Build request body according to fal.ai API documentation for this model
	const body: IDataObject = {
		prompt,
		image_url: imageUrl,
		aspect_ratio: aspectRatio,
		duration: duration,
		resolution,
	};

	// Add optional parameters
	if (additionalOptions.delete_video !== undefined) {
		body.delete_video = additionalOptions.delete_video;
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
