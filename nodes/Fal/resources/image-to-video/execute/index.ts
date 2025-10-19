import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { IMAGE_TO_VIDEO_MODEL_IDS, type ImageToVideoModelId } from '../models';
import { executeVeo2 } from './veo-2';
import { executeKlingV16Pro } from './kling-v1-6-pro';

/**
 * Model execution function mapping
 * Add new models here: map model ID to its execute function
 */
const MODEL_EXECUTORS: Record<
	ImageToVideoModelId,
	(context: IExecuteFunctions, itemIndex: number) => Promise<IDataObject>
> = {
	[IMAGE_TO_VIDEO_MODEL_IDS.VEO_2]: executeVeo2,
	[IMAGE_TO_VIDEO_MODEL_IDS.KLING_V1_6_PRO]: executeKlingV16Pro,
};

/**
 * Router function for image-to-video operations
 */
export async function executeImageToVideo(
	context: IExecuteFunctions,
	itemIndex: number,
): Promise<IDataObject> {
	const operation = context.getNodeParameter('operation', itemIndex) as string;

	if (operation === 'generateVideo') {
		const modelId = context.getNodeParameter('model', itemIndex) as ImageToVideoModelId;

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
		`The operation "${operation}" is not supported for image to video`,
		{ itemIndex },
	);
}
