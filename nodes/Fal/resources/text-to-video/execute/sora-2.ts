import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { pollQueueResult } from '../../../utils/poll-queue.util';
import { QueueSubmitResponseInterface } from '../../../interfaces';
import { getModelConfig, TEXT_TO_VIDEO_MODEL_IDS } from '../models';

/**
 * Execute Sora 2 text-to-video generation
 *
 * If a new Sora model is released with different parameters:
 * 1. Add the new model to models.ts with a unique ID
 * 2. Create a new execute file (e.g., sora-3.ts)
 * 3. Add model-specific parameters in description.ts
 * 4. Add to MODEL_EXECUTORS in execute/index.ts
 */
export async function executeSora2(
	context: IExecuteFunctions,
	itemIndex: number,
): Promise<IDataObject> {
	// Get model configuration
	const modelConfig = getModelConfig(TEXT_TO_VIDEO_MODEL_IDS.SORA_2);

	// Get required parameters
	const prompt = context.getNodeParameter('prompt', itemIndex) as string;
	const aspectRatio = context.getNodeParameter('aspectRatio', itemIndex, '16:9') as string;
	const duration = context.getNodeParameter('duration', itemIndex, '4') as string;
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
		duration: parseInt(duration, 10),
		resolution,
	};

	// Add optional parameters if provided
	if (additionalOptions.api_key) {
		body.api_key = additionalOptions.api_key;
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
