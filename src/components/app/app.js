import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLocations } from 'redux/reducers/locations';

import { Map } from 'components';
import './app.css';

const App = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLocations());
  }, []);

  const locations = useSelector(state => state.locations);

  return (
    <>
      {
        locations.loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="App" >
            <Map 
              locations={locations.items}
              minLat={-36.07983465748746}
              maxLat={-35.8548076562247}
              minLon={173.69721182000902}
              maxLon={174.0292749659953}
            /> 
          </div>
        )
      }
    </>
  );
}

export default App;