import { IExecuteFunctions, NodeOperationError,IDataObject } from "n8n-workflow";
import { executeWhisper } from "./whisper";
import { executeWizper } from "./wizper";
import { SPEECH_TO_TEXT_MODEL_IDS, SpeechToTextModelId } from "../model";

const MODEL_EXECUTORS: Record<
    SpeechToTextModelId,
    (context: IExecuteFunctions, itemIndex: number) => Promise<IDataObject>
> = {
    [SPEECH_TO_TEXT_MODEL_IDS.WHISPER]: executeWhisper,
    [SPEECH_TO_TEXT_MODEL_IDS.WIZPER]: executeWizper,
};
export async function executeSpeechToText(
    context: IExecuteFunctions, itemIndex: number
): Promise<IDataObject> {
    const operation = context.getNodeParameter('operation', itemIndex) as string;
    if (operation === 'transcribe') {
        const modelId = context.getNodeParameter('model', itemIndex) as SpeechToTextModelId;
        const executor = MODEL_EXECUTORS[modelId];
        if (!executor) {
            throw new Error(`Unsupported model ID: ${modelId}`);
        }
        return await executor(context, itemIndex);
    }
    throw new NodeOperationError(
        context.getNode(),
        `The operation "${operation}" is not supported for speech to text`,
        { itemIndex },
    );
}