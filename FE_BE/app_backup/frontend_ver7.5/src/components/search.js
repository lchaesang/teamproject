import React from 'react';
import { observer, inject } from 'mobx-react';
import moment from 'moment';
import Helmet from 'react-helmet';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import { ButtonToolbar, Button, Col } from 'react-bootstrap';


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
            to: undefined,
            searchOption:'option1'
        };
    }


    render() {
        const { from, to } = this.state;
        const modifiers = { start: from, end: to };


        return (
            <div className="card mb-4">
                <h5 className="card-header">뉴스 키워드 검색</h5>
                <div className="card-body">
                    {/*  teset */}
                    <div className="Select">
                        
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" value='option1' id="option1" name="option" checked={this.state.searchOption === 'option1'} onChange={(e)=> this.setState({searchOption:e.target.value})} />
                            <label class="custom-control-label" for="option1">Keyword</label>
                        </div>


                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" value='option2' id="option2" name="option" checked={this.state.searchOption==='option2'} onChange={(e)=> this.setState({searchOption:e.target.value})} />
                            <label class="custom-control-label" for="option2">All(with Contents)</label>
                        </div>
                    </div>


                    {/*  teset end */}
                    <input type="text" className="form-control" placeholder="Search for..."
                        value={this.state.searchText} onChange={this.handleChange.bind(this)} />

                    <div className="InputFromTo" >
                        <DayPickerInput
                            inputProps={{ style: { width: '100%' } }}
                            value={from}
                            placeholder={this.props.article.default_from}
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
                        <span >{'  '} ~ {'  '}</span>
                        <DayPickerInput
                            inputProps={{ style: { width: '100%' } }}
                            ref={el => (this.to = el)}
                            value={to}
                            placeholder={this.props.article.default_to}
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
                    </div>

                    <Button variant="outline-primary" block onClick={this.onSearchClick.bind(this)}>Go!</Button>

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
                    .InputFromTo .DayPickerInput{
                        width: 46%;
                        margin-top: 0.5em;
                        margin-bottom: 0.5em;
                    }
                    .InputFromTo .DayPickerInput-Overlay {
                        
                    }
                    .InputFromTo-to .DayPickerInput-Overlay {
                        margin-left: -198px;
                        
                    }
                    .Select{
                        margin-bottom: 0.5em;
                    }
                    `}</style>
                </Helmet>
            </div>
        )
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
                option: this.state.searchOption
            });
        } else {

            getArticlesByKeyword({
                text: this.state.searchText,
                from: moment(this.state.from).format('YYYY-MM-DD'),
                to: moment(this.state.to).format('YYYY-MM-DD'),
                option: this.state.searchOption
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