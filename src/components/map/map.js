import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import PropTypes from 'prop-types';
import { LocationPin, LocationInfo } from 'components';

class Map extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        width: 400,
        height: 400,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
      },
      popUpInfo: null
    };
  }

  _updateViewport = (viewport) => {
    this.setState({ viewport });
  }

  _renderLocationMarker = (location, index) => {
    if (location) {
      return (
        <Marker
          key={`marker-${index}`}
          longitude={location.longitude}
          latitude={location.latitude}
        >
          <LocationPin 
            size={20}
            onClick={()=> this.setState({popupInfo: location})} 
          />
        </Marker>
      );
    }
  }

  _renderPopup() {
    const { popupInfo } = this.state;

    return popupInfo && (
      <Popup tipSize={5}
        anchor="top"
        longitude={popupInfo.longitude}
        latitude={popupInfo.latitude}
        closeOnClick={false}
        onClose={() => this.setState({ popupInfo: null })} >
        <LocationInfo info={popupInfo} />
      </Popup>
    );
  }

  render() {

    const { viewport } = this.state;

    return ( 
      <ReactMapGL 
        {...viewport}
        onViewportChange = {this._updateViewport}
        mapboxApiAccessToken = {process.env.REACT_APP_MAPBOX_KEY}
      >
        {this.props.locations.map(this._renderLocationMarker)}

        {this._renderPopup()}

      </ReactMapGL>
    );
  }
}
// Ensure we have the props we need.
Map.propTypes = {
  locations: PropTypes.array.isRequired,
};

export default Map;