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

      const response = await load();

      dispatch({
        type: types.LOAD_SUCCESS,
        payload: response.items,
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

/* Reducer defaults */
const initialState = {
  loading: false,
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