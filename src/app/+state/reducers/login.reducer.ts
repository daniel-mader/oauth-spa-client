import { Action, createReducer, on } from '@ngrx/store';
import { loginSuccess, logoutSuccess } from '../app.actions';

export interface State {
  isLoggedIn: boolean;
}

const initialState: State = {
  isLoggedIn: false
};

const loginReducer = createReducer(
  initialState,
  on(loginSuccess, (state) => ({...state, isLoggedIn: true})),
  on(logoutSuccess, (state) => ({...state, isLoggedIn: false}))
);

export function reducer(state: State | undefined, action: Action) {
  return loginReducer(state, action);
}
