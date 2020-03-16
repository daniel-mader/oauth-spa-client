import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { OAuthService } from 'angular-oauth2-oidc';
import { selectDefaultIssuer } from '../../+state/selectors';
import { PreferencesService } from '../../services/preferences.service';
import { passwordFlowConfig } from './password-flow-config';

@Component({
  selector: 'app-password-flow',
  templateUrl: './password-flow.component.html',
  styleUrls: ['./password-flow.component.scss']
})
export class PasswordFlowComponent implements OnInit {

  showPassword = false;
  serverResponse: object;
  issuer: string;

  passwordLoginForm = new FormGroup({
    username: new FormControl('alice', [Validators.required]),
    password: new FormControl('alice', [Validators.required])
  });

  constructor(private oAuthService: OAuthService, private store: Store) {
  }

  ngOnInit(): void {
    this.store.pipe(select(selectDefaultIssuer)).subscribe((issuer) => {
      this.issuer = issuer;
    });
  }

  onSubmit(): void {
    console.log('Configuring Password Flow ...');
    this.oAuthService.configure({...passwordFlowConfig, issuer: this.issuer});
    console.log({...passwordFlowConfig, issuer: this.issuer});
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();

    const username = this.passwordLoginForm.get('username').value;
    const password = this.passwordLoginForm.get('password').value;
    this.oAuthService.fetchTokenUsingPasswordFlow(username, password).then(r => {
        console.log('r', r);
        this.serverResponse = r;
      },
      () => console.log('error'));
  }

}
