import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import ArticleStore from './stores/articles';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-day-picker/lib/style.css';
import 'react-picky/dist/picky.css';

import App from './App';
// import Search from './components/search';
// import { from } from 'zen-observable';

const article = new ArticleStore();

ReactDOM.render(
    <Provider article={article}>
        <App />
    </Provider>,
    document.getElementById('root'));

    
// 9.0 수정 사항
//     frontend server,backend server 
//            srclist를 이용한 checkbox동작 구현 하기 


