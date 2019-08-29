import React from 'react';
import { observer, inject } from 'mobx-react';
import moment from 'moment';
import Helmet from 'react-helmet';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';

@inject('article')
@observer
class DayPic extends React.Component {
    constructor(props) {
        super(props);
        this.handleFromChange = this.handleFromChange.bind(this);
        this.handleToChange = this.handleToChange.bind(this);
        this.state = {
            from: undefined,
            to: undefined,
        };
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

    render() {
        const { from, to } = this.state;
        const modifiers = { start: from, end: to };
        return (

            <div className="input-group">
                {/* <div className="card my-4"> */}
                {/* <div className="card-body"> */}
                {/* <div className="InputFromTo"> */}
                {/* 시작일 : {' '} */}
                <row>
                <DayPickerInput
                    value={from}
                    placeholder="From"
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
                {/* <br />
                        <br /> */}
                        {' ~ '}
                {/* 종료일 : {' '} */}

                <DayPickerInput
                    ref={el => (this.to = el)}
                    value={to}
                    placeholder="To"
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
                {/* <div className="card-body" align="right">
                            <button className="btn btn-secondary" type="button" onClick={this.onSearchClick.bind(this)}>Go!</button>
                        </div> */}
                        </row>

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

                {/* </div> */}
                {/* </div> */}
            </div>

        );


    }

    onSearchClick() {
        const { getArticlesByDaypick } = this.props.article;
        getArticlesByDaypick({ from: this.state.from, to: this.state.to });

    }

}

export default DayPic;