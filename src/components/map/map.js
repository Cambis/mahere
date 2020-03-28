import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import PropTypes from 'prop-types';
import { LocationPin, LocationInfo } from 'components';

const Map = ({ locations }) => {

  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });

  const renderLocationMarker = (location, index) => {
    if (location) {
      return (
        <Marker
          key={`marker-${index}`}
          longitude={location.longitude}
          latitude={location.latitude}
        >
          <LocationPin size={20} name={location.name} />
        </Marker>
      );
    }
  }

  return ( 
    <ReactMapGL 
      {...viewport}
      onViewportChange = {setViewport}
      mapboxApiAccessToken = {process.env.REACT_APP_MAPBOX_KEY}
    >
      {locations.map(renderLocationMarker)}
    </ReactMapGL>
  );
}
// Ensure we have the props we need.
Map.propTypes = {
  locations: PropTypes.array.isRequired,
};

export default Map;