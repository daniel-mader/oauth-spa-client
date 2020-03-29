import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { setAutomaticTokenRefresh, setDarkMode, setIssuer, updateDisplayedFlows } from '../+state/app.actions';
import { selectDefaultIssuer } from '../+state/app.selectors';
import preferences from '../../assets/preferences.json';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  constructor(private store: Store) {
  }

  /* loads preferences.json file and dispatches actions to set values to store */
  loadPreferencesFileToStore() {
    this.store.dispatch(setDarkMode({isDarkMode: preferences.darkMode}));
    this.store.dispatch(setIssuer({issuer: preferences.openIdConfig.issuer}));
    this.store.dispatch(updateDisplayedFlows({
      authcodepkce: preferences.showFlows.authCodePkce,
      implicit: preferences.showFlows.implicit,
      password: preferences.showFlows.passwordCredential
    }));
    this.store.dispatch(setAutomaticTokenRefresh({automaticTokenRefresh: preferences.automaticTokenRefresh}));
    console.log('Preferences loaded successfully from json file.');
  }

  saveStoreToPreferencesFile() {
    this.store.pipe(select(selectDefaultIssuer)).subscribe((issuer) => {
      // console.log('Saving to local file:', issuer);
      // preferences.openIdConfig.defaultIssuer = issuer;
    });
  }

}
