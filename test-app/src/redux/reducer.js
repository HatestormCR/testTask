import {
  LOAD_USERS_ERROR, LOAD_USERS_LOADING, LOAD_USERS_SUCCESS,
  PICK_RANDOM_AND_RATE, SORT_ASCENDING, SORT_DESCENDING, SORT_DATA
} from "./actions";

const initialState = {
    data: [],
    loading: false,
    error: '',
    sort: false
};

export default function reduxSagaReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USERS_LOADING: {
      return {
        ...state,
        loading: true,
        error:''
      };
    }
    case LOAD_USERS_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false
      }
    }
    case LOAD_USERS_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }
    case PICK_RANDOM_AND_RATE: {
      return {
        ...state,
        data: action.data,
      };
    }
    case SORT_DATA: {
      return {
        ...state,
        data: action.data,
      };
    }
    case SORT_ASCENDING: {
      return {
        ...state,
        sort: action.payload,
      };
    }
    case SORT_DESCENDING: {
      return {
        ...state,
        sort: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
