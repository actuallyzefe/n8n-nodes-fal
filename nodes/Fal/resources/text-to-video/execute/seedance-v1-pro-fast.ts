import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { pollQueueResult } from '../../../utils/poll-queue.util';
import { QueueSubmitResponseInterface } from '../../../interfaces';
import { getModelConfig, TEXT_TO_VIDEO_MODEL_IDS } from '../models';

/**
 * Execute Seedance 1.0 Pro Fast text-to-video generation
 *
 * Seedance is Bytedance's fast and efficient text-to-video model
 * Supports multiple aspect ratios, resolutions (480p-1080p), and durations (3-12 seconds)
 */
export async function executeSeedanceV1ProFast(
	context: IExecuteFunctions,
	itemIndex: number,
): Promise<IDataObject> {
	// Get model configuration
	const modelConfig = getModelConfig(TEXT_TO_VIDEO_MODEL_IDS.SEEDANCE_V1_PRO_FAST);

	// Get required parameters
	const prompt = context.getNodeParameter('prompt', itemIndex) as string;
	const aspectRatio = context.getNodeParameter('aspectRatio', itemIndex, '16:9') as string;
	const duration = context.getNodeParameter('duration', itemIndex, '5') as string;
	const resolution = context.getNodeParameter('resolution', itemIndex, '1080p') as string;

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
	if (additionalOptions.camera_fixed !== undefined) {
		body.camera_fixed = additionalOptions.camera_fixed;
	}
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
