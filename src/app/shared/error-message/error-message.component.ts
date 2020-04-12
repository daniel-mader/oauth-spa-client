import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { showError } from '../../+state/app.actions';
import { selectError } from '../../+state/app.selectors';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {

  error$: Observable<string> = this.store.pipe(select(selectError));

  constructor(private snackBar: MatSnackBar, private store: Store) {
  }

  ngOnInit(): void {
    this.error$.subscribe((error) => {
      if (error && error !== '') {
        this.showError(error);
        this.store.dispatch(showError({message: undefined}));
      }
    });
  }

  showError(message: string) {
    this.snackBar.open(message, 'DISMISS', {
      duration: 3000
    });
  }

}
