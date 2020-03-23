import { Action, createReducer, on } from '@ngrx/store';
import { showError } from '../app.actions';

export interface State {
  message: string;
}

const initialState: State = {
  message: undefined
};

const errorReducer = createReducer(
  initialState,
  on(showError, (state, {message}) => ({...state, message}))
);

export function reducer(state: State | undefined, action: Action) {
  return errorReducer(state, action);
}
