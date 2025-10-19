import { QUEUE_STATUS } from '../enums';

interface Log {
	message: string;
	timestamp: string;
}

export interface QueueStatusResponseInterface {
	status: QUEUE_STATUS;
	queue_position?: number;
	logs?: Array<Log>;
}
