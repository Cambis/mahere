import { load } from 'requests/internal/locations';

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

      const response = await load(parseData);

      dispatch({
        type: types.LOAD_SUCCESS,
        payload: response,
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

  console.log('foo');

  return validData;

  // return async dispatch => {
  //   dispatch({
  //     type: types.LOAD_SUCCESS,
  //     payload: "validData",
  //   });
  // }
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
      return { ...state, loading: false, items: action.payload };
    }
    case types.LOAD_ERROR: {
      return { ...state, loading: false, error: action.payload };
    }
    default:
      return state;
  }
}