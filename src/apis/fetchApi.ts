import { PUBLIC_API_URL } from '$env/static/public';

interface FetchApiProps extends RequestInit {
	url: string;
}

/**
 * API 요청을 보낼 수 있도록 여러 옵션을 설정한 후 fetch를 사용하여 요청을 보내는 함수
 * @param {string} url - API 요청을 보낼 URL
 * @returns - API response
 */
export const fetchApi = async ({ url, headers, body, ...rest }: FetchApiProps) => {
	const options: RequestInit = {
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			...headers
		},
		body: body ?? undefined,
		...rest
	};

	return await fetch(`${PUBLIC_API_URL}/${url}`, options);
};
