import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { selectDefaultIssuer } from '../../+state/selectors';
import { PreferencesService } from '../../services/preferences.service';
import { authCodePkceFlowConfig } from './auth-code-pkce-flow-config';

@Component({
  selector: 'app-auth-code-pkce-flow',
  templateUrl: './auth-code-pkce-flow.component.html',
  styleUrls: ['./auth-code-pkce-flow.component.scss']
})
export class AuthCodePkceFlowComponent implements OnInit {

  issuer$: Observable<string> = this.store.pipe(select(selectDefaultIssuer));

  constructor(private oAuthService: OAuthService, private store: Store) {
  }

  ngOnInit(): void {
    this.issuer$.subscribe((issuer) => {
      console.log(issuer);
      // authCodePkceFlowConfig.issuer = issuer;
      console.log('onInit(): Config auth code flow pkce');
      this.oAuthService.configure(authCodePkceFlowConfig);
    });
    // this.initAuthCodeFlow();
  }

  initAuthCodeFlow(): void {
    console.log('Configuring Auth Code Flow with PKCE ...');
    this.oAuthService.configure(authCodePkceFlowConfig);
    console.log('Loading Discovery Document ...');
    console.log(authCodePkceFlowConfig);
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
