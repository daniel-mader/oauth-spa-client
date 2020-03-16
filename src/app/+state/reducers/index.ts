import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';

import * as fromPreferences from './preferences.reducer';

export interface State {
  preferences: fromPreferences.State;
}

export const reducers: ActionReducerMap<State> = {
  preferences: fromPreferences.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
