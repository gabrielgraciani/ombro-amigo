import { combineReducers } from 'redux';

import todoReducer from '../todo/reducer';
import toastReducer from '../toast/reducer';

const rootReducer = combineReducers({
  todo: todoReducer,
  toast: toastReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
