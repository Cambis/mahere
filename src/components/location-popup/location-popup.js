import React from 'react';
import { Popup } from 'react-map-gl';
import { LocationInfo } from 'components';

const LocationPopup = ({info, onClose}) => {
  return (
    <Popup 
      tipSize={5}
      anchor="top"
      longitude={info.longitude}
      latitude={info.latitude}
      closeOnClick={false}
      onClose={onClose} 
    >
      <LocationInfo info={info} />
    </Popup>
  );
}

export default LocationPopup;