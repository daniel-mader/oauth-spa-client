import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ThemeService } from '../settings/services/theme.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  showSettings = false;
  isDarkTheme$: Observable<boolean>;
  isDarkTheme: boolean;

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.isDarkTheme$ = this.themeService.isDarkTheme$;
    this.isDarkTheme$.subscribe((val) => {
      this.isDarkTheme = val;
    });
  }

  onClickSettings() {
    this.showSettings = !this.showSettings;
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

}
