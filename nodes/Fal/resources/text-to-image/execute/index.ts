import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { TEXT_TO_IMAGE_MODEL_IDS, type TextToImageModelId } from '../models';
import { executeNanoBanana } from './nano-banana';
import { executeNanoBanana2 } from './nano-banana-2';
import { executeImagen4 } from './imagen-4';

/**
 * Model execution function mapping
 * Add new models here: map model ID to its execute function
 */
const MODEL_EXECUTORS: Record<
	TextToImageModelId,
	(context: IExecuteFunctions, itemIndex: number) => Promise<IDataObject>
> = {
	[TEXT_TO_IMAGE_MODEL_IDS.NANO_BANANA]: executeNanoBanana,
	[TEXT_TO_IMAGE_MODEL_IDS.NANO_BANANA_2]: executeNanoBanana2,
	[TEXT_TO_IMAGE_MODEL_IDS.IMAGEN_4]: executeImagen4,
};

/**
 * Router function for text-to-image operations
 */
export async function executeTextToImage(
	context: IExecuteFunctions,
	itemIndex: number,
): Promise<IDataObject> {
	const operation = context.getNodeParameter('operation', itemIndex) as string;

	if (operation === 'generate') {
		const modelId = context.getNodeParameter('model', itemIndex) as TextToImageModelId;

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
		`The operation "${operation}" is not supported for text to image`,
		{ itemIndex },
	);
}
