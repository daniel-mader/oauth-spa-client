import { createAction, props } from '@ngrx/store';

export const setDarkMode = createAction('[Settings] Set Dark Mode', props<{ isDarkMode: boolean }>());
export const setIssuer = createAction('[Settings] Set Issuer', props<{ issuer: string }>());

export const logout = createAction('[Login] Logout');
export const logoutSuccess = createAction('[Login] Logout Success');

export const toggleSettingsDrawer = createAction('[Settings] Sidenav Open', props<{ isOpen: boolean }>());
export const updateDisplayedFlows = createAction(
  '[Settings] Update Displayed Flows',
  props<{ authcodepkce: boolean, implicit: boolean, password: boolean }>()
);

export const showError = createAction('[Error] Show Error', props<{ message: string }>());

export const configureSuccess = createAction('[OAuth Service] Client Configure Success');

// oauth events
export const discoveryDocumentLoadedSuccess = createAction('[OAuth] Discovery Loaded Success');

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
