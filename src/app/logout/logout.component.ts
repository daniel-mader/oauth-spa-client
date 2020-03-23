import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { OAuthService, UserInfo } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { loginSuccess, logout } from '../+state/actions';
import { selectIsLoggedIn } from '../+state/selectors';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  accessToken = {
    hasValid: false,
    token: undefined,
    expires: undefined,
  };

  idToken = {
    hasValid: false,
    token: undefined,
    expires: undefined,
  };

  userInfo: UserInfo;
  identityClaims: any;
  isLoggedIn$: Observable<boolean> = this.store.pipe(select(selectIsLoggedIn));

  constructor(private oAuthService: OAuthService, private store: Store) { }

  ngOnInit(): void {
    this.accessToken.hasValid = this.oAuthService.hasValidAccessToken();
    this.accessToken.token = this.oAuthService.getAccessToken();
    this.accessToken.expires = this.oAuthService.getAccessTokenExpiration();

    this.idToken.hasValid = this.oAuthService.hasValidIdToken();
    this.idToken.token = this.oAuthService.getIdToken();
    this.idToken.expires = this.oAuthService.getIdTokenExpiration();

    if (this.oAuthService.hasValidIdToken() || this.oAuthService.hasValidAccessToken()) {
      this.store.dispatch(loginSuccess());
      this.identityClaims = this.oAuthService.getIdentityClaims(); // TODO: has id claims, but no access token and no id token?
      console.log('id claims', this.identityClaims);
      this.oAuthService.loadUserProfile().then((userInfo) => {
        this.userInfo = userInfo;
      }, () => {
        console.log('error loading user profile');
      });
    }
  }

  onClickLogout(): void {
    this.store.dispatch(logout());
    // window.location.reload();
  }

  onClickClearStorage(): void {
    window.sessionStorage.clear();
  }

}
