import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';

const Map = () => {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });

  //var csv is the CSV file with headers
  const csvToJson = (csv) => {

    let lines = csv.split("\n");

    let result = [];

    let headers = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {

      let obj = {};
      let currentline = lines[i].split(",");

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);

    }

    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }

  return ( 
    <ReactMapGL {...viewport}
      onViewportChange = {setViewport}
      mapboxApiAccessToken = {process.env.REACT_APP_MAPBOX_KEY}
    />
  );
}

export default Map;