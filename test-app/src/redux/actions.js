export const LOAD_USERS_LOADING = 'REDUX_SAGA_LOAD_USERS_LOADING';
export const LOAD_USERS_SUCCESS = 'REDUX_SAGA_LOAD_USERS_SUCCESS';
export const LOAD_USERS_ERROR = 'REDUX_SAGA_LOAD_USERS_ERROR';

export const USER_RANDOMIZE = 'REDUX_SAGA_USER_RANDOMIZE';

export const loadUsers = () => dispatch => {
    dispatch({ type: LOAD_USERS_LOADING });
};

export const userRandomize = () => dispatch => {
    dispatch({ type: USER_RANDOMIZE });
};
