import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-jwt-visualizer',
  templateUrl: './jwt-visualizer.component.html',
  styleUrls: ['./jwt-visualizer.component.scss']
})
export class JwtVisualizerComponent implements OnInit {

  identityClaims: object;
  pkciVerifier: string;
  hasValidIdToken: boolean;
  hasValidAccessToken: boolean;
  userInfo: object;

  constructor(private oAuthService: OAuthService) { }

  ngOnInit(): void {
    this.hasValidIdToken = this.oAuthService.hasValidIdToken();
    this.hasValidAccessToken = this.oAuthService.hasValidAccessToken();
    this.identityClaims = this.oAuthService.getIdentityClaims();
    this.oAuthService.loadUserProfile().then(
      (userInfo) => this.userInfo = userInfo,
      () => console.log('error loading user profile'));
    this.pkciVerifier = sessionStorage.getItem('PKCI_verifier');
  }

}
