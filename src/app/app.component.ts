import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from './settings/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'oauth-spa-client';

  isDarkTheme$: Observable<boolean>;

  constructor(private themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.isDarkTheme$ = this.themeService.isDarkTheme$;
  }
}
