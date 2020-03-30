import { createAction, props } from '@ngrx/store';

export const setDarkMode = createAction('[Preferences] Set Dark Mode', props<{ isDarkMode: boolean }>());
export const setIssuer = createAction('[Settings] Set Issuer', props<{ issuer: string }>());
export const setClientId = createAction('[Settings] Set Client ID', props<{ clientId: string }>());
export const setAutomaticTokenRefresh = createAction('[Settings] Set Automatic Token Refresh', props<{ automaticTokenRefresh: boolean }>());

export const logout = createAction('[Login] Logout');
export const logoutSuccess = createAction('[Login] Logout Success');

export const toggleSettingsDrawer = createAction('[Settings] Sidenav Open', props<{ isOpen: boolean }>());
export const updateDisplayedFlows = createAction(
  '[Settings] Update Displayed Flows',
  props<{ authcodepkce: boolean, implicit: boolean, password: boolean }>()
);

export const showError = createAction('[Error] Show Error', props<{ message: string }>());

export const clientConfigure = createAction('[OAuth Service] Client Configure');
export const clientConfigureSuccess = createAction('[OAuth Service] Client Configure Success');

// oauth events
export const discoveryDocumentLoad = createAction('[OAuth] Discovery Load');
export const discoveryDocumentLoadSuccess = createAction('[OAuth] Discovery Load Success');
export const discoveryDocumentLoadError = createAction('[OAuth] Discovery Load Error');

export const tryLogin = createAction('[OAuth] Try Login');
export const tryLoginSuccess = createAction('[OAuth] Try Login Success');
export const tryLoginError = createAction('[OAuth] Try Login Error');

export const tokenReceived = createAction('[OAuth] Token Received');
export const tokenRefreshed = createAction('[OAuth] Token Refreshed');

export const getUserProfile = createAction('[OAuth] Get User Profile');
export const getUserProfileSuccess = createAction('[OAuth] Get User Profile Success', props<{ userProfile: object }>());
export const getUserProfileError = createAction('[OAuth] Get User Profile Error');

export const setIdToken = createAction('[OAuth] Set Id Token', props<{ value: string; expiresAt: number; }>());
export const setAccessToken = createAction('[OAuth] Set Access Token', props<{ value: string; expiresAt: number; }>());

// export const checkTokenExpiry = createAction('[OAuth] Check Token Expiry');
// export const expiredAccessToken = createAction('[OAuth] Expired Access Token');
// export const expiredIdToken = createAction('[OAuth] Expired Id Token');
