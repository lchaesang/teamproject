import React from 'react';
import { observer, inject } from 'mobx-react';

@inject('article')
@observer
class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: ''
        };
    }

    render() {
        return (
            <div className="card mb-4">
                <h5 className="card-header">뉴스 키워드 검색</h5>
                <div className="card-body">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search for..."
                            value={this.state.searchText} onChange={this.handleChange.bind(this)} />
                        <span className="input-group-btn">
                            <button className="btn btn-secondary" type="button" onClick={this.onSearchClick.bind(this)}>Go!</button>
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    handleChange(e) {
        this.setState({
            searchText: e.target.value
        })
    }

    onSearchClick() {
        const { getArticlesByKeyword } = this.props.article;

        getArticlesByKeyword({text: this.state.searchText});
    }
}

export default Search;