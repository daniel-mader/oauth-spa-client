import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OAuthService } from 'angular-oauth2-oidc';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { PreferencesService } from '../services/preferences.service';
import { logout, logoutSuccess, toggleSettingsDrawer } from './app.actions';

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

  constructor(
    private actions$: Actions,
    private oauthService: OAuthService,
    private preferences: PreferencesService
  ) {
  }

}
