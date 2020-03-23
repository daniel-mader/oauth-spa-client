import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { showError } from '../../+state/app.actions';
import { selectDefaultIssuer } from '../../+state/app.selectors';
import { PreferencesService } from '../../services/preferences.service';
import { authCodePkceFlowConfig } from './auth-code-pkce-flow-config';

@Component({
  selector: 'app-auth-code-pkce-flow',
  templateUrl: './auth-code-pkce-flow.component.html',
  styleUrls: ['./auth-code-pkce-flow.component.scss']
})
export class AuthCodePkceFlowComponent implements OnInit {

  issuer$: Observable<string> = this.store.pipe(select(selectDefaultIssuer));

  constructor(private oauthService: OAuthService, private store: Store) {
  }

  ngOnInit(): void {
    this.issuer$.subscribe((issuer) => {
      console.log(issuer);
      // authCodePkceFlowConfig.issuer = issuer;
      console.log('onInit(): Configuring Auth Code Flow (with PKCE) ...');
      this.oauthService.configure(authCodePkceFlowConfig);
      console.log('Configuring done.');
      console.log('Loading discovery document and try log in ...');
      this.oauthService.loadDiscoveryDocumentAndTryLogin().then(
        () => { console.log('successfully tried login');},
        (e) => {
          console.log('error', e);
          this.store.dispatch(showError({message: e.params.error}));
        }
      );
      // this.oauthService.initCodeFlow();
    });
  }

  initAuthCodeFlow(): void {
    console.log('initAuthCodeFlow(): Configuring Auth Code Flow with PKCE ...');
    this.oauthService.configure(authCodePkceFlowConfig);
    console.log('Loading Discovery Document ...');
    console.log(authCodePkceFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(
      () => {
        this.oauthService.tryLogin().then(
          () => {
          console.log('REACHED!');
          },
          (e) => console.error('error', e)
        );
        console.log('Init Code Flow ...');
        this.oauthService.initCodeFlow();
      },
      (e) => console.error('error', e)
    );
  }

  onClickAuthCodeFlow(): void {
    // this.initAuthCodeFlow();
    console.log('Init Code Flow ...');
    this.oauthService.initCodeFlow();
  }

}
