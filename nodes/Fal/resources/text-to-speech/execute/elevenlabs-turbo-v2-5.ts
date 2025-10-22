import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { pollQueueResult } from '../../../utils/poll-queue.util';
import { QueueSubmitResponseInterface } from '../../../interfaces';
import { getModelConfig, TEXT_TO_SPEECH_MODEL_IDS } from '../models';

/**
 * Execute ElevenLabs Turbo v2.5 text-to-speech generation
 *
 * If a new ElevenLabs model is released with different parameters:
 * 1. Add the new model to models.ts with a unique ID
 * 2. Create a new execute file (e.g., elevenlabs-turbo-v3.ts)
 * 3. Add model-specific parameters in description.ts
 * 4. Add to MODEL_EXECUTORS in execute/index.ts
 */
export async function executeElevenLabsTurboV25(
	context: IExecuteFunctions,
	itemIndex: number,
): Promise<IDataObject> {
	// Get model configuration
	const modelConfig = getModelConfig(TEXT_TO_SPEECH_MODEL_IDS.ELEVENLABS_TURBO_V2_5);

	// Get required parameters
	const text = context.getNodeParameter('text', itemIndex) as string;
	const voice = context.getNodeParameter('voice', itemIndex, 'Rachel') as string;

	// Get additional options
	const additionalOptions = context.getNodeParameter(
		'additionalOptions',
		itemIndex,
		{},
	) as IDataObject;

	// Build request body according to fal.ai API documentation for this model
	const body: IDataObject = {
		text,
		voice,
	};

	// Add optional parameters if provided
	if (additionalOptions.stability !== undefined) {
		body.stability = additionalOptions.stability;
	}
	if (additionalOptions.similarity_boost !== undefined) {
		body.similarity_boost = additionalOptions.similarity_boost;
	}
	if (additionalOptions.style !== undefined) {
		body.style = additionalOptions.style;
	}
	if (additionalOptions.speed !== undefined) {
		body.speed = additionalOptions.speed;
	}
	if (additionalOptions.language_code) {
		body.language_code = additionalOptions.language_code;
	}
	if (additionalOptions.timestamps !== undefined) {
		body.timestamps = additionalOptions.timestamps;
	}
	if (additionalOptions.previous_text) {
		body.previous_text = additionalOptions.previous_text;
	}
	if (additionalOptions.next_text) {
		body.next_text = additionalOptions.next_text;
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
