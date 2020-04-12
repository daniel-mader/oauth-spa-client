import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectUserProfile } from '../+state/app.selectors';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {

  userProfile$ = this.store.pipe(select(selectUserProfile));

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

}
