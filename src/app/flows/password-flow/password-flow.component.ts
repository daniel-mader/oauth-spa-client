import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OAuthService } from 'angular-oauth2-oidc';
import { passwordFlowConfig } from './password-flow-config';

@Component({
  selector: 'app-password-flow',
  templateUrl: './password-flow.component.html',
  styleUrls: ['./password-flow.component.scss']
})
export class PasswordFlowComponent implements OnInit {

  showPassword = false;
  serverResponse: object;

  passwordLoginForm = new FormGroup({
    username: new FormControl('alice', [Validators.required]),
    password: new FormControl('alice', [Validators.required])
  });

  constructor(private oAuthService: OAuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('Configuring Password Flow ...');
    this.oAuthService.configure(passwordFlowConfig);
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();

    const username = this.passwordLoginForm.get('username').value;
    const password = this.passwordLoginForm.get('password').value;
    this.oAuthService.fetchTokenUsingPasswordFlow(username, password).then(r => {
      console.log('r', r);
      this.serverResponse = r;
    });
  }

}
