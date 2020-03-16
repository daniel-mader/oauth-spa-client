import { createSelector } from '@ngrx/store';
import { State } from './reducers';

export const selectDarkMode = (state: State) => state.preferences.isDarkMode;
export const selectDefaultIssuer = (state: State) => state.preferences.issuer;
export const selectSettingsDrawerOpen = (state: State) => state.preferences.settingsDrawerOpen;
export const selectDisplayedFlows = (state: State) => state.preferences.displayedFlows;
