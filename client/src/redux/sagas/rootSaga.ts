import { all, AllEffect, fork, ForkEffect } from 'redux-saga/effects';

import todoSaga from '../todo/sagas';
import toastSaga from '../toast/sagas';

function* rootSaga(): Generator<AllEffect<ForkEffect<void>>, void, unknown> {
  yield all([fork(todoSaga), fork(toastSaga)]);
}

export default rootSaga;
