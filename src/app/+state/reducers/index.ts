import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromError from './error.reducer';

import * as fromOAuth from './oauth.reducer';
import * as fromPreferences from './preferences.reducer';

export interface State {
  preferences: fromPreferences.State;
  error: fromError.State;
  oauth: fromOAuth.State;
}

export const reducers: ActionReducerMap<State> = {
  preferences: fromPreferences.reducer,
  error: fromError.reducer,
  oauth: fromOAuth.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
