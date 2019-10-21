import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';

// We will use the setContext function to allow us to plug multiple links into the ApolloClient
import { setContext } from "apollo-link-context";

import resolvers from './apollo/resolvers';

import App from './App';



const authLink = setContent(() => {
    // We will need to create a way to hold the session using the 
    // ApolloClient to pass the authed user we were setting on the Headers
})

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

