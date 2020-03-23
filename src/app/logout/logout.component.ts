import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OAuthService, UserInfo } from 'angular-oauth2-oidc';
import { logout } from '../+state/actions';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  userInfo: UserInfo;
  identityClaims: object;
  accessToken: string;
  isLoggedIn: boolean;

  constructor(private oAuthService: OAuthService, private store: Store) { }

  ngOnInit(): void {
    this.identityClaims = this.oAuthService.getIdentityClaims();
    this.accessToken = this.oAuthService.getAccessToken();
    console.log('id token:', this.oAuthService.hasValidIdToken());
    console.log('access token:', this.oAuthService.hasValidAccessToken());
    if (this.oAuthService.hasValidIdToken() || this.oAuthService.hasValidAccessToken()) {
      this.isLoggedIn = true;
    }
  }

  onClickDestroySession(): void {
    this.store.dispatch(logout());
  }

}
