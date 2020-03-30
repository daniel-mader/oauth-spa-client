import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import {
  clientConfigureSuccess, discoveryDocumentLoad, discoveryDocumentLoadError,
  discoveryDocumentLoadSuccess,
  showError,
  tryLogin,
  tryLoginError,
  tryLoginSuccess
} from '../../+state/app.actions';
import { selectClientId, selectDefaultIssuer } from '../../+state/app.selectors';
import { PreferencesService } from '../../services/preferences.service';
import { authCodePkceFlowConfig } from './auth-code-pkce-flow-config';

@Component({
  selector: 'app-auth-code-pkce-flow',
  templateUrl: './auth-code-pkce-flow.component.html',
  styleUrls: ['./auth-code-pkce-flow.component.scss']
})
export class AuthCodePkceFlowComponent implements OnInit {

  issuer$: Observable<string> = this.store.pipe(select(selectDefaultIssuer));
  clientId$: Observable<string> = this.store.pipe(select(selectClientId));

  constructor(private oauthService: OAuthService, private store: Store) {
  }

  ngOnInit(): void {
    this.issuer$.subscribe((issuer) => {
      authCodePkceFlowConfig.issuer = issuer;
      console.log('Configuring Auth Code Flow (with PKCE) ...');
      console.log('Config:', authCodePkceFlowConfig);
      this.oauthService.configure(authCodePkceFlowConfig);
      this.store.dispatch(clientConfigureSuccess());
      // console.log('Configuring done.');


      // Longer version of convenience method "loadDiscoveryDocumentAndTryLogin()"
      console.log('Loading discovery document and try log in ...');
      this.store.dispatch(discoveryDocumentLoad());
      this.oauthService.loadDiscoveryDocument().then(
        () => {
          this.store.dispatch(discoveryDocumentLoadSuccess());
          this.store.dispatch(tryLogin());
          this.oauthService.tryLoginCodeFlow().then(
            () => {
              this.store.dispatch(tryLoginSuccess());
            },
            (e) => {
              console.log('error', e);
              this.store.dispatch(tryLoginError());
            }
          );
        },
        (e) => {
          console.log('error', e);
          this.store.dispatch(discoveryDocumentLoadError());
        }
      );

      // this.oauthService.loadDiscoveryDocumentAndTryLogin().then(
      //   () => { console.log('successfully tried login');},
      //   (e) => {
      //     console.log('error', e);
      //     this.store.dispatch(showError({message: e.params.error}));
      //   }
      // );


    });

    this.clientId$.subscribe((clientId) => {
      console.log('Configuring Client Id ...');
      authCodePkceFlowConfig.clientId = clientId;
      this.oauthService.configure(authCodePkceFlowConfig);
      this.store.dispatch(clientConfigureSuccess());
    });
  }

  onClickAuthCodeFlow(): void {
    console.log('Init Code Flow ...');
    this.oauthService.initCodeFlow();
  }

}
