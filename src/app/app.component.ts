import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { OAuthErrorEvent, OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import {
  discoveryDocumentLoadedSuccess,
  getUserProfile,
  getUserProfileSuccess,
  showError,
  toggleSettingsDrawer,
  tokenReceived
} from './+state/app.actions';
import { selectDarkMode, selectSettingsDrawerOpen } from './+state/app.selectors';
import { PreferencesService } from './services/preferences.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'oauth-spa-client';

  isDarkTheme$: Observable<boolean> = this.store.pipe(select(selectDarkMode));
  opened: boolean;

  constructor(private store: Store, private preferencesService: PreferencesService, private oauthService: OAuthService) {
  }

  ngOnInit(): void {
    this.preferencesService.loadPreferencesFileToStore();
    this.store.pipe(select(selectSettingsDrawerOpen)).subscribe((opened) => {
      this.opened = opened;
    });
    this.oauthService.events.subscribe(e => {
      if (e instanceof OAuthErrorEvent) {
        console.error(e);
      } else {
        console.warn(e);
        if (e.type === 'discovery_document_loaded') {
          this.store.dispatch(discoveryDocumentLoadedSuccess());
        }
        if (e.type === 'token_received') {
          this.store.dispatch(tokenReceived());
        }
        if (e.type === 'token_refreshed') {
          console.log('token refreshed');
        }
        if (e.type === 'token_expires') {
          this.store.dispatch(showError({message: 'token_expires soon ...'}));
        }
        if (e.type === 'user_profile_loaded') {
        }
        //      'discovery_document_loaded'
        // 'jwks_load_error' |
        // 'invalid_nonce_in_state' |
        // 'discovery_document_load_error' |
        // 'discovery_document_validation_error' |
        // 'user_profile_loaded' |
        // 'user_profile_load_error' |
        //      'token_received' |
        // 'token_error' |
        // 'code_error' |
        // 'token_refreshed' |
        // 'token_refresh_error' |
        // 'silent_refresh_error' |
        // 'silently_refreshed' |
        // 'silent_refresh_timeout' |
        // 'token_validation_error' |
        // 'token_expires' |
        // 'session_changed' |
        // 'session_error' |
        // 'session_terminated' |
        // 'logout' |
        // 'popup_closed' |
        // 'popup_blocked'
      }
    });
  }

  onCloseSideNav(): void {
    this.store.dispatch(toggleSettingsDrawer({isOpen: false}));
  }

}
