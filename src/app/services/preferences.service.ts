import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { setDarkMode, setIssuer, updateDisplayedFlows } from '../+state/app.actions';
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
    this.store.dispatch(setIssuer({issuer: preferences.defaultIssuer}));
    this.store.dispatch(updateDisplayedFlows({
      authcodepkce: preferences.showFlows.authCodePkce,
      implicit: preferences.showFlows.implicit,
      password: preferences.showFlows.passwordCredential
    }));
    console.log('Preferences loaded successfully from json file.');
  }

  saveStoreToPreferencesFile() {
  }

}
