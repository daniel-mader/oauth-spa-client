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

  constructor(private oAuthService: OAuthService) { }

  ngOnInit(): void {
    this.hasValidIdToken = this.oAuthService.hasValidIdToken();
    this.identityClaims = this.oAuthService.getIdentityClaims();
    this.pkciVerifier = sessionStorage.getItem('PKCI_verifier');
  }

}
