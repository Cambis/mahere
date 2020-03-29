import { readRemoteFile } from 'react-papaparse';

/* Types */
export const types = {
  LOAD: 'locations/load/start',
  LOAD_SUCCESS: 'locations/load/success',
  LOAD_ERROR: 'locations/load/error',
};

/* Action creators */
export function getLocations() {
  return async dispatch => {
    try {
      dispatch({
        type: types.LOAD,
      });

      readRemoteFile('gaz_names.csv', {
        step: function(results) {
          dispatch({
            type: types.LOAD_SUCCESS,
            payload: parseData(results),
          });
        },
        complete: function() {
          console.log("DONE");
        }
      });

    } catch (e) {
      dispatch({
        type: types.LOAD_ERROR,
        payload: e,
      });
      console.warn(e);
    }
  };
}

export function parseData(result) {
  let data = result.data;
  let validData = [];

  if (data[18] === "Yes") {
    let validItem = {
      name: data[1],
      longitude: Number(data[12]),
      latitude: Number(data[11]),
    }
    validData.push(validItem);
  }

  return validData;
}

export function finish() {
  return async dispatch => {
    dispatch({
      type: types.LOAD_COMPLETE,
    });
  }
}

/* Reducer defaults */
const initialState = {
  loading: true,
  error: null,
  items: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.LOAD: {
      return { ...state, loading: true };
    }
    case types.LOAD_SUCCESS: {
      return { ...state, loading: false, items: state.items.concat(action.payload) };
    }
    case types.LOAD_ERROR: {
      return { ...state, loading: false, error: action.payload };
    }
    default:
      return state;
  }
}