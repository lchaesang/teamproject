import React from 'react';

import Articles from './articles';
import Search from './search';
import TagCloud from './tag-cloud';

export default class SummaryNews extends React.Component {
    render() {
        return (
            <React.Fragment>
                <p>
                    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fiexd-top">
                        <div class="container">
                            <a href="#" class="navbar-brand">
                                <h1 className="text-center">키워드 기반 뉴스 요약</h1>
                            </a>
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                                
                            </button>
                        </div>
                    </nav>
                </p>
                

                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <Articles />
                        </div>
                        <div className="col-md-4">
                            <Search />
                            <TagCloud />
                            
                        </div>
                    </div>
                </div>

                <footer className="py-5 bg-dark">
                    <div className="container">
                        <p className="m-0 text-center text-white">Copyright &copy; 데이터사이언스연구소</p>
                    </div>
                </footer>
            </React.Fragment>
        );
    }
}