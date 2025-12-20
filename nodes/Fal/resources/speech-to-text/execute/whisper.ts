import { IDataObject, IExecuteFunctions } from "n8n-workflow";
import { getModelConfig, SPEECH_TO_TEXT_MODEL_IDS } from "../model";
import { QueueSubmitResponseInterface } from "../../../interfaces";
import { pollQueueResult } from "../../../utils/poll-queue.util";


export async function executeWhisper(
    context: IExecuteFunctions, itemIndex: number
): Promise<IDataObject> {

    // Get model configuration
    const modelConfig = getModelConfig(SPEECH_TO_TEXT_MODEL_IDS.WHISPER);

    // Get required parameters (only required audioFileUrl)
    const audioFileUrl = context.getNodeParameter('audioFileUrl', itemIndex) as string;
    const language = context.getNodeParameter('language', itemIndex) as string;
    const task = context.getNodeParameter('task', itemIndex) as string;
    const additionalOptions = context.getNodeParameter(
        'additionalOptions',
        itemIndex,
        {},
    ) as IDataObject;

    const body: IDataObject = { //chunk_level,max_segment_len,merge_chunks,version (optional)
        audio_file_url: audioFileUrl,
        language,
        task,
    };

    // Submit to queue - fal.ai API 
    const submitResponse = await context.helpers.httpRequestWithAuthentication.call(
        context,
        'falApi',
        {
            method: 'POST',
            url: `https://queue.fal.run/${modelConfig.modelId}`,
            body,
            json: true,
        },
    ) as QueueSubmitResponseInterface;

    // Poll for result using the URLs provided by the API
    return await pollQueueResult(
        context,
        submitResponse.status_url,
        submitResponse.response_url,
        itemIndex,
    );
}