import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  showSettings = false;

  constructor() { }

  ngOnInit(): void {
  }

  onClickSettings() {
    this.showSettings = !this.showSettings;
  }

}
