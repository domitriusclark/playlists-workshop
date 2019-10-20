import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';

import resolvers from './apollo/resolvers';

import App from './App';

const cache = new InMemoryCache();
const client = new ApolloClient({
    cache,
    resolvers,
    connectToDevTools: true
})

// Sets up an initial state for Apollo's local state management
cache.writeData({
    data: {}
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);

