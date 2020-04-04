import React from 'react';

const CityInfo = ({ info }) => {
  // console.log(info.name);
  return (
    <div style={{ color: "#000" }} >
      <h3>{info.name}</h3>
      {info.other_names ? <p>({info.other_names})</p> : ''}
      <p><i>{info.translation}</i></p>
    </div>
  );
}

export default CityInfo;