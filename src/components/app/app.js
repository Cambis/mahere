import React from 'react';
import Papa from 'papaparse';
import { Map, Pin } from 'components';
import './app.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: [],
      filtered_data: [],
    }

    this._getData = this._getData.bind(this);
  }

  componentWillMount() {
    this._getCsvData();
  }

  _fetchCsv() {
    return fetch('/gaz_names.csv').then(function (response) {
        let reader = response.body.getReader();
        let decoder = new TextDecoder('utf-8');

        return reader.read().then(function (result) {
            return decoder.decode(result.value);
        });
    });
  }

  async _getCsvData() {
    let csvData = await this._fetchCsv();

    Papa.parse(csvData, {
      complete: this._getData
    });
  }

  _getData(result) {
    let data = result.data;
    let validData = [];

    data.forEach(d => {
      if (d[18] === "Yes" && d[24] === "LINE") {
        let validItem = {
          name: d[1],
          longitude: Number(d[12]),
          latitude: Number(d[11]),
        }
        validData.push(validItem);
      }
    })

    this.setState({ loading: false, data: validData }, () => console.log('loaded'));
  }

  render() {
    return (
      <div className="App">
        <Map locations={this.state.data} />
      </div>
    );
  }
}

export default App;
