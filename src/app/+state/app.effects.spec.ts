import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { OAuthService } from 'angular-oauth2-oidc';
import { ReplaySubject } from 'rxjs';
import { AppEffects } from './app.effects';

describe('AppEffects', () => {
  const actions$ = new ReplaySubject(1);
  let appEffects: AppEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        OAuthService
      ],
    });

    appEffects = TestBed.inject<any>(AppEffects);
  });

  describe('OAuth events', () => {
    it('should load user profile successfully', () => {

    });
  });

});
