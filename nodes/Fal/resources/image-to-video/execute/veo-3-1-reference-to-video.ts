import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { pollQueueResult } from '../../../utils/poll-queue.util';
import { QueueSubmitResponseInterface } from '../../../interfaces';
import { getModelConfig, IMAGE_TO_VIDEO_MODEL_IDS } from '../models';

/**
 * Execute Google Veo 3.1 Reference-to-Video generation
 *
 * This model generates videos from multiple reference images and text prompts.
 * It supports consistent subject appearance across frames.
 */
export async function executeVeo31ReferenceToVideo(
	context: IExecuteFunctions,
	itemIndex: number,
): Promise<IDataObject> {
	// Get model configuration
	const modelConfig = getModelConfig(IMAGE_TO_VIDEO_MODEL_IDS.VEO_3_1_REFERENCE_TO_VIDEO);

	// Get required parameters
	const prompt = context.getNodeParameter('prompt', itemIndex) as string;
	const imageUrlsString = context.getNodeParameter('imageUrls', itemIndex) as string;
	const duration = context.getNodeParameter('durationVeo31', itemIndex, '8s') as string;
	const resolution = context.getNodeParameter('resolution', itemIndex, '720p') as string;

	// Parse image URLs - split by newlines and filter empty lines
	const imageUrls = imageUrlsString
		.split('\n')
		.map((url) => url.trim())
		.filter((url) => url.length > 0);

	// Get additional options
	const additionalOptions = context.getNodeParameter(
		'additionalOptions',
		itemIndex,
		{},
	) as IDataObject;

	// Build request body according to fal.ai API documentation for this model
	const body: IDataObject = {
		image_urls: imageUrls,
		prompt,
		duration,
		resolution,
	};

	// Add optional parameters if provided
	if (additionalOptions.generate_audio !== undefined) {
		body.generate_audio = additionalOptions.generate_audio;
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
