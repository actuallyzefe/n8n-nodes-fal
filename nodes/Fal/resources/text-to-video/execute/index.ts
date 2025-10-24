import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { TEXT_TO_VIDEO_MODEL_IDS, type TextToVideoModelId } from '../models';
import { executeSora2 } from './sora-2';
import { executeSora2Pro } from './sora-2-pro';
import { executeSeedanceV1ProFast } from './seedance-v1-pro-fast';
import { executeVeo31 } from './veo-3-1';
import { executeVeo31Fast } from './veo-3-1-fast';

/**
 * Model execution function mapping
 * Add new models here: map model ID to its execute function
 */
const MODEL_EXECUTORS: Record<
	TextToVideoModelId,
	(context: IExecuteFunctions, itemIndex: number) => Promise<IDataObject>
> = {
	[TEXT_TO_VIDEO_MODEL_IDS.SORA_2]: executeSora2,
	[TEXT_TO_VIDEO_MODEL_IDS.SORA_2_PRO]: executeSora2Pro,
	[TEXT_TO_VIDEO_MODEL_IDS.SEEDANCE_V1_PRO_FAST]: executeSeedanceV1ProFast,
	[TEXT_TO_VIDEO_MODEL_IDS.VEO_3_1]: executeVeo31,
	[TEXT_TO_VIDEO_MODEL_IDS.VEO_3_1_FAST]: executeVeo31Fast,
};

/**
 * Router function for text-to-video operations
 */
export async function executeTextToVideo(
	context: IExecuteFunctions,
	itemIndex: number,
): Promise<IDataObject> {
	const operation = context.getNodeParameter('operation', itemIndex) as string;

	if (operation === 'generate') {
		const modelId = context.getNodeParameter('model', itemIndex) as TextToVideoModelId;

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
		`The operation "${operation}" is not supported for text to video`,
		{ itemIndex },
	);
}
