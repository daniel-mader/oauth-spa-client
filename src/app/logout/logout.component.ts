import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { logout, setAccessToken, setIdToken } from '../+state/app.actions';
import { selectAccessToken, selectIdToken, selectUserProfile } from '../+state/app.selectors';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  // TODO: if no user profile is loaded, you can not hit the "log out" button --> load profile from sessionStorage
  userProfile$: Observable<object> = this.store.pipe(select(selectUserProfile));
  isSessionStorageEmpty: boolean;

  // accessToken$: Observable<any> = this.store.pipe(select(selectAccessToken));
  // idToken$: Observable<any> = this.store.pipe(select(selectIdToken));

  constructor(private oauthService: OAuthService, private store: Store) {
  }

  ngOnInit(): void {
    this.isSessionStorageEmpty = sessionStorage.length === 0;
  }

  onClickLogout(): void {
    this.store.dispatch(logout());
  }

  onClickClearStorage(): void {
    window.sessionStorage.clear();
    window.location.reload();
  }

}
