import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { SPEECH_TO_TEXT_MODEL_IDS, type SpeechToTextModelId } from '../models';
import { executeWhisper } from './whisper';
import { executeWizper } from './wizper';

/**
 * Model execution function mapping
 * Add new models here: map model ID to its execute function
 */
const MODEL_EXECUTORS: Record<
	SpeechToTextModelId,
	(context: IExecuteFunctions, itemIndex: number) => Promise<IDataObject>
> = {
	[SPEECH_TO_TEXT_MODEL_IDS.WHISPER]: executeWhisper,
	[SPEECH_TO_TEXT_MODEL_IDS.WIZPER]: executeWizper,
};

/**
 * Router function for speech-to-text operations
 */
export async function executeSpeechToText(
	context: IExecuteFunctions,
	itemIndex: number,
): Promise<IDataObject> {
	const operation = context.getNodeParameter('operation', itemIndex) as string;

	if (operation === 'transcribe') {
		const modelId = context.getNodeParameter('model', itemIndex) as SpeechToTextModelId;

		// Get the executor function for this model
		const executor = MODEL_EXECUTORS[modelId];
		if (!executor) {
			throw new NodeOperationError(
				context.getNode(),
				`No executor function defined for model "${modelId}". Please add it to MODEL_EXECUTORS in execute/index.ts`,
				{ itemIndex },
			);
		}

		return await executor(context, itemIndex);
	}

	throw new NodeOperationError(
		context.getNode(),
		`The operation "${operation}" is not supported for speech to text`,
		{ itemIndex },
	);
}
