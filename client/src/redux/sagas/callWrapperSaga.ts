import { call } from 'redux-saga/effects';
import store from '../store/store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
function* callWrapperSaga(fn: any, ...args: any[]): Generator {
  try {
    return yield call(fn, ...args);
  } catch (error) {
    store.dispatch({
      type: 'ADD_TOAST',
      payload: {
        type: 'error',
        title: error.message,
        description: 'Ocorreu um erro, tente novamente mais tarde',
      },
    });

    return { error };
  }
}

export default callWrapperSaga;
