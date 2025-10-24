import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { pollQueueResult } from '../../../utils/poll-queue.util';
import { QueueSubmitResponseInterface } from '../../../interfaces';
import { getModelConfig, IMAGE_TO_VIDEO_MODEL_IDS } from '../models';

/**
 * Execute Google Veo 3.1 Image-to-Video generation
 *
 * This model animates a single input image using Google's Veo 3.1 model.
 * Supports 16:9 and 9:16 aspect ratios with 720p/1080p resolution.
 */
export async function executeVeo31ImageToVideo(
	context: IExecuteFunctions,
	itemIndex: number,
): Promise<IDataObject> {
	// Get model configuration
	const modelConfig = getModelConfig(IMAGE_TO_VIDEO_MODEL_IDS.VEO_3_1_IMAGE_TO_VIDEO);

	// Get required parameters
	const prompt = context.getNodeParameter('prompt', itemIndex) as string;
	const imageUrl = context.getNodeParameter('imageUrl', itemIndex) as string;
	const aspectRatio = context.getNodeParameter('aspectRatio', itemIndex, '16:9') as string;
	const duration = context.getNodeParameter('durationVeo31ImageToVideo', itemIndex, '8s') as string;
	const resolution = context.getNodeParameter('resolution', itemIndex, '720p') as string;

	// Get additional options
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
