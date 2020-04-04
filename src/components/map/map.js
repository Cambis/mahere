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
        latitude: -35.95670782454624,
        longitude: 173.9389632552626,
        zoom: 10.8,
      },
      popUpInfo: null
    };
  }

  _updateViewport = (viewport) => {
    console.log(viewport);
    const { minLat, maxLat, minLon, maxLon } = this.props;

    if (viewport.longitude < minLon) {
      viewport.longitude = minLon;
    } else if (viewport.longitude > maxLon) {
      viewport.longitude = maxLon;
    } else if (viewport.latitude < minLat) {
      viewport.latitude = minLat;
    } else if (viewport.latitude > maxLat) {
      viewport.latitude = maxLat;
    }

    this.setState({ viewport });
  }

  _onClick = (event) => {
    console.log(event.lngLat);
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
        onClick = {this._onClick}
      >
        {locations.map(this._renderLocationMarker)}

        {this._renderPopup()}

      </ReactMapGL>
    );
  }
}
// Ensure we have the props we need.
Map.propTypes = {
  locations: PropTypes.array.isRequired,
  minLat: PropTypes.number,
  maxLat: PropTypes.number,
  minLon: PropTypes.number,
  maxLon: PropTypes.number,
};

export default Map;