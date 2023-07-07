import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

  constructor(private snackbar: MatSnackBar, private zone: NgZone) { }
  handleError(error: any): void {
      this.zone.run(() => {
        this.snackbar.open(error, 'Close',{panelClass: ['snackbar-error']})
      })
  }
}
