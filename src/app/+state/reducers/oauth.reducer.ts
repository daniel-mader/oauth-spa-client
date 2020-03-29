import { Action, createReducer, on } from '@ngrx/store';
import { UserInfo } from 'angular-oauth2-oidc';
import * as Actions from '../app.actions';

export interface State {
  isConfigured: boolean;
  isDiscoveryLoaded: boolean;
  tokenReceived: boolean; // TODO: only when new token is received from auth server, not when already in browser session storage
  userProfile: object;
  userProfileLoading: boolean;
  accessToken: {
    value: string;
    expiresAt: number;
  };
  idToken: {
    value: string;
    expiresAt: number;
  };
}

const initialState: State = {
  isConfigured: false,
  isDiscoveryLoaded: false,
  tokenReceived: false,
  userProfile: undefined,
  userProfileLoading: false,
  accessToken: undefined,
  idToken: undefined
};

const oauthReducer = createReducer(
  initialState,
  on(Actions.configureSuccess, (state, {}) => ({...state, isConfigured: true})),
  on(Actions.discoveryDocumentLoadedSuccess, (state, {}) => ({...state, isDiscoveryLoaded: true})),
  on(Actions.tokenReceived, (state, {}) => ({...state, tokenReceived: true})),
  on(Actions.getUserProfile, (state, {}) => ({...state, userProfileLoading: true})),
  on(Actions.getUserProfileSuccess, (state, { userProfile }) => ({...state, userProfile, userProfileLoading: false})),
  on(Actions.setIdToken, (state, { value, expiresAt }) => ({...state, idToken: {value, expiresAt}})),
  on(Actions.setAccessToken, (state, { value, expiresAt }) => ({...state, accessToken: {value, expiresAt}}))
);

export function reducer(state: State | undefined, action: Action) {
  return oauthReducer(state, action);
}
