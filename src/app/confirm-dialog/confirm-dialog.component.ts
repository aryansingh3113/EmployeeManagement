import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      title:       string;
      message:     string;
      confirmText: string;
      cancelText:  string;
      type:        'warning' | 'danger' | 'success' | 'info';
    }
  ) {}

  getIcon(): string {
    switch (this.data.type) {
      case 'danger':  return 'delete_forever';
      case 'success': return 'check_circle';
      case 'info':    return 'info';
      default:        return 'warning';
    }
  }

  onConfirm() { this.dialogRef.close(true);  }
  onCancel()  { this.dialogRef.close(false); }
}