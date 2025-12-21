import type { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { getModelConfig, SPEECH_TO_TEXT_MODEL_IDS } from '../models';
import { QueueSubmitResponseInterface } from '../../../interfaces';
import { pollQueueResult } from '../../../utils/poll-queue.util';

/**
 * Execute Whisper speech-to-text transcription
 *
 * Whisper is OpenAI's model for speech transcription and translation.
 */
export async function executeWhisper(
	context: IExecuteFunctions,
	itemIndex: number,
): Promise<IDataObject> {
	// Get model configuration
	const modelConfig = getModelConfig(SPEECH_TO_TEXT_MODEL_IDS.WHISPER);

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
	if (additionalOptions.diarize !== undefined) {
		body.diarize = additionalOptions.diarize;
	}
	if (additionalOptions.chunk_level) {
		body.chunk_level = additionalOptions.chunk_level;
	}
	if (additionalOptions.batch_size !== undefined) {
		body.batch_size = additionalOptions.batch_size;
	}
	if (additionalOptions.prompt) {
		body.prompt = additionalOptions.prompt;
	}
	if (additionalOptions.num_speakers !== undefined) {
		body.num_speakers = additionalOptions.num_speakers;
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
