import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable, of } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { catchError, delay, filter, map, mergeMap, tap } from 'rxjs/operators';
import { PreferencesService } from '../services/preferences.service';
import {
  getUserProfile,
  getUserProfileSuccess,
  logout,
  logoutSuccess, setAccessToken, setAutomaticTokenRefresh, setIdToken,
  showError,
  toggleSettingsDrawer,
  tokenReceived
} from './app.actions';

@Injectable()
export class AppEffects {

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      map(() => {
        this.oauthService.logOut();
        return logoutSuccess();
      })
    )
  );

  settingsClosed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(toggleSettingsDrawer),
      filter(({isOpen}) => !isOpen),
      map(() => this.preferences.saveStoreToPreferencesFile())
    ), { dispatch: false}
  );

  onTokenReceivedReadFromSessionStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tokenReceived),
      map(() => {
        const accessToken = sessionStorage.getItem('access_token');
        const accessTokenExpires = sessionStorage.getItem('expires_at');
        this.store.dispatch(setAccessToken({value: accessToken, expiresAt: +accessTokenExpires}));

        const idToken = sessionStorage.getItem('id_token');
        const idTokenExpires = sessionStorage.getItem('id_token_expires_at');
        this.store.dispatch(setIdToken({value: idToken, expiresAt: +idTokenExpires}));
      })
    ), { dispatch: false }
  );

  onSetAccessToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setAccessToken),
      map(() => {
        return getUserProfile();
      })
    )
  );

  // TODO: effect activate automatic token refresh
  onSetAutomaticTokenRefresh$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setAutomaticTokenRefresh),
      map(({automaticTokenRefresh}) => {
        if (automaticTokenRefresh) {
          console.log('Turning on automatic token refresh ...');
          this.oauthService.setupAutomaticSilentRefresh();
        }
      })
    ), { dispatch: false }
  );

  loadUserProfile$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserProfile),
      mergeMap(payload => {
        return of(payload).pipe(delay(2000));
      }),
      tap(() => console.log('Loading user profile ...')),
      mergeMap(() => {
        return fromPromise(this.oauthService.loadUserProfile()).pipe(
          map(res => {
            return getUserProfileSuccess({userProfile: res});
          }),
          catchError((err => {
            return of(showError({message: err}));
          }))
        );
      })
      // map(() => this.oauthService.loadUserProfile().then(
      //   (userProfile) => {
      //     // this.store.dispatch(getUserProfileSuccess({ userProfile }));
      //     getUserProfileSuccess({ userProfile }))
      //   },
      //   (e) => {
      //     console.log('error loading user profile', e);
      //     // this.store.dispatch(showError({message: e}));
      //     return of(showError({message: e})));
      //   }
      // ))
    ) // , { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private oauthService: OAuthService,
    private preferences: PreferencesService,
    private store: Store
  ) {
  }

}
