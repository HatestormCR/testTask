import { put, takeEvery, takeLatest, all, take, fork, cancel, select, delay } from 'redux-saga/effects';
import {
  LOAD_USERS_ERROR, LOAD_USERS_LOADING, LOAD_USERS_SUCCESS,
  START_RATING, END_RATING, PICK_RANDOM_AND_RATE
} from "./actions";
import { generateRandom, randomRateAndSort } from './utils';
import Api from '../api';

async function fetchAsync(func) {
    const response = await func();

    if (response.ok) {
        return await response.json();
    }

    throw new Error("Unexpected error!!!");
};

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
    // yield takeLatest(LOAD_USERS_LOADING, fetchUser);
};

function* waitAndRateSaga() {
  while(true) {
    const state = yield select();
    const randomMs = generateRandom(100, 900);
    const newData = yield randomRateAndSort(state);

    yield put({ type: PICK_RANDOM_AND_RATE, data: newData.data});
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

export default function* rootSaga() {
  yield all([
    usersSaga(),
    asyncRateSaga()
  ])
};
