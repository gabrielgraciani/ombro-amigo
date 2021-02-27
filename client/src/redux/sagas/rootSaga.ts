import { all, AllEffect, fork, ForkEffect } from 'redux-saga/effects';

import todoSaga from '../todo/sagas';

function* rootSaga(): Generator<AllEffect<ForkEffect<void>>, void, unknown> {
  yield all([fork(todoSaga)]);
}

export default rootSaga;
