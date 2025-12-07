import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { pollQueueResult } from '../../../utils/poll-queue.util';
import { QueueSubmitResponseInterface } from '../../../interfaces';
import { getModelConfig, RUN_LLM_MODEL_IDS } from '../models';

/**
 * Execute OpenRouter LLM text generation
 *
 * OpenRouter provides access to hundreds of LLM models through a unified API.
 * This executor handles the 'openrouter/router' endpoint which intelligently
 * routes requests to the specified model.
 */
export async function executeOpenRouter(
	context: IExecuteFunctions,
	itemIndex: number,
): Promise<IDataObject> {
	// Get model configuration
	const modelConfig = getModelConfig(RUN_LLM_MODEL_IDS.OPENROUTER);

	// Get required parameters
	const prompt = context.getNodeParameter('prompt', itemIndex) as string;
	const llmModel = context.getNodeParameter('llmModel', itemIndex) as string;

	// Determine the actual model to use
	let modelToUse = llmModel;
	if (llmModel === 'custom') {
		modelToUse = context.getNodeParameter('customModel', itemIndex) as string;
	}

	// Get additional options
	const additionalOptions = context.getNodeParameter(
		'additionalOptions',
		itemIndex,
		{},
	) as IDataObject;

	// Build request body according to fal.ai API documentation for OpenRouter
	const body: IDataObject = {
		prompt,
		model: modelToUse,
	};

	// Add optional parameters if provided
	if (additionalOptions.system_prompt) {
		body.system_prompt = additionalOptions.system_prompt;
	}
	if (additionalOptions.temperature !== undefined) {
		body.temperature = additionalOptions.temperature;
	}
	if (additionalOptions.max_tokens !== undefined && additionalOptions.max_tokens !== null) {
		body.max_tokens = additionalOptions.max_tokens;
	}
	if (additionalOptions.reasoning !== undefined) {
		body.reasoning = additionalOptions.reasoning;
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
