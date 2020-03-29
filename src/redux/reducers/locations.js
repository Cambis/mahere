import { readRemoteFile } from 'react-papaparse';

/* Types */
export const types = {
  LOAD: 'locations/load/start',
  LOAD_SUCCESS: 'locations/load/success',
  LOAD_FINISH: 'locations/load/finish',
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
        step: function(result) {
          let location = parseData(result);
          if (location) {
            dispatch({
              type: types.LOAD_SUCCESS,
              payload: location,
            });
          }
        },
        complete: function() {
          dispatch({
            type: types.LOAD_FINISH
          });
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

  if (data[18] === "Yes") {
    let validItem = {
      name: data[1],
      longitude: Number(data[12]),
      latitude: Number(data[11]),
    }
    return validItem;
  }

  return null;
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
      return { ...state, loading: true, items: action.payload != null ? state.items.concat(action.payload) : state.items };
    }
    case types.LOAD_FINISH: {
      return { ...state, loading: false };
    }
    case types.LOAD_ERROR: {
      return { ...state, loading: false, error: action.payload };
    }
    default:
      return state;
  }
}