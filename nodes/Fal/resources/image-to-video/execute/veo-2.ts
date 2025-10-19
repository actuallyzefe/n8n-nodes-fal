import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { pollQueueResult } from '../../../utils/poll-queue.util';
import { QueueSubmitResponseInterface } from '../../../interfaces';
import { getModelConfig, IMAGE_TO_VIDEO_MODEL_IDS } from '../models';

/**
 * Execute Veo 2 image-to-video generation
 *
 * If a new Veo model is released with different parameters:
 * 1. Add the new model to models.ts with a unique ID
 * 2. Create a new execute file (e.g., veo-3.ts)
 * 3. Add model-specific parameters in description.ts
 * 4. Add to MODEL_EXECUTORS in execute/index.ts
 */
export async function executeVeo2(
	context: IExecuteFunctions,
	itemIndex: number,
): Promise<IDataObject> {
	// Get model configuration
	const modelConfig = getModelConfig(IMAGE_TO_VIDEO_MODEL_IDS.VEO_2);

	// Get parameters (these are specific to Veo 2)
	const prompt = context.getNodeParameter('prompt', itemIndex) as string;
	const imageUrl = context.getNodeParameter('imageUrl', itemIndex) as string;
	const aspectRatio = context.getNodeParameter('aspectRatio', itemIndex, 'auto') as string;
	const duration = context.getNodeParameter('durationVeo', itemIndex, '5s') as string;

	// Build request body according to fal.ai API documentation for this model
	const body: IDataObject = {
		prompt,
		image_url: imageUrl,
		aspect_ratio: aspectRatio,
		duration,
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
