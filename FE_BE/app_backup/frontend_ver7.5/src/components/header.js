import React from 'react';
import { observer, inject } from 'mobx-react';


@inject('article')
@observer
class Header extends React.Component {
    render() {
        return (
            <p>
                < nav class="navbar navbar-expand-lg navbar-dark bg-dark fiexd-top" >
                    <div class="container">
                        <a href="#" class="navbar-brand">
                            <h1 onClick={this.onSearchClick.bind(this)} className="text-center">키워드 기반 뉴스 요약</h1>
                        </a>
                    </div>
                </nav >
            </p>
        )
    }

    onSearchClick() {
        const { getArticlesByKeyword } = this.props.article;
        getArticlesByKeyword({ text: '' });
    }

}


export default Header;