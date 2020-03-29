import { State } from './reducers';

// other actions (settings, etc.)
export const selectDarkMode = (state: State) => state.preferences.isDarkMode;
export const selectDefaultIssuer = (state: State) => state.preferences.issuer;
export const selectSettingsDrawerOpen = (state: State) => state.preferences.settingsDrawerOpen;
export const selectDisplayedFlows = (state: State) => state.preferences.displayedFlows;

export const selectError = (state: State) => state.error.message;

// oauth actions
// visualizer progress
export const selectClientConfigured = (state: State) => state.oauth.isConfigured;
export const selectDiscoveryLoaded = (state: State) => state.oauth.isDiscoveryLoaded;
export const selectTokenReceived = (state: State) => state.oauth.tokenReceived;

export const selectUserProfile = (state: State) => state.oauth.userProfile;
export const selectUserProfileLoading = (state: State) => state.oauth.userProfileLoading;

export const selectAccessToken = (state: State) => state.oauth.accessToken;
export const selectIdToken = (state: State) => state.oauth.idToken;
