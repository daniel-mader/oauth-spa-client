import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OAuthService } from 'angular-oauth2-oidc';
import { map, mergeMap } from 'rxjs/operators';
import { logout, logoutSuccess } from './actions';

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

  constructor(
    private actions$: Actions,
    private oauthService: OAuthService
  ) {
  }

}
