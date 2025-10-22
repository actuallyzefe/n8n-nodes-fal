import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { TEXT_TO_SPEECH_MODEL_IDS, type TextToSpeechModelId } from '../models';
import { executeElevenLabsTurboV25 } from './elevenlabs-turbo-v2-5';

/**
 * Model execution function mapping
 * Add new models here: map model ID to its execute function
 */
const MODEL_EXECUTORS: Record<
	TextToSpeechModelId,
	(context: IExecuteFunctions, itemIndex: number) => Promise<IDataObject>
> = {
	[TEXT_TO_SPEECH_MODEL_IDS.ELEVENLABS_TURBO_V2_5]: executeElevenLabsTurboV25,
};

/**
 * Router function for text-to-speech operations
 */
export async function executeTextToSpeech(
	context: IExecuteFunctions,
	itemIndex: number,
): Promise<IDataObject> {
	const operation = context.getNodeParameter('operation', itemIndex) as string;

	if (operation === 'generate') {
		const modelId = context.getNodeParameter('model', itemIndex) as TextToSpeechModelId;

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
		`The operation "${operation}" is not supported for text to speech`,
		{ itemIndex },
	);
}
