import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import SummaryNews from './components/summary-news';

const client = new ApolloClient({
    uri: 'http://reactbackend.is.hubpop.io'
});

function App() {
    return (
        <ApolloProvider client={client}>
            <SummaryNews />
        </ApolloProvider>
    );
}

export default App;
