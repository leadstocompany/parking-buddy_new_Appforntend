import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private _snackBar:MatSnackBar) { }

  public openSnackbar(display_text: string): void {
    this._snackBar.open(display_text, 'Okay', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
      panelClass:true?['success']:['error']    
    });
  }
}
