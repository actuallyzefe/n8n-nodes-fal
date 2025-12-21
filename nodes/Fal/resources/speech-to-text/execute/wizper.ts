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

	const body: IDataObject = {
		audio_url: audioUrl,
		language,
		task,
	};

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
