import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { toggleSettingsDrawer } from './+state/app.actions';
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

  constructor(private store: Store, private preferencesService: PreferencesService) {
  }

  ngOnInit(): void {
    this.preferencesService.loadPreferencesFileToStore();
    this.store.pipe(select(selectSettingsDrawerOpen)).subscribe((opened) => {
      this.opened = opened;
    });
  }

  onCloseSideNav(): void {
    this.store.dispatch(toggleSettingsDrawer({isOpen: false}));
  }
}
