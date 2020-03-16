import { Action, createReducer, on } from '@ngrx/store';
import * as Actions from '../actions';

export interface State {
  isDarkMode: boolean;
  issuer: string;
  settingsDrawerOpen: boolean;
  displayedFlows: {
    authcodepkce: boolean,
    implicit: boolean,
    password: boolean
  };
}

const initialState: State = {
  isDarkMode: false,
  issuer: undefined,
  settingsDrawerOpen: false,
  displayedFlows: {
    authcodepkce: true,
    implicit: true,
    password: true
  }
};

const preferencesReducer = createReducer(
  initialState,
  on(Actions.setDarkMode, (state, {isDarkMode}) => ({...state, isDarkMode})),
  on(Actions.setIssuer, (state, {issuer}) => ({...state, issuer})),
  on(Actions.toggleSettingsDrawer, (state) => ({...state, settingsDrawerOpen: !state.settingsDrawerOpen})),
  on(Actions.updateDisplayedFlows, (state, {authcodepkce, implicit, password}) => ({
      ...state, displayedFlows: {authcodepkce, implicit, password}
    })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return preferencesReducer(state, action);
}
