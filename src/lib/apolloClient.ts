import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { createHttpLink } from '@apollo/client/link/http';
import { setContext } from '@apollo/client/link/context';
import { getActor } from '@/utils/actor';

const httpLink = createHttpLink({
	uri: 'http://localhost:8000/graphql'
});

const authLink = setContext((_, { headers }) => {
	const token = getActor('authActor').context.token;

	return {
		headers: {
			...headers,
			'Content-Type': 'application/json; charset=utf-8',
			...(token ? { Authorization: `Bearer ${token}` } : {})
		}
	};
});

const link = authLink.concat(httpLink);

const cache = new InMemoryCache();

const client = new ApolloClient({
	cache,
	link,
	defaultOptions: {
		watchQuery: {
			errorPolicy: 'all'
		},
		query: {
			errorPolicy: 'all'
		},
		mutate: {
			errorPolicy: 'all'
		}
	}
});

export default client;
