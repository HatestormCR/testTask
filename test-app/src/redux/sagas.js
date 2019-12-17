import { put, takeEvery, all, take, fork, cancel, select, delay } from 'redux-saga/effects';
import {
  LOAD_USERS_ERROR, LOAD_USERS_LOADING, LOAD_USERS_SUCCESS, SORT_DATA,
  START_RATING, END_RATING, PICK_RANDOM_AND_RATE, SORT_DESCENDING, SORT_ASCENDING
} from "./actions";
import { generateRandom, randomRate, sortData, fetchAsync } from './utils';
import Api from '../api';


//Вызывает ассинхронную фунцию, которая получает данные с API.
//данные передаются в state
export function* fetchUser() {
  try {
    const users = yield fetchAsync(Api.getUsers);
    yield put({type: LOAD_USERS_SUCCESS, data: users});
  } catch (e) {
    yield put({type: LOAD_USERS_ERROR, error: e.message});
  }
};

//бесконечный цикл в которой рандомному юзеру присваивается
//рандомный рейтинг. Также сортирует и помещает данные в state
export function* waitAndRateSaga() {
  while(true) {
    const state = yield select();
    const randomMs = generateRandom(100, 900);
    const newData = yield randomRate(state);
    const sort = yield sortData(newData);

    yield put({ type: PICK_RANDOM_AND_RATE, data: sort.data});
    yield delay(randomMs);
  }
};

//сортирует данные из state по возрастанию или убывания
export function* sortDataSaga() {
  const state = yield select();
  const sort = yield sortData(state);

  yield put({ type: SORT_DATA, data: sort.data});
}


function* usersSaga() {
  yield takeEvery(LOAD_USERS_LOADING, fetchUser);
};

function* asyncRateSaga() {
  while(true) {
    yield take(START_RATING);

    const task = yield fork(waitAndRateSaga);

    yield take(END_RATING);

    yield cancel(task);
  }
};

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
