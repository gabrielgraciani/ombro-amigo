import { all, AllEffect, fork, ForkEffect } from 'redux-saga/effects';

import todoSaga from './todoSaga';

function* rootSaga(): Generator<AllEffect<ForkEffect<void>>, void, unknown> {
  yield all([fork(todoSaga)]);
}

export default rootSaga;
