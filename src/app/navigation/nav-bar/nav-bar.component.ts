import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { setDarkMode, setIssuer, toggleSettingsDrawer } from '../../+state/app.actions';
import { selectDarkMode, selectDefaultIssuer, selectSettingsDrawerOpen } from '../../+state/app.selectors';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({ opacity: 1, transform: 'rotate(90deg)', transformOrigin: 'center' })),
      state('closed', style({ opacity: 1, transform: 'rotate(0)', transformOrigin: 'center' })),
      transition('open <=> closed', [ animate('0.25s') ]),
    ])
  ]
})
export class NavBarComponent implements OnInit {
  isSettingsOpen = false;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.pipe(select(selectSettingsDrawerOpen)).subscribe((isOpen) => {
      this.isSettingsOpen = isOpen;
    });
  }

  onClickSettings() {
    this.store.dispatch(toggleSettingsDrawer({isOpen: !this.isSettingsOpen}));
  }

}
