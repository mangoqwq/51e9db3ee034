import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const eventsApiLink = new HttpLink({
    uri: 'https://api.hackthenorth.com/v3/frontend-challenge',
});

export const eventsApiClient = new ApolloClient({
    link: eventsApiLink,
    cache: new InMemoryCache(),
    defaultOptions: {
        query: {
            fetchPolicy: 'cache-first',
        },
    },
});
