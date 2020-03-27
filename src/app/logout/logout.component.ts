import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { OAuthService, UserInfo } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { loginSuccess, logout, showError } from '../+state/app.actions';
import { selectIsLoggedIn } from '../+state/app.selectors';
import { UserProfileService } from '../services/user-profile.service';

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
  isSessionStorageEmpty: boolean;

  constructor(private oAuthService: OAuthService, private store: Store, private userProfileService: UserProfileService) {
  }

  ngOnInit(): void {
    console.log('LOGOUT COMPONENT ON INIT CALLED');
    this.accessToken.hasValid = this.oAuthService.hasValidAccessToken();
    this.accessToken.token = this.oAuthService.getAccessToken();
    this.accessToken.expires = this.oAuthService.getAccessTokenExpiration();

    this.idToken.hasValid = this.oAuthService.hasValidIdToken();
    this.idToken.token = this.oAuthService.getIdToken();
    this.idToken.expires = this.oAuthService.getIdTokenExpiration();

    // console.log('session Storage: ', window.sessionStorage.getItem('access_token'));
    console.log('accessToken', this.accessToken);
    console.log('idToken', this.idToken);

    // this.oAuthService.tryLoginCodeFlow().then(
    //   (isLoggedIn) => {
    //     console.log('isLoggedIn', isLoggedIn);
    //     this.store.dispatch(loginSuccess());
    //   },
    //   (e) => {
    //     console.log(e);
    //     this.store.dispatch(showError(e));
    //   }
    // );
    this.userProfileService.userInfo$.subscribe((info) => {
      console.log('userProfile:', info);
      this.userInfo = info;
      // this.identityClaims = this.oAuthService.getIdentityClaims();
    });

    if (this.oAuthService.hasValidIdToken() || this.oAuthService.hasValidAccessToken()) {
      this.store.dispatch(loginSuccess());
      this.identityClaims = this.oAuthService.getIdentityClaims(); // TODO: has id claims, but no access token and no id token?
      // console.log('id claims', this.identityClaims);
      // console.log('LOADING USER PROFILE ...');
      // this.oAuthService.loadUserProfile().then((userInfo) => {
      //   this.userInfo = userInfo;
      // }, () => {
      //   console.log('error loading user profile');
      // });
    }

    this.isSessionStorageEmpty = sessionStorage.length === 0;
  }

  onClickLogout(): void {
    this.store.dispatch(logout());
    // window.location.reload();
  }

  onClickClearStorage(): void {
    window.sessionStorage.clear();
    this.isSessionStorageEmpty = true;
  }

}
