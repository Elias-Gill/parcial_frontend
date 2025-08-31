import { Component, Inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { MAT_DIALOG_DATA,  MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Turno } from '../../models/turno';

@Component({
  selector: 'app-turno-detalle-dialog',
  templateUrl: '../modal/modal.html',
  styleUrls: ['../modal/modal.css'],
  standalone: true,
  imports: [NgFor, MatDialogModule, MatButtonModule],
})
export class TurnoDetalleDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Turno) {}
}

