import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import ArticleStore from './stores/articles';

import 'bootstrap/dist/css/bootstrap.css';

import App from './App';

const article = new ArticleStore();

ReactDOM.render(
    <Provider article={article}>
        <App />
    </Provider>,
    document.getElementById('root'));

// moment().format('YYYY-MM-DD HH:mm:ss')