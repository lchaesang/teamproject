import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import SummaryNews from './components/summary-news';
import Header from './components/header';
import Footer from './components/footer';

 const client = new ApolloClient({
//     //uri: 'http://newsbackend.is.hubpop.io'
     uri: 'http://localhost:4000'
 });

function App() {
    return (
        <ApolloProvider client={client}>
            <Header/>
            <SummaryNews />
            <Footer/>
        </ApolloProvider>
    );
}

export default App;
