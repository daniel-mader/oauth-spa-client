import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectDisplayedFlows } from '../+state/app.selectors';

@Component({
  selector: 'app-flows-list',
  templateUrl: './flows-list.component.html',
  styleUrls: ['./flows-list.component.scss']
})
export class FlowsListComponent implements OnInit {

  displayedFlows$: Observable<any> = this.store.pipe(select(selectDisplayedFlows));

  constructor(private store: Store) {
  }

  ngOnInit(): void {
  }

}
