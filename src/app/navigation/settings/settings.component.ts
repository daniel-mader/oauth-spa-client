import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { setDarkMode, setIssuer, updateDisplayedFlows } from '../../+state/app.actions';
import { selectDarkMode, selectDefaultIssuer, selectDisplayedFlows } from '../../+state/app.selectors';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  isDarkTheme$: Observable<boolean> = this.store.pipe(select(selectDarkMode));
  isDarkTheme: boolean;
  authServer$: Observable<string> = this.store.pipe(select(selectDefaultIssuer));

  issuerField = new FormControl('', {updateOn: 'blur'});

  displayedFlows$: Observable<any> = this.store.pipe(select(selectDisplayedFlows));

  flows = {
    authcodepkce: {value: 'authcodepkce', viewAs: 'Auth Code (+ PKCE)', active: true},
    implicit: {value: 'implicit', viewAs: 'Implicit Flow', active: true},
    password: {value: 'password', viewAs: 'Password', active: true}
  };

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.isDarkTheme$.subscribe((isDarkTheme) => {
      this.isDarkTheme = isDarkTheme;
    });

    this.authServer$.subscribe((authServer) => {
      this.issuerField.setValue(authServer);
    });

    this.issuerField.valueChanges.pipe(distinctUntilChanged()).subscribe(issuer =>
      this.store.dispatch(setIssuer({issuer}))
    );

    this.displayedFlows$.subscribe((isDisplayed) => {
      this.flows.authcodepkce.active = isDisplayed.authcodepkce;
      this.flows.implicit.active = isDisplayed.implicit;
      this.flows.password.active = isDisplayed.password;
    });
  }

  toggleDarkTheme(checked: boolean) {
    this.store.dispatch(setDarkMode({isDarkMode: checked}));
  }

  toggleFlow(flow: any, checked: boolean) {
    console.log('flow', flow, checked);
    if (flow === 'authcodepkce') {
      this.store.dispatch(updateDisplayedFlows({
        authcodepkce: checked,
        implicit: this.flows.implicit.active,
        password: this.flows.password.active
      }));
    } else if (flow === 'implicit') {
      this.store.dispatch(updateDisplayedFlows({
        authcodepkce: this.flows.authcodepkce.active,
        implicit: checked,
        password: this.flows.password.active
      }));
    } else if (flow === 'password') {
      this.store.dispatch(updateDisplayedFlows({
        authcodepkce: this.flows.authcodepkce.active,
        implicit: this.flows.implicit.active,
        password: checked
      }));
    }
  }
}
