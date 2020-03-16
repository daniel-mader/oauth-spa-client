import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { setDarkMode, setIssuer, toggleSettingsDrawer } from '../../+state/actions';
import { selectDarkMode, selectDefaultIssuer } from '../../+state/selectors';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  onClickSettings() {
    this.store.dispatch(toggleSettingsDrawer());
  }



}
