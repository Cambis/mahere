import React from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import PropTypes from 'prop-types';
import { LocationPin, LocationInfo } from 'components';

class Map extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        width: 1280,
        height: 720,
        latitude: -42.0375277,
        longitude: 173.6751879,
        zoom: 5
      },
      popUpInfo: null
    };
  }

  _updateViewport = (viewport) => {
    this.setState({ viewport });
  }

  _renderLocationMarker = (location, index) => {
    if (location) {
      // console.log(location.name);
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
    const { locations } = this.props;

    return ( 
      <ReactMapGL 
        {...viewport}
        onViewportChange = {this._updateViewport}
        mapboxApiAccessToken = {process.env.REACT_APP_MAPBOX_KEY}
      >
        {locations.map(this._renderLocationMarker)}

        {this._renderPopup()}

      </ReactMapGL>
    );
  }
}
// Ensure we have the props we need.
Map.propTypes = {
  locations: PropTypes.array,
};

export default Map;