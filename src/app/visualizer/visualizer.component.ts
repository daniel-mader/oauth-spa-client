import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { showError } from '../+state/app.actions';
import {
  selectClientConfigured,
  selectDarkMode,
  selectDiscoveryLoaded, selectTryLogin,
  selectUserProfileLoading
} from '../+state/app.selectors';
import { authCodePkceFlowConfig } from '../flows/auth-code-pkce-flow/auth-code-pkce-flow-config';
import { UserProfileService } from '../services/user-profile.service';
import { LoadingState } from '../shared/loading/loading.component';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.scss']
})
export class VisualizerComponent implements OnInit {

  identityClaims: object;
  isDarkTheme$: Observable<boolean> = this.store.pipe(select(selectDarkMode));

  clientConfigured$: Observable<LoadingState | undefined> = this.store.pipe(select(selectClientConfigured));
  discoveryDocumentLoaded$: Observable<LoadingState | undefined> = this.store.pipe(select(selectDiscoveryLoaded));
  tryLoading$: Observable<LoadingState | undefined> = this.store.pipe(select(selectTryLogin));
  // tokenReceived$: Observable<boolean> = this.store.pipe(select(selectTokenReceived));
  userProfileLoading$: Observable<LoadingState | undefined> = this.store.pipe(select(selectUserProfileLoading));
  isTokenInBrowserStorage: boolean; // TODO: --> Observable

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

    if (sessionStorage.getItem('access_token') !== null || sessionStorage.getItem('id_token') != null) {
      this.isTokenInBrowserStorage = true;
    }

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
