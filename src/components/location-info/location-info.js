import React from 'react';
import './location-info.scss';

const CityInfo = ({ info }) => {
  // console.log(info.name);
  return (
    <div className="location-info" style={{ color: "#000" }} >
      <div className="location-info__names">
        <div className="location-info__names--main">{info.name}</div>
        {info.other_names ? <div className="location-info__names--other">({info.other_names})</div> : ''}
      </div>
      <p class="location-info__translation"><i>{info.translation}</i></p>
    </div>
  );
}

export default CityInfo;