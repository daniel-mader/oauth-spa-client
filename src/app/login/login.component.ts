import { Component, OnInit } from '@angular/core';
import { OAuthService, UserInfo } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userInfo: UserInfo;
  identityClaims: object;

  constructor(private oAuthService: OAuthService) {
  }

  ngOnInit(): void {
    this.identityClaims = this.oAuthService.getIdentityClaims();
    // this.oAuthService.loadUserProfile().then((userInfo) => {
    //   console.log(userInfo);
    //   this.userInfo = userInfo;
    // });
  }

  onClickDestroySession(): void {
    this.oAuthService.logOut();
  }

}
