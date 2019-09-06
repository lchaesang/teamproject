import React from 'react';
import { observer, inject } from 'mobx-react';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import BounceLoader from 'react-spinners/BounceLoader'
import LoadingOverlay from 'react-loading-overlay';

import Header from './components/header';
import SummaryNews from './components/summary-news';
import Footer from './components/footer';
import './App.scss';


const client = new ApolloClient({
    uri: 'http://localhost'
});

@inject('article')
@observer
class App extends React.Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <div className="Article-App">
                    <Header />
                    <SummaryNews />
                    <Footer />
                    <LoadingOverlay
                        style={{ position: 'static' }}
                        active={this.props.article.isGlobalLoading}
                        spinner={<BounceLoader />}
                        text='Loading...'
                    >
                        {this.children}
                    </LoadingOverlay>
                </div>
            </ApolloProvider>
        );
    }

}

export default App;
