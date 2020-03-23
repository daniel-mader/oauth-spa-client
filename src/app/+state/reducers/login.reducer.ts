import { Action, createReducer, on } from '@ngrx/store';
import { logoutSuccess } from '../actions';

export interface State {
  isLoggedIn: boolean;
}

const initialState: State = {
  isLoggedIn: false
};

const loginReducer = createReducer(
  initialState,
  on(logoutSuccess, (state) => ({...state, isLoggedIn: false}))
);

export function reducer(state: State | undefined, action: Action) {
  return loginReducer(state, action);
}
