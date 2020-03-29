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
  logoutSuccess, setAccessToken,
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

  onTokenReceived$ = createEffect(() => // token Received either from oauthservice or from store
    this.actions$.pipe(
      ofType(tokenReceived),
      map(() => {
        // this.store.dispatch(loginSuccess());
        return getUserProfile();
      })
    )
  );

  onSetAccessToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setAccessToken),
      map(() => {
        return getUserProfile();
      })
    )
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
