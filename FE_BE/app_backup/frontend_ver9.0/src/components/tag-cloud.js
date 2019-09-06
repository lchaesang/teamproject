import React from 'react';
import { observer, inject } from 'mobx-react';
import ReactWordcloud from 'react-wordcloud';
import Helmet from 'react-helmet';
//import { Badge } from 'react-bootstrap';

@inject('article')
@observer
class TagCloud extends React.Component {
    render() {
        const { keywords } = this.props.article;
        let { searchkeywords } = this.props.article;
        let title = "키워드 기반 클라우드";
        
        //  var momnet = require('moment');
        //  this.default_from = momnet().subtract(1, 'w').format("YYYY-MM-DD")
        //  this.default_to = momnet().format("YYYY-MM-DD");
        if(searchkeywords !== ''){            
            searchkeywords = "(" + searchkeywords + ") 관련 키워드";
        }

        return (
            <div className="card my-4">
                <div className="card-header">
                    <h5 > {title}</h5>
                    <p className="align-text">{searchkeywords}</p>
                    {/* <p class="font-weight-light">
                    [{this.default_from} ~ {this.default_to}]
                    </p> */}
    
                </div>
                {/* <div className="card-body"> */}
                <ReactWordcloud
                    options={{ rotations: 1, rotationAngles: [0] }}
                    words={keywords}
                    callbacks={{
                        onWordClick: this.onWordClick.bind(this)
                    }} />
                {/* </div> */}


                <Helmet>
                    <style>{`                  
                    .align-text{
                        font-size: 1.0rem;
                        
                    }
                    `}</style>
                </Helmet>
            </div>
        );
    }

    onWordClick(text) {
        const { getArticlesByKeyword } = this.props.article;
        getArticlesByKeyword(text);

    }
}

export default TagCloud;