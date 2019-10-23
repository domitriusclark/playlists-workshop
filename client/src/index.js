import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";

import resolvers from './apollo/resolvers';

import App from './App';

const httpLink = new HttpLink({
  uri: "http://localhost:4000"
});


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("Authorization");
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  resolvers,
  connectToDevTools: true,
  link: authLink.concat(httpLink)
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

