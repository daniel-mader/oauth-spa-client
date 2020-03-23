import { createAction, props } from '@ngrx/store';

export const setDarkMode = createAction('[Settings] Set Dark Mode', props<{ isDarkMode: boolean }>());
export const setIssuer = createAction('[Settings] Set Issuer', props<{ issuer: string }>());

export const loginSuccess = createAction('[Login] Login Success');
export const logout = createAction('[Login] Logout');
export const logoutSuccess = createAction('[Login] Logout Success');

export const toggleSettingsDrawer = createAction('[Settings] Sidenav Open', props<{ isOpen: boolean }>());
export const updateDisplayedFlows = createAction(
  '[Settings] Update Displayed Flows',
  props<{ authcodepkce: boolean, implicit: boolean, password: boolean }>()
);
