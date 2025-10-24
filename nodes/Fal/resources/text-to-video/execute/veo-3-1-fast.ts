import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { pollQueueResult } from '../../../utils/poll-queue.util';
import { QueueSubmitResponseInterface } from '../../../interfaces';
import { getModelConfig, TEXT_TO_VIDEO_MODEL_IDS } from '../models';

/**
 * Execute Google Veo 3.1 Fast text-to-video generation
 *
 * Faster variant of Veo 3.1 with the same features but optimized for speed.
 */
export async function executeVeo31Fast(
	context: IExecuteFunctions,
	itemIndex: number,
): Promise<IDataObject> {
	// Get model configuration
	const modelConfig = getModelConfig(TEXT_TO_VIDEO_MODEL_IDS.VEO_3_1_FAST);

	// Get required parameters
	const prompt = context.getNodeParameter('prompt', itemIndex) as string;
	const aspectRatio = context.getNodeParameter('aspectRatio', itemIndex, '16:9') as string;
	const duration = context.getNodeParameter('duration', itemIndex, '8s') as string;
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
		aspect_ratio: aspectRatio,
		duration,
		resolution,
	};

	// Add optional parameters if provided
	if (additionalOptions.enhance_prompt !== undefined) {
		body.enhance_prompt = additionalOptions.enhance_prompt;
	}

	if (additionalOptions.auto_fix !== undefined) {
		body.auto_fix = additionalOptions.auto_fix;
	}

	if (additionalOptions.generate_audio !== undefined) {
		body.generate_audio = additionalOptions.generate_audio;
	}

	if (additionalOptions.negative_prompt) {
		body.negative_prompt = additionalOptions.negative_prompt;
	}

	// Handle seed parameter - omit if -1 (random)
	if (additionalOptions.seed !== undefined && additionalOptions.seed !== -1) {
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
