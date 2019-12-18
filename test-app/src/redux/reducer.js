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

const loadUsersLoading = state => ({
  ...state,
  loading: true,
  error:''
});

const loadUsersSuccess = (state, data) => ({
  ...state,
  data: data,
  loading: false
});

const loadUsersError = (state, error) => ({
  ...state,
  loading: false,
  error: error
});

const pickRandomAndRate = (state, data) => ({
  ...state,
  data: data,
});

const sortData = (state, data) => ({
  ...state,
  data: data,
});

const sortAscending = (state, payload) => ({
  ...state,
  sort: payload,
});

const sortDescending = (state, payload) => ({
  ...state,
  sort: payload,
});

export default function reduxSagaReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USERS_LOADING: {
      return loadUsersLoading(state);
    }
    case LOAD_USERS_SUCCESS: {
      return loadUsersSuccess(state, action.data);
    }
    case LOAD_USERS_ERROR: {
      return loadUsersError(state, action.error);
    }
    case PICK_RANDOM_AND_RATE: {
      return pickRandomAndRate(state, action.data);
    }
    case SORT_DATA: {
      return sortData(state, action.data);
    }
    case SORT_ASCENDING: {
      return sortAscending(state, action.payload);
    }
    case SORT_DESCENDING: {
      return sortDescending(state, action.payload);
    }
    default: {
      return state;
    }
  }
}
