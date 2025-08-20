import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Turno {
  idTurno: number;
  fecha: string;
  horaInicioAgendamiento: string;
  horaFinAgendamiento: string;
  idProveedor: number;
  idJaula: number | null;
}

@Component({
  selector: 'app-turnos-listado',
  templateUrl: './listado.html',
  styleUrls: ['./listado.css']
})

export class ListadoComponent {
  turnos: Turno[] = [
    { idTurno: 1, fecha: '2025-08-20', horaInicioAgendamiento: '07:00', horaFinAgendamiento: '07:30', idProveedor: 1, idJaula: 2 },
    { idTurno: 2, fecha: '2025-08-20', horaInicioAgendamiento: '08:00', horaFinAgendamiento: '08:30', idProveedor: 2, idJaula: null }
  ];

  constructor(private router: Router) {}

  editarTurno(turno: Turno) {
    this.router.navigate(['/turnos/editar', turno.idTurno]);
  }

  nuevoTurno() {
    this.router.navigate(['/turnos/nuevo']);
  }
}
