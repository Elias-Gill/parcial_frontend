import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { Turno } from '../../models/turno';

@Component({
  selector: 'app-turnos-listado',
  templateUrl: './listado.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./listado.css'],
})
export class ListadoComponent implements OnInit {
  turnos: Turno[] = [];

  constructor(
    private router: Router,
    private storage: StorageService,
  ) {}

  ngOnInit() {
    this.turnos = this.storage.getItem<Turno[]>('turnos') || [];
  }

  editarTurno(turno: Turno) {
    this.router.navigate(['/turnos/editar', turno.idTurno]);
  }

  nuevoTurno() {
    this.router.navigate(['/turnos/nuevo']);
  }
}
