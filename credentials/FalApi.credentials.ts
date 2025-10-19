import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class FalApi implements ICredentialType {
	name = 'falApi';

	displayName = 'Fal.ai API';

	icon = 'file:fal-ai-logo.svg' as Icon;

	documentationUrl = 'https://fal.ai/dashboard/keys';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			description: 'Your fal.ai API key (get it from fal.ai dashboard)',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Key {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://queue.fal.run/fal-ai/fast-sdxl',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: {
				prompt: 'a cat',
			},
		},
	};
}
