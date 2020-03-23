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

  constructor(private oAuthService: OAuthService, private store: Store) {
  }

  ngOnInit(): void {
    this.issuer$.subscribe((issuer) => {
      console.log(issuer);
      // authCodePkceFlowConfig.issuer = issuer;
      console.log('onInit(): Configuring Auth Code Flow (with PKCE) ...');
      this.oAuthService.configure(authCodePkceFlowConfig);
      this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(
        () => { console.log('success');},
        (e) => {
          console.log('error', e);
          this.store.dispatch(showError({message: e.params.error}));
        }
      );
      // this.oAuthService.initCodeFlow();
    });
  }

  initAuthCodeFlow(): void {
    console.log('initAuthCodeFlow(): Configuring Auth Code Flow with PKCE ...');
    this.oAuthService.configure(authCodePkceFlowConfig);
    console.log('Loading Discovery Document ...');
    console.log(authCodePkceFlowConfig);
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(
      () => {
        this.oAuthService.tryLogin().then(
          () => {
          console.log('REACHED!');
          },
          (e) => console.error('error', e)
        );
        console.log('Init Code Flow ...');
        this.oAuthService.initCodeFlow();
      },
      (e) => console.error('error', e)
    );
  }

  onClickAuthCodeFlow(): void {
    // this.initAuthCodeFlow();
    console.log('Init Code Flow ...');
    this.oAuthService.initCodeFlow();
  }

}
