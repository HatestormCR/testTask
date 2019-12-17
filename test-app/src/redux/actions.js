export const LOAD_USERS_LOADING = 'REDUX_SAGA_LOAD_USERS_LOADING';
export const LOAD_USERS_SUCCESS = 'REDUX_SAGA_LOAD_USERS_SUCCESS';
export const LOAD_USERS_ERROR = 'REDUX_SAGA_LOAD_USERS_ERROR';

export const START_RATING = 'REDUX_SAGA_START_RATING';
export const END_RATING = 'REDUX_SAGA_END_RATING';
export const PICK_RANDOM_AND_RATE = 'REDUX_SAGA_PICK_RANDOM_AND_RATE';
export const SORT_DATA = 'REDUX_SAGA_SORT_DATA';
export const SORT_DESCENDING = 'REDUX_SAGA_SORT_DESCENDING';
export const SORT_ASCENDING = 'REDUX_SAGA_SORT_ASCENDING ';

export const loadUsers = () => dispatch => {
  dispatch({ type: LOAD_USERS_LOADING });
};

export const startRating = () => dispatch => {
  dispatch({ type: START_RATING });
};

export const endRating = () => dispatch => {
  dispatch({ type: END_RATING });
};

export const ascSort = () => dispatch => {
  dispatch({ type: SORT_ASCENDING, payload: 'ascending' });
};

export const descSort = () => dispatch => {
  dispatch({ type: SORT_DESCENDING, payload: 'descending' });
};
