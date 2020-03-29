import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService, UserInfo } from 'angular-oauth2-oidc';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  // TODO: can be removed?

  // tslint:disable-next-line:variable-name
  private _userInfo: BehaviorSubject<UserInfo> = new BehaviorSubject<UserInfo>(undefined);
  public userInfo$: Observable<UserInfo> = this._userInfo.asObservable();

  constructor(private http: HttpClient, private oAuthService: OAuthService) {
  }

  getUserProfile(): UserInfo {
    if (this.oAuthService.hasValidAccessToken()) {
      const accessToken = this.oAuthService.getAccessToken();
      console.log('Getting User Profile ...');
      this.http.get('https://demo.identityserver.io/connect/userinfo', {
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      }).subscribe((userInfo) => {
          console.log('userInfo', userInfo);
          this._userInfo.next(userInfo as UserInfo);
          return userInfo as UserInfo;
        },
        (error) => {
          console.warn('error', error);
          return null;
        }
      );
    } else {
      console.log('Returning null ...');
      return null;
    }
  }

}
