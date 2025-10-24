import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { pollQueueResult } from '../../../utils/poll-queue.util';
import { QueueSubmitResponseInterface } from '../../../interfaces';
import { getModelConfig, IMAGE_TO_VIDEO_MODEL_IDS } from '../models';

/**
 * Execute Google Veo 3.1 First-Last Frame to Video generation
 *
 * This model animates between a first and last frame using Google's Veo 3.1 model.
 * This is the standard version (not the Fast variant).
 */
export async function executeVeo31FirstLastFrame(
	context: IExecuteFunctions,
	itemIndex: number,
): Promise<IDataObject> {
	// Get model configuration
	const modelConfig = getModelConfig(IMAGE_TO_VIDEO_MODEL_IDS.VEO_3_1_FIRST_LAST_FRAME);

	// Get required parameters
	const prompt = context.getNodeParameter('prompt', itemIndex) as string;
	const firstFrameUrl = context.getNodeParameter('firstFrameUrl', itemIndex) as string;
	const lastFrameUrl = context.getNodeParameter('lastFrameUrl', itemIndex) as string;
	const aspectRatio = context.getNodeParameter('aspectRatio', itemIndex, 'auto') as string;
	const duration = context.getNodeParameter('durationVeo31Fast', itemIndex, '8s') as string;
	const resolution = context.getNodeParameter('resolution', itemIndex, '720p') as string;

	// Get additional options
	const additionalOptions = context.getNodeParameter(
		'additionalOptions',
		itemIndex,
		{},
	) as IDataObject;

	// Build request body according to fal.ai API documentation for this model
	const body: IDataObject = {
		first_frame_url: firstFrameUrl,
		last_frame_url: lastFrameUrl,
		prompt,
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
