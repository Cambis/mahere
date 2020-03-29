import React from 'react';

const CityInfo = ({ info }) => {
  // console.log(info.name);
  return (
    <div style={{ color: "#000" }} >
      {info.name}
    </div>
  );
}

export default CityInfo;