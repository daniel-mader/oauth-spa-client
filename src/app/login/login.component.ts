import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OAuthService, UserInfo } from 'angular-oauth2-oidc';
import { logout } from '../+state/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userInfo: UserInfo;
  identityClaims: object;
  isLoggedIn: boolean;

  constructor(private oAuthService: OAuthService, private store: Store) {
  }

  ngOnInit(): void {
    this.identityClaims = this.oAuthService.getIdentityClaims();

    console.log(this.oAuthService.hasValidIdToken());
    console.log(this.oAuthService.hasValidAccessToken());
    if (this.oAuthService.hasValidIdToken() || this.oAuthService.hasValidAccessToken()) {
      this.isLoggedIn = true;
    }
    // this.oAuthService.loadUserProfile().then((userInfo) => {
    //   console.log(userInfo);
    //   this.userInfo = userInfo;
    // });
  }

  onClickDestroySession(): void {
    this.store.dispatch(logout());
    this.oAuthService.logOut();
  }

}
