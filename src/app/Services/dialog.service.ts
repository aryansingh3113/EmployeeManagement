import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog:   MatDialog,
    private snackbar: MatSnackBar
  ) {}

  // ─── Confirm Dialog ───
  confirm(
    title:       string,
    message:     string,
    confirmText: string = 'Confirm',
    cancelText:  string = 'Cancel',
    type:        'warning' | 'danger' | 'success' | 'info' = 'warning'
  ): Observable<boolean> {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: { title, message, confirmText, cancelText, type },
      disableClose: true,       // ← user must click a button
      panelClass: 'custom-dialog'
    });
    return ref.afterClosed();
  }

  // ─── Snackbar Notifications ───
  success(message: string) {
    this.snackbar.open(message, '✕', {
      duration:           3000,
      panelClass:         ['snack-success'],
      horizontalPosition: 'right',
      verticalPosition:   'top'
    });
  }

  error(message: string) {
    this.snackbar.open(message, '✕', {
      duration:           4000,
      panelClass:         ['snack-error'],
      horizontalPosition: 'right',
      verticalPosition:   'top'
    });
  }

  info(message: string) {
    this.snackbar.open(message, '✕', {
      duration:           3000,
      panelClass:         ['snack-info'],
      horizontalPosition: 'right',
      verticalPosition:   'top'
    });
  }
}