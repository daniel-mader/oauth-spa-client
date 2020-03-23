import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectDisplayedFlows } from '../+state/selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  displayedFlows$: Observable<any> = this.store.pipe(select(selectDisplayedFlows));

  constructor(private store: Store) {
  }

  ngOnInit(): void {
  }

}
