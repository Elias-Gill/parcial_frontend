import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrls: ['./modal.css']
})
export class ConfirmDialogProductoComponent {
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  
  isVisible = false;

  ngOnInit() {
    setTimeout(() => {
      this.isVisible = true;
    }, 10);
  }

  onConfirm() {
    this.isVisible = false;
    setTimeout(() => {
      this.confirm.emit();
    }, 300);
  }

  onCancel() {
    this.isVisible = false;
    setTimeout(() => {
      this.cancel.emit();
    }, 300);
  }
}
