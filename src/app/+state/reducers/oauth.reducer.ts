import { Action, createReducer, on } from '@ngrx/store';
import { UserInfo } from 'angular-oauth2-oidc';
import { LoadingState } from '../../shared/loading/loading.component';
import * as Actions from '../app.actions';

export interface State {
  clientConfigured: LoadingState;
  discoveryDocumentLoaded: LoadingState;
  tryLogin: LoadingState;
  tokenReceived: boolean; // TODO: only when new token is received from auth server, not when already in browser session storage
  userProfile: object;
  userProfileLoading: LoadingState;
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
  clientConfigured: undefined,
  discoveryDocumentLoaded: undefined,
  tryLogin: undefined,
  tokenReceived: false,
  userProfile: undefined,
  userProfileLoading: undefined,
  accessToken: undefined,
  idToken: undefined
};

const oauthReducer = createReducer(
  initialState,
  on(Actions.clientConfigure, (state, {}) => ({...state, clientConfigured: LoadingState.Loading})),
  on(Actions.clientConfigureSuccess, (state, {}) => ({...state, clientConfigured: LoadingState.Success})),
  on(Actions.discoveryDocumentLoad, (state, {}) => ({...state, discoveryDocumentLoaded: LoadingState.Loading})),
  on(Actions.discoveryDocumentLoadSuccess, (state, {}) => ({...state, discoveryDocumentLoaded: LoadingState.Success})),
  on(Actions.tryLogin, (state, {}) => ({...state, tryLogin: LoadingState.Loading})),
  on(Actions.tryLoginSuccess, (state, {}) => ({...state, tryLogin: LoadingState.Success})),
  on(Actions.tryLoginError, (state, {}) => ({...state, tryLogin: LoadingState.Error})),
  on(Actions.tokenReceived, (state, {}) => ({...state, tokenReceived: true})), // TODO: what for?
  on(Actions.getUserProfile, (state, {}) => ({...state, userProfileLoading: LoadingState.Loading})),
  on(Actions.getUserProfileSuccess, (state, { userProfile }) => ({...state, userProfile, userProfileLoading: LoadingState.Success})),
  on(Actions.getUserProfileError, (state, {}) => ({...state, userProfileLoading: LoadingState.Error})),
  on(Actions.setIdToken, (state, { value, expiresAt }) => ({...state, idToken: {value, expiresAt}})),
  on(Actions.setAccessToken, (state, { value, expiresAt }) => ({...state, accessToken: {value, expiresAt}}))
);

export function reducer(state: State | undefined, action: Action) {
  return oauthReducer(state, action);
}
