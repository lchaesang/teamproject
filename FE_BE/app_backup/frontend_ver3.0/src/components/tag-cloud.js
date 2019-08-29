import React from 'react';
import { observer, inject } from 'mobx-react';
import ReactWordcloud from 'react-wordcloud';

@inject('article')
@observer
class TagCloud extends React.Component {
    render() {
        const { keywords } = this.props.article;

        // keywords.forEach((d) => {
        //     d.value = Math.random()*10;
        // });

        return (
            <div className="card my-4">
                <h5 className="card-header">키워드 클라우드</h5>
                <div className="card-body">
                    <ReactWordcloud
                        words={keywords}
                        callbacks={{
                            onWordClick: this.onWordClick.bind(this)
                        }} />
                </div>
            </div>
        );
    }

    onWordClick(word) {
        const { getArticlesByKeyword } = this.props.article;

        getArticlesByKeyword(word);
    }
}

export default TagCloud;