import React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import PropTypes from 'prop-types';
import { LocationPin, LocationInfo, LocationPopup } from 'components';

class Map extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        width: 1920,
        height: 1080,
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
            currentZoom={this.state.viewport.zoom}
            onClick={()=> this.setState({popupInfo: location})} 
            name={location.name}
          />
        </Marker>
      );
    }
  }

  _renderPopup() {
    const { popupInfo } = this.state;

    return popupInfo && (
      <LocationPopup 
        info={popupInfo} 
        onClose={() => this.setState({ popupInfo: null })}
      />
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