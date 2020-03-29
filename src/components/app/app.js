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
            <Map locations={locations.items}/> 
          </div>
        )
      }
    </>
  );
}

export default App;