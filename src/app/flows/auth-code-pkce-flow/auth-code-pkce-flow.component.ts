import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { configureSuccess, showError } from '../../+state/app.actions';
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
      // authCodePkceFlowConfig.issuer = issuer;
      console.log('onInit(): Configuring Auth Code Flow (with PKCE) ...');
      this.oauthService.configure(authCodePkceFlowConfig);
      this.store.dispatch(configureSuccess());
      console.log('Configuring done.');
      console.log('Loading discovery document and try log in ...');
      this.oauthService.loadDiscoveryDocumentAndTryLogin().then(
        () => { console.log('successfully tried login');},
        (e) => {
          console.log('error', e);
          this.store.dispatch(showError({message: e.params.error}));
        }
      );
    });
  }

  onClickAuthCodeFlow(): void {
    console.log('Init Code Flow ...');
    this.oauthService.initCodeFlow();
  }

}
