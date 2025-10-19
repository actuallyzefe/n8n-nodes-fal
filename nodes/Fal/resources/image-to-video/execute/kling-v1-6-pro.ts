import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { pollQueueResult } from '../../../utils/poll-queue.util';
import { QueueSubmitResponseInterface } from '../../../interfaces';
import { getModelConfig, IMAGE_TO_VIDEO_MODEL_IDS } from '../models';

/**
 * Execute Kling Video v1.6 Pro image-to-video generation
 *
 * To add a new Kling variant:
 * 1. Copy this file and rename it (e.g., kling-v2-0-pro.ts)
 * 2. Update the model ID in models.ts
 * 3. Add new execute function to execute/index.ts MODEL_EXECUTORS
 * 4. Update parameter names in description.ts if they differ
 */
export async function executeKlingV16Pro(
	context: IExecuteFunctions,
	itemIndex: number,
): Promise<IDataObject> {
	// Get model configuration
	const modelConfig = getModelConfig(IMAGE_TO_VIDEO_MODEL_IDS.KLING_V1_6_PRO);

	// Get parameters (these are specific to Kling v1.6 Pro)
	const prompt = context.getNodeParameter('prompt', itemIndex) as string;
	const imageUrl = context.getNodeParameter('imageUrl', itemIndex) as string;
	const duration = context.getNodeParameter('durationKling', itemIndex, '5') as string;
	const additionalOptions = context.getNodeParameter(
		'additionalOptions',
		itemIndex,
		{},
	) as IDataObject;

	// Build request body according to fal.ai API documentation for this model
	const body: IDataObject = {
		prompt,
		image_url: imageUrl,
		duration,
	};

	// Add optional parameters
	if (additionalOptions.aspectRatio) {
		body.aspect_ratio = additionalOptions.aspectRatio;
	}
	if (additionalOptions.negativePrompt) {
		body.negative_prompt = additionalOptions.negativePrompt;
	}
	if (additionalOptions.cfgScale !== undefined) {
		body.cfg_scale = additionalOptions.cfgScale;
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
