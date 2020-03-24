import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { showError } from '../+state/app.actions';
import { selectDarkMode } from '../+state/app.selectors';
import { authCodePkceFlowConfig } from '../flows/auth-code-pkce-flow/auth-code-pkce-flow-config';
import { UserProfileService } from '../services/user-profile.service';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.scss']
})
export class VisualizerComponent implements OnInit {

  identityClaims: object;
  pkciVerifier: string;
  isDarkTheme$: Observable<boolean> = this.store.pipe(select(selectDarkMode));

  userInfo: object;

  constructor(private oAuthService: OAuthService, private store: Store, private userProfileService: UserProfileService) {
  }

  ngOnInit(): void {
    // console.log('configuring again...');
    // this.oAuthService.configure(authCodePkceFlowConfig);
    // console.log('configuring done.');

    this.identityClaims = this.oAuthService.getIdentityClaims();
    if (this.oAuthService.hasValidAccessToken()) {
      console.log('LOADING USER PROFILE ...');
      console.log('----', new Date(this.oAuthService.getAccessTokenExpiration()));

      this.userProfileService.getUserProfile();

      this.userProfileService.userInfo$.subscribe((info) => {
        console.log('userProfile:', info);
        this.userInfo = info;
      });

      // this.userInfo = this.userProfileService.getUserProfile();

      // this.oAuthService.loadUserProfile().then(
      //   (userInfo) => {
      //     console.log('RETURNED:', userInfo);
      //     this.userInfo = userInfo;
      //   },
      //   (e) => {
      //     console.log('error loading user profile', e);
      //     this.store.dispatch(showError({message: e}));
      //   });
    }
    this.pkciVerifier = sessionStorage.getItem('PKCI_verifier');
  }

}
