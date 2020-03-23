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

  userInfo: object;

  constructor(private oAuthService: OAuthService) { }

  ngOnInit(): void {

    this.identityClaims = this.oAuthService.getIdentityClaims();
    if (this.oAuthService.hasValidAccessToken()) {
      this.oAuthService.loadUserProfile().then(
        (userInfo) => this.userInfo = userInfo,
        () => console.log('error loading user profile'));
    }
    this.pkciVerifier = sessionStorage.getItem('PKCI_verifier');
  }

}
