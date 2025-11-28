import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { IMAGE_TO_VIDEO_MODEL_IDS, type ImageToVideoModelId } from '../models';
import { executeVeo2 } from './veo-2';
import { executeKlingV16Pro } from './kling-v1-6-pro';
import { executeSora2Pro } from './sora-2-pro';
import { executeSora2 } from './sora-2';
import { executeSeedanceV1ProFast } from './seedance-v1-pro-fast';
import { executeVeo31ReferenceToVideo } from './veo-3-1-reference-to-video';
import { executeVeo31FastFirstLastFrame } from './veo-3-1-fast-first-last-frame';
import { executeVeo31FirstLastFrame } from './veo-3-1-first-last-frame';
import { executeVeo31ImageToVideo } from './veo-3-1-image-to-video';
import { executeVeo31FastImageToVideo } from './veo-3-1-fast-image-to-video';

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
	[IMAGE_TO_VIDEO_MODEL_IDS.SORA_2_PRO]: executeSora2Pro,
	[IMAGE_TO_VIDEO_MODEL_IDS.SORA_2]: executeSora2,
	[IMAGE_TO_VIDEO_MODEL_IDS.SEEDANCE_V1_PRO_FAST]: executeSeedanceV1ProFast,
	[IMAGE_TO_VIDEO_MODEL_IDS.VEO_3_1_REFERENCE_TO_VIDEO]: executeVeo31ReferenceToVideo,
	[IMAGE_TO_VIDEO_MODEL_IDS.VEO_3_1_FAST_FIRST_LAST_FRAME]: executeVeo31FastFirstLastFrame,
	[IMAGE_TO_VIDEO_MODEL_IDS.VEO_3_1_FIRST_LAST_FRAME]: executeVeo31FirstLastFrame,
	[IMAGE_TO_VIDEO_MODEL_IDS.VEO_3_1_IMAGE_TO_VIDEO]: executeVeo31ImageToVideo,
	[IMAGE_TO_VIDEO_MODEL_IDS.VEO_3_1_FAST_IMAGE_TO_VIDEO]: executeVeo31FastImageToVideo,
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
