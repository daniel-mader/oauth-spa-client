import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromError from './error.reducer';

import * as fromLogin from './login.reducer';
import * as fromPreferences from './preferences.reducer';

export interface State {
  preferences: fromPreferences.State;
  login: fromLogin.State;
  error: fromError.State;
}

export const reducers: ActionReducerMap<State> = {
  preferences: fromPreferences.reducer,
  login: fromLogin.reducer,
  error: fromError.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
