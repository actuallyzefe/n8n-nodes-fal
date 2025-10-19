import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { NodeOperationError, sleep } from 'n8n-workflow';
import { QueueStatusResponseInterface } from '../interfaces';
import { QUEUE_STATUS } from '../enums';

/**
 * Helper function to poll queue status and get final result
 * Uses the URLs provided by fal.ai API in the submission response
 */
export async function pollQueueResult(
	context: IExecuteFunctions,
	statusUrl: string,
	responseUrl: string,
	itemIndex: number,
): Promise<IDataObject> {
	const maxAttempts = 240; // 20 minutes with 5s intervals
	const pollInterval = 5000; // 5 seconds

	// Get credentials for authentication
	const credentials = await context.getCredentials('falApi');
	const apiKey = credentials.apiKey as string;

	for (let attempt = 0; attempt < maxAttempts; attempt++) {
		try {
			// Check status using the provided status_url
			const statusResponse = (await context.helpers.request({
				method: 'GET',
				url: `${statusUrl}?logs=1`,
				headers: {
					Authorization: `Key ${apiKey}`,
				},
				json: true,
			})) as QueueStatusResponseInterface;

			if (statusResponse.status === QUEUE_STATUS.COMPLETED) {
				// Fetch final result using the provided response_url
				const result = (await context.helpers.request({
					method: 'GET',
					url: responseUrl,
					headers: {
						Authorization: `Key ${apiKey}`,
					},
					json: true,
				})) as IDataObject;

				return result;
			} else if (
				statusResponse.status === QUEUE_STATUS.IN_PROGRESS ||
				statusResponse.status === QUEUE_STATUS.IN_QUEUE
			) {
				// Log status for visibility
				const position = statusResponse.queue_position
					? ` (position: ${statusResponse.queue_position})`
					: '';
				context.logger.info(`Request status: ${statusResponse.status}${position}`);

				// Continue polling
				await sleep(pollInterval);
			} else {
				throw new NodeOperationError(
					context.getNode(),
					`Unexpected status: ${QUEUE_STATUS[statusResponse.status]}`,
					{ itemIndex },
				);
			}
		} catch (error) {
			throw new NodeOperationError(
				context.getNode(),
				`Error polling queue status: ${error.message}`,
				{ itemIndex },
			);
		}
	}

	throw new NodeOperationError(
		context.getNode(),
		`Request timed out after ${(maxAttempts * pollInterval) / 1000 / 60} minutes`,
		{ itemIndex },
	);
}
