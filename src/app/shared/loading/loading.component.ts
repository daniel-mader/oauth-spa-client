import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  @Input() hasCompleted: boolean;

  color: ThemePalette = 'accent';
  mode: ProgressSpinnerMode = 'indeterminate';

  constructor() { }

  ngOnInit(): void {
  }

}
