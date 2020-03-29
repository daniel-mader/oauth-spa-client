import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { showError } from '../+state/app.actions';
import {
  selectClientConfigured,
  selectDarkMode,
  selectDiscoveryLoaded,
  selectTokenReceived,
  selectUserProfileLoading
} from '../+state/app.selectors';
import { authCodePkceFlowConfig } from '../flows/auth-code-pkce-flow/auth-code-pkce-flow-config';
import { UserProfileService } from '../services/user-profile.service';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.scss']
})
export class VisualizerComponent implements OnInit {

  identityClaims: object;
  isDarkTheme$: Observable<boolean> = this.store.pipe(select(selectDarkMode));

  isClientConfigured$: Observable<boolean> = this.store.pipe(select(selectClientConfigured));
  isDiscoveryLoaded$: Observable<boolean> = this.store.pipe(select(selectDiscoveryLoaded));
  tokenReceived$: Observable<boolean> = this.store.pipe(select(selectTokenReceived));
  isUserProfileLoading$: Observable<boolean> = this.store.pipe(select(selectUserProfileLoading));

  showRawToken: boolean;
  rawToken: string;

  userInfo: object;

  constructor(private oAuthService: OAuthService, private store: Store, private userProfileService: UserProfileService) {
  }

  ngOnInit(): void {
    this.identityClaims = this.oAuthService.getIdentityClaims();

    // if (this.oAuthService.hasValidIdToken()) {
    this.rawToken = this.oAuthService.getIdToken();
    // }

    if (this.oAuthService.hasValidAccessToken()) {
      console.log('Valid access token.');
      // this.userProfileService.getUserProfile();
      // this.userProfileService.userInfo$.subscribe((info) => {
      //   console.log('userProfile:', info);
      //   this.userInfo = info;
      // });


      // this.userInfo = this.userProfileService.getUserProfile();

      // produces error
      // this.oAuthService.loadUserProfile().then(
      //   (userInfo) => {
      //     console.log('RETURNED:', userInfo);
      //     this.userInfo = userInfo;
      //   },
      //   (e) => {
      //     console.log('error loading user profile', e);
      //     this.store.dispatch(showError({message: e}));
      //   }
      // );
    }
  }

  toggleShowRawToken() {
    this.showRawToken = !this.showRawToken;
  }

}
