import React, { Component } from 'react';
import SummaryTable from './components/SummaryTable';
import aggregate from './util/aggregate';
import flatten from './util/flatten';
import './app.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summaryData: null,
    };
  }

  componentDidMount() {
    fetch('/api/timesheets/')
      .then((res) => res.json())
      .then((rows) => {
        this.setState({ summaryData: flatten(aggregate(rows)) });
      });
  }

  render() {
    return (
      <div className="table-container">
        {this.state.summaryData ? (
          <SummaryTable summaryData={this.state.summaryData} />
        ) : null}
      </div>
    );
  }
}
