import React from 'react';
import { observer, inject } from 'mobx-react';
import ReactWordcloud from 'react-wordcloud';
import { Badge } from 'react-bootstrap';

@inject('article')
@observer
class TagCloud extends React.Component {
    render() {
        const { keywords } = this.props.article;
        var momnet = require('moment');
        this.default_from = momnet().subtract(1, 'w').format("YYYY-MM-DD")
        this.default_to = momnet().format("YYYY-MM-DD");

        return (
            <div className="card my-4">
                <div className="card-header">
                    <h5 className="noinline">키워드 클라우드</h5>
                    <p class="font-weight-light">
                    [{this.default_from} ~ {this.default_to}]    
                    </p>


                </div>
                {/* <div className="card-body"> */}
                <ReactWordcloud
                    options={{ rotations: 1, rotationAngles: [0] }}
                    words={keywords}
                    callbacks={{
                        onWordClick: this.onWordClick.bind(this)
                    }} />
                {/* </div> */}
            </div>
        );
    }

    onWordClick(word) {
        const { getArticlesByKeyword } = this.props.article;
        getArticlesByKeyword(word);

    }
}

export default TagCloud;