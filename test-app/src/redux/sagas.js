import { put, takeEvery, all, take, fork, cancel, select, delay } from 'redux-saga/effects';
import {
  LOAD_USERS_ERROR, LOAD_USERS_LOADING, LOAD_USERS_SUCCESS, SORT_DATA,
  START_RATING, END_RATING, PICK_RANDOM_AND_RATE, SORT_DESCENDING, SORT_ASCENDING
} from "./actions";
import { generateRandom, randomRate, sortData, fetchAsync } from './utils';
import Api from '../api';

function* fetchUser() {
  try {
    const users = yield fetchAsync(Api.getUsers);
    yield put({type: LOAD_USERS_SUCCESS, data: users});
  } catch (e) {
    yield put({type: LOAD_USERS_ERROR, error: e.message});
  }
};


function* usersSaga() {
  yield takeEvery(LOAD_USERS_LOADING, fetchUser);
};

function* waitAndRateSaga() {
  while(true) {
    const state = yield select();
    const randomMs = generateRandom(100, 900);
    const newData = yield randomRate(state);
    const sort = yield sortData(newData);

    yield put({ type: PICK_RANDOM_AND_RATE, data: sort.data});
    yield delay(randomMs);
  }
};

function* asyncRateSaga() {
  while(true) {
    yield take(START_RATING);

    const task = yield fork(waitAndRateSaga);

    yield take(END_RATING);

    yield cancel(task);
  }
};

function* sortDataSaga() {
  const state = yield select();
  const sort = yield sortData(state);

  yield put({ type: SORT_DATA, data: sort.data});
}

function* asyncSortSaga() {
  yield takeEvery(SORT_DESCENDING, sortDataSaga);
  yield takeEvery(SORT_ASCENDING, sortDataSaga);
};

export default function* rootSaga() {
  yield all([
    usersSaga(),
    asyncRateSaga(),
    asyncSortSaga()
  ])
};
