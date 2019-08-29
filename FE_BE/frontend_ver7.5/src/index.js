import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import ArticleStore from './stores/articles';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-day-picker/lib/style.css';


import App from './App';

const article = new ArticleStore();

ReactDOM.render(
    <Provider article={article}>
        <App />
    </Provider>,
    document.getElementById('root'));