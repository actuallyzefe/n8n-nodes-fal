import type { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { getModelConfig, SPEECH_TO_TEXT_MODEL_IDS } from '../models';
import { QueueSubmitResponseInterface } from '../../../interfaces';
import { pollQueueResult } from '../../../utils/poll-queue.util';

/**
 * Execute Wizper speech-to-text transcription
 *
 * Wizper is Whisper v3 Large optimized by fal.ai - same accuracy, double the performance.
 */
export async function executeWizper(
	context: IExecuteFunctions,
	itemIndex: number,
): Promise<IDataObject> {
	// Get model configuration
	const modelConfig = getModelConfig(SPEECH_TO_TEXT_MODEL_IDS.WIZPER);

	// Get required parameters
	const audioUrl = context.getNodeParameter('audioUrl', itemIndex) as string;
	const language = context.getNodeParameter('language', itemIndex) as string;
	const task = context.getNodeParameter('task', itemIndex) as string;

	// Get additional options
	const additionalOptions = context.getNodeParameter(
		'additionalOptions',
		itemIndex,
		{},
	) as IDataObject;

	const body: IDataObject = {
		audio_url: audioUrl,
		language,
		task,
	};

	// Add optional parameters if provided
	if (additionalOptions.chunk_level) {
		body.chunk_level = additionalOptions.chunk_level;
	}
	if (additionalOptions.max_segment_len !== undefined) {
		body.max_segment_len = additionalOptions.max_segment_len;
	}
	if (additionalOptions.merge_chunks !== undefined) {
		body.merge_chunks = additionalOptions.merge_chunks;
	}

	// Submit to queue
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
