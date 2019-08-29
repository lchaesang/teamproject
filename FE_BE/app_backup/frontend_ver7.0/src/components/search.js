import React from 'react';
import { observer, inject } from 'mobx-react';
//import DayPic from './daypicker';
import moment from 'moment';
import Helmet from 'react-helmet';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';

import './search.scss';


@inject('article')
@observer
class Search extends React.Component {
    constructor(props) {
        super(props);

        this.handleFromChange = this.handleFromChange.bind(this);
        this.handleToChange = this.handleToChange.bind(this);


        this.state = {
            searchText: '',
            from: undefined,
            to: undefined
        };

        var momnet = require('moment');
        this.default_from = momnet().subtract(1, 'w').format("YYYY-MM-DD")
        this.default_to = momnet().format("YYYY-MM-DD");
    }

    render() {
        const { from, to } = this.state;
        const modifiers = { start: from, end: to };



        return (
            <div className="card mb-4">
                <h5 className="card-header">뉴스 키워드 검색</h5>
                <div className="card-body">

                    <input type="text" className="form-control" placeholder="Search for..."
                        value={this.state.searchText} onChange={this.handleChange.bind(this)} />
                    <div className="">


                        {/* <DayPic /> */}
                        <div className="InputFromTo">
                            시작일 : {' '}&nbsp;&nbsp;
                            <DayPickerInput
                                value={from}
                                //placeholder="From"
                                placeholder={this.default_from}
                                format="YYYY-MM-DD"
                                formatDate={formatDate}
                                parseDate={parseDate}
                                dayPickerProps={{
                                    selectedDays: [from, { from, to }],
                                    disabledDays: { after: to },
                                    toMonth: to,
                                    modifiers,
                                    numberOfMonths: 1,
                                    onDayClick: () => this.to.getInput().focus(),
                                }}
                                onDayChange={this.handleFromChange}
                            />
                            <br/>
                            종료일 : {' '} &nbsp;&nbsp;
                            <DayPickerInput
                                ref={el => (this.to = el)}
                                value={to}
                                //placeholder="To"
                                placeholder={this.default_to}
                                format="YYYY-MM-DD"
                                formatDate={formatDate}
                                parseDate={parseDate}
                                dayPickerProps={{
                                    selectedDays: [from, { from, to }],
                                    disabledDays: { before: from },
                                    modifiers,
                                    month: from,
                                    fromMonth: from,
                                    numberOfMonths: 1,
                                }}
                                onDayChange={this.handleToChange}
                            />


                            {/* test */}

                        </div>
                        <div className="input-group-btn" align="right" >
                            <button className="btn btn-secondary" type="button" onClick={this.onSearchClick.bind(this)} >Go!</button>
                        </div>

                        
                    </div>
                </div>

                <Helmet>
                    <style>{`
                    .InputFromTo .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
                        background-color: #f0f8ff !important;
                        color: #4a90e2;
                    }
                    .InputFromTo .DayPicker-Day {
                        border-radius: 0 !important;
                    }
                    .InputFromTo .DayPicker-Day--start {
                        border-top-left-radius: 50% !important;
                        border-bottom-left-radius: 50% !important;
                    }
                    .InputFromTo .DayPicker-Day--end {
                        border-top-right-radius: 50% !important;
                        border-bottom-right-radius: 50% !important;
                    }
                    .InputFromTo .DayPickerInput-Overlay {
                        width: 550px;
                    }
                    .InputFromTo-to .DayPickerInput-Overlay {
                        margin-left: -198px;
                    }
                    `}</style>
                </Helmet>
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

        if (this.state.from === undefined || this.state.to === undefined) {
            getArticlesByKeyword({
                text: this.state.searchText,
            });
        } else {

            getArticlesByKeyword({
                text: this.state.searchText,
                from: moment(this.state.from).format('YYYY-MM-DD'),
                to: moment(this.state.to).format('YYYY-MM-DD')
            });
        }
    }

    showFromMonth() {
        const { from, to } = this.state;
        if (!from) {
            return;
        }
        if (moment(to).diff(moment(from), 'months') < 1) {
            this.to.getDayPicker().showMonth(from);
        }
    }

    handleFromChange(from) {
        // Change the from date and focus the "to" input field
        this.setState({ from });
    }

    handleToChange(to) {
        this.setState({ to }, this.showFromMonth);

    }

}

export default Search;
