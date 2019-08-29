import React from 'react';
import Articles from './articles';
import Search from './search';
import TagCloud from './tag-cloud';
import DayPic from './daypicker';

export default class SummaryNews extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <Articles />
                        </div>
                        <div className="col-md-4">
                            <Search />
                            {/* <DayPic /> */}
                            <TagCloud />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }


}