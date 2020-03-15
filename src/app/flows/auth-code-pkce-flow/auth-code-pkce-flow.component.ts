import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodePkceFlowConfig } from './auth-code-pkce-flow-config';

@Component({
  selector: 'app-auth-code-pkce-flow',
  templateUrl: './auth-code-pkce-flow.component.html',
  styleUrls: ['./auth-code-pkce-flow.component.scss']
})
export class AuthCodePkceFlowComponent implements OnInit {

  constructor(private oAuthService: OAuthService) {
  }

  ngOnInit(): void {
    // this.initAuthCodeFlow();
  }

  initAuthCodeFlow(): void {
    console.log('Configuring Auth Code Flow with PKCE ...');
    this.oAuthService.configure(authCodePkceFlowConfig);
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(
      () => {
        console.log('Init Code Flow ...');
        this.oAuthService.initCodeFlow();
      },
      () => console.log('error')
    );
  }

  onClickAuthCodeFlow(): void {
    this.initAuthCodeFlow();
    // console.log('Init Code Flow ...');
    // this.oAuthService.initCodeFlow();
  }

}
