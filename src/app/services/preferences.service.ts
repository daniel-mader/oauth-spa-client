import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { setAutomaticTokenRefresh, setClientId, setDarkMode, setIssuer, updateDisplayedFlows } from '../+state/app.actions';
import { selectClientId, selectDefaultIssuer } from '../+state/app.selectors';
import preferences from '../../assets/preferences.json';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  constructor(private store: Store) {
  }

  /*
  * loads preferences.json file and dispatches actions to set values to store
  * if session values are in localStorage, those values are preferred
  */
  loadPreferencesFileToStore() {
    const issuer = localStorage.getItem('issuer');
    issuer ? this.store.dispatch(setIssuer({issuer})) : this.store.dispatch(setIssuer({issuer: preferences.openIdConfig.issuer}));

    const clientId = localStorage.getItem('clientId');
    clientId ? this.store.dispatch(setClientId({clientId})) : this.store.dispatch(setClientId({clientId: preferences.openIdConfig.clientId}));

    this.store.dispatch(setDarkMode({isDarkMode: preferences.darkMode}));
    this.store.dispatch(updateDisplayedFlows({
      authcodepkce: preferences.showFlows.authCodePkce,
      implicit: preferences.showFlows.implicit,
      password: preferences.showFlows.passwordCredential
    }));
    this.store.dispatch(setAutomaticTokenRefresh({automaticTokenRefresh: preferences.automaticTokenRefresh}));
    console.log('Preferences loaded successfully from json file.');
  }

  /* saves user-defined changes to local storage */
  saveToBrowserLocalStorage() {
    this.store.pipe(select(selectDefaultIssuer)).subscribe((issuer) => {
      localStorage.setItem('issuer', issuer);
    });
    this.store.pipe(select(selectClientId)).subscribe((clientId) => {
      localStorage.setItem('clientId', clientId);
    });
  }

}
