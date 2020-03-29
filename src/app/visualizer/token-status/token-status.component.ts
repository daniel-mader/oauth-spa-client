import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { setAccessToken, setIdToken } from '../../+state/app.actions';
import { selectAccessToken, selectIdToken } from '../../+state/app.selectors';

@Component({
  selector: 'app-token-status',
  templateUrl: './token-status.component.html',
  styleUrls: ['./token-status.component.scss']
})
export class TokenStatusComponent implements OnInit {

  currentTime: number;

  accessToken = {
    hasValid: false,
    token: undefined,
    expires: undefined,
    expiresIn: undefined
  };

  idToken = {
    hasValid: false,
    token: undefined,
    expires: undefined,
    expiresIn: undefined
  };

  accessToken$: Observable<any> = this.store.pipe(select(selectAccessToken));
  idToken$: Observable<any> = this.store.pipe(select(selectIdToken));

  constructor(private oauthService: OAuthService, private store: Store) { }

  ngOnInit(): void {
    setInterval(() => {
      this.currentTime = Date.now();
    }, 1000);
    this.checkTokenExpiration();

    const accessToken = this.oauthService.getAccessToken();
    const idToken = this.oauthService.getIdToken();
    console.log(accessToken);
    console.log(idToken);
    this.idToken.expires = this.oauthService.getIdTokenExpiration();
    this.accessToken.expires = this.oauthService.getAccessTokenExpiration();

    if (this.oauthService.hasValidIdToken()) {
      const expiry = this.oauthService.getIdTokenExpiration();
      const value = this.oauthService.getIdToken();
      this.store.dispatch(setIdToken({value, expiresAt: expiry}));
    }

    if (this.oauthService.hasValidAccessToken()) {
      const expiry = this.oauthService.getAccessTokenExpiration();
      const value = this.oauthService.getAccessToken();
      this.store.dispatch(setAccessToken({value, expiresAt: expiry}));
    }

  }

  checkTokenExpiration(): void {
    const checkIdTokenExpiration = setInterval(() => {
      const idTokenExpires = sessionStorage.getItem('id_token_expires_at');
      let idTokenexpiresIn: number;
      if (idTokenExpires) {
        const now = Math.round(Date.now() / 1000);
        this.idToken.hasValid = true;
        idTokenexpiresIn = parseInt(idTokenExpires, 10)/1000 - now;
        this.idToken.expiresIn = idTokenexpiresIn;
      } else {
        idTokenexpiresIn = -1;
      }
      if (idTokenexpiresIn < 0) {
        // this.store.dispatch(expiredIdToken());
        this.idToken.hasValid = false;
        this.idToken.expiresIn = undefined;
        console.log('id_token is expired already');
        clearInterval(checkIdTokenExpiration);
      }
    }, 1000);

    const checkAccessTokenExpiration = setInterval(() => {
      const accessTokenExpires = sessionStorage.getItem('expires_at');
      let accessTokenExpiresIn: number;
      if (accessTokenExpires) {
        const now = Math.round(Date.now() / 1000);
        this.accessToken.hasValid = true;
        accessTokenExpiresIn = parseInt(accessTokenExpires, 10)/1000 - now;
        this.accessToken.expiresIn = accessTokenExpiresIn;
      } else {
        accessTokenExpiresIn = -1;
      }
      if (accessTokenExpiresIn < 0) {
        // this.store.dispatch(expiredIdToken());
        this.accessToken.hasValid = false;
        this.accessToken.expiresIn = undefined;
        console.log('access_token is expired already');
        clearInterval(checkAccessTokenExpiration);
      }
    }, 1000);
  }

}
