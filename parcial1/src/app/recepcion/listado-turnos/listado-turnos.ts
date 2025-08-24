// src/app/recepcion/listado-turnos.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { Turno } from '../../models/turno';

@Component({
  selector: 'app-listado-turnos',
  templateUrl: './listado-turnos.html',
  styleUrls: ['./listado-turnos.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ListadoTurnosComponent {
  fecha: string = new Date().toISOString().split('T')[0];
  turnos: Turno[] = [];

  constructor(private router: Router, private storage: StorageService) {
    this.turnos = this.storage.getItem<Turno[]>('turnos') || [];
  }

  verDetalle(turno: Turno) {
    this.router.navigate(['/recepcion/detalle', turno.idTurno]);
  }
}
