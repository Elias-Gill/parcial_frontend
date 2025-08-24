import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Turno {
  idTurno: number;
  fecha: string;
  horaInicioAgendamiento: string;
  horaFinAgendamiento: string;
  idProveedor: number;
  idJaula: number | null;
  horaInicioRecepcion?: string;
  horaFinRecepcion?: string;
}

@Component({
  selector: 'app-listado-turnos',
  templateUrl: './listado-turnos.html',
  styleUrls: ['./listado-turnos.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ListadoTurnosComponent {
  fecha: string = new Date().toISOString().split('T')[0]; // hoy
  turnos: Turno[] = [
    {
      idTurno: 1,
      fecha: this.fecha,
      horaInicioAgendamiento: '07:00',
      horaFinAgendamiento: '07:30',
      idProveedor: 1,
      idJaula: null,
    },
    {
      idTurno: 2,
      fecha: this.fecha,
      horaInicioAgendamiento: '08:00',
      horaFinAgendamiento: '08:30',
      idProveedor: 2,
      idJaula: null,
    },
  ];

  constructor(private router: Router) {}

  verDetalle(turno: Turno) {
    this.router.navigate(['/recepcion/detalle', turno.idTurno]);
  }
}
